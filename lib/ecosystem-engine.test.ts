import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_MESSY_FILES,
  TIMELINE_ENTRIES,
  KNOWLEDGE_ITEMS,
  DELIVERABLE_SOLUTIONS,
  LAB_PROJECTS,
  calculateOrganizationImpact,
  simulateEsp32Telemetry,
  diagnoseProblem,
  filterTimelineEntries,
  buildProjectProposalSummary,
  filterKnowledgeItems,
  filterDeliverableSolutions,
  getVisiblePortfolioProjects,
  buildDemoRequestSummary,
} from './ecosystem-engine';

test('calculateOrganizationImpact computes accurate before and after metrics', () => {
  const before = calculateOrganizationImpact(INITIAL_MESSY_FILES, false);
  assert.equal(before.organizedCount, 0);
  assert.equal(before.efficiencyGainPercent, 0);

  const after = calculateOrganizationImpact(INITIAL_MESSY_FILES, true);
  assert.equal(after.organizedCount, INITIAL_MESSY_FILES.length);
  assert.ok(after.efficiencyGainPercent >= 90);
});

test('simulateEsp32Telemetry triggers automatic ventilation and critical alerts at high temperature', () => {
  const normal = simulateEsp32Telemetry(24, 50, false, true, false, false);
  assert.equal(normal.alertLevel, 'Normal');
  assert.equal(normal.relayVentilationOn, false);

  const critical = simulateEsp32Telemetry(36, 75, true, true, false, false);
  assert.equal(critical.alertLevel, 'Crítico');
  assert.equal(critical.relayVentilationOn, true);
  assert.equal(critical.relayLightingOn, true);
});

test('diagnoseProblem resolves matching capabilities for user scenarios', () => {
  const res = diagnoseProblem('archivos-caos');
  assert.equal(res.scenario.id, 'archivos-caos');
  assert.ok(res.matchedCapabilities.length >= 1);
});

test('filterTimelineEntries filters by category and search query accurately', () => {
  const all = filterTimelineEntries(TIMELINE_ENTRIES, 'Todos', '');
  assert.equal(all.length, TIMELINE_ENTRIES.length);

  const formacion = filterTimelineEntries(TIMELINE_ENTRIES, 'Formación', 'Administración');
  assert.equal(formacion.length, 1);
});

test('buildProjectProposalSummary validates required inputs and generates structured brief', () => {
  const invalid = buildProjectProposalSummary({
    clientName: 'A',
    contactChannel: '',
    scenarioId: 'presencia-negocio',
    customContext: 'Corto',
    urgency: 'Próximas semanas',
  });
  assert.equal(invalid.valid, false);

  const valid = buildProjectProposalSummary({
    clientName: 'Empresa Norte',
    contactChannel: 'contacto@norte.pe',
    scenarioId: 'presencia-negocio',
    customContext: 'Necesitamos organizar nuestros archivos y lanzar nuestra web corporativa.',
    urgency: 'Prioritario',
  });
  assert.equal(valid.valid, true);
  assert.ok(valid.summaryText?.includes('Empresa Norte'));
});

test('filterKnowledgeItems filters by domain and honest proficiency level', () => {
  const webActive = filterKnowledgeItems(KNOWLEDGE_ITEMS, 'web-dev', 'Utilizo activamente');
  assert.ok(webActive.length >= 5);
  assert.ok(webActive.every((item) => item.domainId === 'web-dev' && item.level === 'Utilizo activamente'));

  const exploring3d = filterKnowledgeItems(KNOWLEDGE_ITEMS, '3d-visual', 'Explorando');
  assert.ok(exploring3d.some((item) => item.name.includes('Gaussian Splatting')));
});

test('filterDeliverableSolutions separates digital products, physical products, and services', () => {
  const physical = filterDeliverableSolutions(DELIVERABLE_SOLUTIONS, 'Producto físico');
  assert.equal(physical.length, 2);

  const digital = filterDeliverableSolutions(DELIVERABLE_SOLUTIONS, 'Producto digital');
  assert.equal(digital.length, 3);
});

test('getVisiblePortfolioProjects shows featured subset initially and all when expanded', () => {
  const initialView = getVisiblePortfolioProjects(LAB_PROJECTS, 'Todos', false);
  assert.equal(initialView.visibleProjects.length, 4);
  assert.equal(initialView.hasHiddenProjects, true);

  const expandedView = getVisiblePortfolioProjects(LAB_PROJECTS, 'Todos', true);
  assert.equal(expandedView.visibleProjects.length, LAB_PROJECTS.length);
  assert.equal(expandedView.hasHiddenProjects, false);
});

test('buildDemoRequestSummary validates requester fields and formats modality', () => {
  const invalid = buildDemoRequestSummary({
    projectTitle: 'Sistema ESP32',
    requesterName: '',
    requesterContact: '123',
    modality: 'En vivo',
  });
  assert.equal(invalid.valid, false);

  const valid = buildDemoRequestSummary({
    projectTitle: 'Sistema ESP32',
    requesterName: 'Carlos Mendoza',
    requesterContact: 'carlos@empresa.com',
    modality: 'Mediante video',
    notes: 'Deseo ver cómo funciona la alerta térmica.',
  });
  assert.equal(valid.valid, true);
  assert.ok(valid.summaryText?.includes('Mediante video'));
});
