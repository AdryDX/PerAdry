'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { WORKSPACE_NODES, WorkspaceNode } from '@/lib/ecosystem-engine';
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Layers,
  CheckCircle2,
  Cpu,
  Camera,
  Wifi,
  CalendarClock,
  Globe,
} from 'lucide-react';

import localAiImg from '@/src/assets/images/local_ai_gpu_compute_1794577287804.jpg';
import insta360Img from '@/src/assets/images/insta360_x5_camera_studio_1794584493843.jpg';
import iotMacroImg from '@/src/assets/images/iot_esp32_circuit_macro_1794577283242.jpg';

const getImgSrc = (asset: string | { src: string }): string =>
  typeof asset === 'string' ? asset : asset.src;

export default function DigitalWorkspace3D() {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(WORKSPACE_NODES[0].id);
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);

  // Refs for syncing React state into the Three.js on-demand loop without tearing down WebGL
  const targetCameraPosRef = useRef<THREE.Vector3>(
    new THREE.Vector3(...WORKSPACE_NODES[0].cameraPosition)
  );
  const targetLookAtRef = useRef<THREE.Vector3>(
    new THREE.Vector3(...WORKSPACE_NODES[0].cameraTarget)
  );
  const explodedTargetRef = useRef<number>(0);
  const selectedIdRef = useRef<string>(WORKSPACE_NODES[0].id);
  const requestRenderRef = useRef<(() => void) | null>(null);
  const cameraTransitionActiveRef = useRef<boolean>(false);

  const activeNode: WorkspaceNode =
    WORKSPACE_NODES.find((n) => n.id === selectedNodeId) || WORKSPACE_NODES[0];

  const handleSelectNode = (node: WorkspaceNode) => {
    setSelectedNodeId(node.id);
    selectedIdRef.current = node.id;
    targetCameraPosRef.current.set(...node.cameraPosition);
    targetLookAtRef.current.set(...node.cameraTarget);
    cameraTransitionActiveRef.current = true;
    requestRenderRef.current?.();
  };

  const handleResetView = () => {
    targetCameraPosRef.current.set(0.2, 2.15, 3.6);
    targetLookAtRef.current.set(0, 0.95, 0);
    setExplodedFactor(0);
    explodedTargetRef.current = 0;
    cameraTransitionActiveRef.current = true;
    requestRenderRef.current?.();
  };

  const handleExplodedChange = (val: number) => {
    setExplodedFactor(val);
    explodedTargetRef.current = val;
    requestRenderRef.current?.();
  };

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Software-WebGL detection from GPU renderer string
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 540;

    const scene = new THREE.Scene();
    const bgHex = 0x111110;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.065);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);
    camera.position.set(0.2, 1.9, 3.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Mandatory Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Balanced 3-Point Studio Lighting Rig (Warm Key + Cool Hemisphere Fill + Rim)
    const hemiLight = new THREE.HemisphereLight(0xcbd5e1, 0x1c1917, 0.85);
    hemiLight.position.set(0, 6, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 2.2);
    keyLight.position.set(3.5, 5.5, 3.2);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    const d = 3.5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
    rimLight.position.set(-3.5, 3.2, -2.8);
    scene.add(rimLight);

    // 4. Procedural Studio Grid & Monitor Telemetry Screen Textures (SRGBColorSpace + maxAnisotropy)
    const makeGridTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#181816';
        ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = '#292524';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 256, 256);
        ctx.strokeStyle = '#44403c';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(128, 0);
        ctx.lineTo(128, 256);
        ctx.moveTo(0, 128);
        ctx.lineTo(256, 128);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(14, 14);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const makeMonitorScreenTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 288;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0c0a09';
        ctx.fillRect(0, 0, 512, 288);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.strokeRect(14, 14, 484, 260);
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 18px monospace';
        ctx.fillText('ADRIAN DEXTRE // LAB OS · 64GB RAM', 32, 46);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '14px monospace';
        ctx.fillText('ESP32 TELEMETRY: 24.6C | GPU RX 470 8GB: ACTIVE', 32, 76);
        // Draw schematic bars and waveform
        ctx.fillStyle = '#292524';
        ctx.fillRect(32, 98, 210, 150);
        ctx.fillRect(260, 98, 220, 150);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(45, 210);
        ctx.lineTo(85, 165);
        ctx.lineTo(125, 185);
        ctx.lineTo(175, 130);
        ctx.lineTo(225, 145);
        ctx.stroke();
        ctx.fillStyle = '#fbbf24';
        for (let b = 0; b < 5; b++) {
          ctx.fillRect(280 + b * 38, 195 - b * 14, 24, 35 + b * 14);
        }
      }
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const floorGeo = new THREE.PlaneGeometry(18, 18);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: makeGridTexture(),
      roughness: 0.85,
      metalness: 0.1,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Contact shadow grounding plane under the desk (offset >= 0.02 on Y to prevent Z-fighting)
    const shadowPlaneGeo = new THREE.PlaneGeometry(4.8, 2.4);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, 0.02, 0);
    scene.add(shadowPlane);

    // Shared PBR Materials with varied roughness (>= 0.25 delta between parts)
    const woodDeskMat = new THREE.MeshStandardMaterial({
      color: 0x6b4c3b,
      roughness: 0.68,
      metalness: 0.08,
    });
    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.35,
      metalness: 0.82,
    });
    const brushedAluminumMat = new THREE.MeshStandardMaterial({
      color: 0xd6d3d1,
      roughness: 0.2,
      metalness: 0.9,
    });
    const copperAccentMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.85,
    });
    const pcbGreenMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      roughness: 0.52,
      metalness: 0.25,
    });
    const monitorScreenTex = makeMonitorScreenTexture();
    const screenGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: monitorScreenTex,
      emissive: 0xffffff,
      emissiveMap: monitorScreenTex,
      emissiveIntensity: 0.65,
      roughness: 0.15,
      metalness: 0.1,
    });

    // =========================================================================
    // COMPOSITE GROUP 1: ENGINEERING DESK, DUAL MONITORS & KEYBOARD (10 parts)
    // =========================================================================
    const deskGroup = new THREE.Group();
    const tabletop = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.08, 1.7), woodDeskMat);
    tabletop.position.set(0, 0.76, 0);
    tabletop.castShadow = true;
    tabletop.receiveShadow = true;
    deskGroup.add(tabletop);

    const legPositions = [
      [-1.9, 0.38, -0.7],
      [1.9, 0.38, -0.7],
      [-1.9, 0.38, 0.7],
      [1.9, 0.38, 0.7],
    ];
    legPositions.forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.76, 0.08), darkSteelMat);
      leg.position.set(lx, ly, lz);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    // Dual Monitors + Stand + Mechanical Keyboard
    const monitorStandBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.03, 0.32),
      brushedAluminumMat
    );
    monitorStandBase.position.set(0, 0.815, -0.35);
    deskGroup.add(monitorStandBase);

    const monitorPillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.42, 16),
      darkSteelMat
    );
    monitorPillar.position.set(0, 1.02, -0.42);
    deskGroup.add(monitorPillar);

    const mainMonitorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.74, 0.04),
      darkSteelMat
    );
    mainMonitorFrame.position.set(0, 1.26, -0.36);
    mainMonitorFrame.castShadow = true;
    deskGroup.add(mainMonitorFrame);

    const mainMonitorScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.22, 0.66),
      screenGlowMat
    );
    mainMonitorScreen.position.set(0, 1.26, -0.338);
    deskGroup.add(mainMonitorScreen);

    // Secondary Vertical Coding Monitor on Left
    const sideMonitorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.76, 0.035),
      darkSteelMat
    );
    sideMonitorFrame.position.set(-0.92, 1.24, -0.26);
    sideMonitorFrame.rotation.y = 0.25;
    deskGroup.add(sideMonitorFrame);

    const keyboardBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.025, 0.16),
      brushedAluminumMat
    );
    keyboardBody.position.set(0, 0.812, 0.22);
    deskGroup.add(keyboardBody);

    scene.add(deskGroup);

    // =========================================================================
    // COMPOSITE GROUP 2: OPEN-FRAME WORKSTATION TOWER (64GB RAM + RX 470 8GB + NVMe) (9 parts)
    // =========================================================================
    const pcTowerGroup = new THREE.Group();
    pcTowerGroup.position.set(1.35, 0.8, 0.05);

    // Open-frame back/top/bottom chassis shell so internal GPU, 64GB RAM & NVMe are clearly visible
    const chassisBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.92, 0.88),
      darkSteelMat
    );
    chassisBack.position.set(0.21, 0.46, 0);
    chassisBack.castShadow = true;
    pcTowerGroup.add(chassisBack);

    const chassisTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.05, 0.88),
      darkSteelMat
    );
    chassisTop.position.set(0, 0.895, 0);
    pcTowerGroup.add(chassisTop);

    const chassisBottom = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.06, 0.88),
      darkSteelMat
    );
    chassisBottom.position.set(0, 0.03, 0);
    pcTowerGroup.add(chassisBottom);

    const motherboardPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.74, 0.72),
      pcbGreenMat
    );
    motherboardPlate.position.set(0.15, 0.48, -0.02);
    pcTowerGroup.add(motherboardPlate);

    // 4x16GB (64GB RAM) Modules Group (Explodable)
    const ramModulesGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const dimm = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.24, 0.045),
        copperAccentMat
      );
      dimm.position.set(0.08, 0.64, 0.08 + i * 0.045);
      ramModulesGroup.add(dimm);
    }
    pcTowerGroup.add(ramModulesGroup);

    // GPU AMD Radeon RX 470 8GB Dual-Fan Group (Explodable)
    const gpuCardGroup = new THREE.Group();
    const gpuShroud = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.15, 0.54),
      brushedAluminumMat
    );
    gpuShroud.position.set(0.02, 0.36, 0.02);
    gpuCardGroup.add(gpuShroud);

    const fan1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.02, 16),
      copperAccentMat
    );
    fan1.rotation.z = Math.PI / 2;
    fan1.position.set(-0.095, 0.36, -0.11);
    gpuCardGroup.add(fan1);

    const fan2 = fan1.clone();
    fan2.position.set(-0.095, 0.36, 0.15);
    gpuCardGroup.add(fan2);
    pcTowerGroup.add(gpuCardGroup);

    // NVMe M.2 Storage Heatsink Block (Explodable)
    const nvmeDriveMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.07, 0.24),
      copperAccentMat
    );
    nvmeDriveMesh.position.set(0.09, 0.19, 0.05);
    pcTowerGroup.add(nvmeDriveMesh);

    scene.add(pcTowerGroup);

    // =========================================================================
    // COMPOSITE GROUP 3: ESP32 & IOT ELECTRONICS BREADBOARD BENCH (6 parts)
    // =========================================================================
    const iotBenchGroup = new THREE.Group();
    iotBenchGroup.position.set(-1.25, 0.8, 0.32);

    const breadboardBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.04, 0.42),
      pcbGreenMat
    );
    breadboardBase.position.set(0, 0.02, 0);
    breadboardBase.castShadow = true;
    iotBenchGroup.add(breadboardBase);

    const esp32Module = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.05, 0.16),
      brushedAluminumMat
    );
    esp32Module.position.set(-0.12, 0.065, 0);
    iotBenchGroup.add(esp32Module);

    const relayBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.08, 0.14),
      copperAccentMat
    );
    relayBlock.position.set(0.16, 0.08, -0.06);
    iotBenchGroup.add(relayBlock);

    const sensorTower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.14, 16),
      darkSteelMat
    );
    sensorTower.position.set(0.14, 0.09, 0.12);
    iotBenchGroup.add(sensorTower);

    scene.add(iotBenchGroup);

    // =========================================================================
    // COMPOSITE GROUP 4: 360° OPTICS & CAMERA TRIPOD RIG (5 parts)
    // =========================================================================
    const opticsGroup = new THREE.Group();
    opticsGroup.position.set(-1.8, 0.8, -0.42);

    const tripodBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.22, 0.06, 16),
      darkSteelMat
    );
    tripodBase.position.set(0, 0.03, 0);
    opticsGroup.add(tripodBase);

    const tripodStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 0.45, 16),
      brushedAluminumMat
    );
    tripodStem.position.set(0, 0.28, 0);
    opticsGroup.add(tripodStem);

    const cameraBody360 = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.22, 0.1),
      darkSteelMat
    );
    cameraBody360.position.set(0, 0.56, 0);
    opticsGroup.add(cameraBody360);

    const fisheyeLensFront = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 16, 16),
      copperAccentMat
    );
    fisheyeLensFront.position.set(0, 0.6, 0.05);
    opticsGroup.add(fisheyeLensFront);

    scene.add(opticsGroup);

    // 5. OrbitControls configured for On-Demand Rendering
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.07;
    controls.minDistance = 1.4;
    controls.maxDistance = 6.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.target.set(...WORKSPACE_NODES[0].cameraTarget);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Cancel scripted camera transition when user interacts manually
    controls.addEventListener('start', () => {
      cameraTransitionActiveRef.current = false;
    });

    let lastTimeMs = 0;
    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let currentExploded = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame((nowMs) => {
        renderDirty = false;
        const dt = lastTimeMs > 0 ? Math.min((nowMs - lastTimeMs) / 1000, 0.1) || 0.016 : 0.016;
        lastTimeMs = nowMs;

        // Smoothly damp exploded view separation
        const expTarget = explodedTargetRef.current;
        if (Math.abs(currentExploded - expTarget) > 0.002) {
          currentExploded = THREE.MathUtils.damp(currentExploded, expTarget, 8, dt);
          ramModulesGroup.position.x = -currentExploded * 0.42;
          gpuCardGroup.position.x = -currentExploded * 0.55;
          nvmeDriveMesh.position.x = -currentExploded * 0.35;
          esp32Module.position.y = 0.065 + currentExploded * 0.22;
          renderDirty = true;
        }

        // Smoothly damp camera preset transitions
        if (cameraTransitionActiveRef.current) {
          camera.position.lerp(targetCameraPosRef.current, 1 - Math.exp(-6 * dt));
          controls.target.lerp(targetLookAtRef.current, 1 - Math.exp(-6 * dt));
          if (
            camera.position.distanceTo(targetCameraPosRef.current) < 0.02 &&
            controls.target.distanceTo(targetLookAtRef.current) < 0.02
          ) {
            cameraTransitionActiveRef.current = false;
          } else {
            renderDirty = true;
          }
        }

        controls.update();
        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (renderDirty) requestRender();
        };
        if (isSoftwareGl) afterDraw(done);
        else done();
      });
    }

    requestRenderRef.current = requestRender;
    controls.addEventListener('change', requestRender);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 960;
      const h = container.clientHeight || 540;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };
    window.addEventListener('resize', handleResize);

    // Initial render
    requestRender();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="laboratorio"
      className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/90"
    >
      <div className="max-w-[1380px] mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
              07 — HERRAMIENTAS, WORKSPACE 3D Y FORMA DE TRABAJO · ¿Con qué trabaja?
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-950"
              style={{ textWrap: 'balance' }}
            >
              Mi Workspace / Lab: estación de cómputo, cámara 360° Insta360 X5 y banco de hardware
              IoT
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Explora en 3D mi entorno de trabajo o revisa el detalle de cada herramienta (64 GB de
              RAM, GPU RX 470 de 8 GB, NVMe, Insta360 X5 y ESP32) y para qué utilizo cada recurso.
            </p>
          </div>
        </div>

        {/* 3D Scene Container with Unobstructed Center & Collapsible Bottom Dock */}
        <div className="relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden border border-stone-300 bg-[#111110]">
          {/* Dedicated Isolated WebGL Mount Container */}
          <div
            ref={canvasMountRef}
            data-testid="workspace-3d-canvas"
            className="w-full h-full"
          />

          {/* Minimal Top-Left Spec Badge */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none bg-[#181816]/90 border border-stone-700 px-3.5 py-2 rounded-xl text-xs font-mono text-stone-200">
            <span className="text-amber-400 font-semibold">{activeNode.name}</span>
            <span className="mx-2 text-stone-500">·</span>
            <span>{activeNode.specLabel}</span>
          </div>

          {/* Unified Collapsible Bottom Control Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[94%] max-w-[960px] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setDockCollapsed((prev) => !prev)}
              className="px-3.5 py-1.5 rounded-t-xl bg-[#181816] border border-b-0 border-stone-700 text-xs font-mono text-stone-200 hover:text-amber-400 flex items-center gap-1.5 cursor-pointer"
            >
              {dockCollapsed ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Mostrar Controles del Laboratorio 3D</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Ocultar Controles (Modo Vista Limpia)</span>
                </>
              )}
            </button>

            {!dockCollapsed && (
              <div className="w-full bg-[#181816]/95 border border-stone-700 rounded-2xl p-3 sm:p-4 shadow-lg space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {WORKSPACE_NODES.map((node) => {
                    const isSelected = node.id === activeNode.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => handleSelectNode(node)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 font-semibold'
                            : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
                        }`}
                      >
                        {node.name}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-800 text-xs font-mono text-stone-300">
                  <div className="flex items-center gap-3 flex-1 min-w-[220px]">
                    <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                    <label htmlFor="exploded-view-slider" className="whitespace-nowrap">
                      Vista Desglosada (Hardware):
                    </label>
                    <input
                      id="exploded-view-slider"
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={explodedFactor}
                      onChange={(e) => handleExplodedChange(Number(e.target.value))}
                      className="w-full max-w-[180px] accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleResetView}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Vista General</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Component Purpose Inspector ("Para qué lo utilizo") */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-700">
              <span>COMPONENTE SELECCIONADO EN EL LABORATORIO</span>
              <span aria-hidden="true">·</span>
              <span>{activeNode.category}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-950">
              {activeNode.name}: {activeNode.purposeTitle}
            </h3>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              <strong className="text-stone-950">¿Para qué lo utilizo?</strong>{' '}
              {activeNode.whatIUseItFor}
            </p>
          </div>

          <div className="lg:col-span-5 bg-stone-50 border border-stone-200/80 rounded-xl p-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              Aplicaciones directas en proyectos de clientes
            </div>
            <ul className="space-y-2">
              {activeNode.realCapabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2 text-xs sm:text-sm text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3 Visual Equipment Pillars: PC DE TRABAJO | CÁMARA Y CREACIÓN VISUAL (INSTA360 X5) | DISPOSITIVOS Y HARDWARE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: PC DE TRABAJO */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs">
            <div>
              <div className="relative h-44 w-full bg-stone-950">
                <img
                  src={getImgSrc(localAiImg)}
                  alt="PC de trabajo con 64 GB de RAM, GPU AMD Radeon RX 470 de 8 GB y almacenamiento NVMe"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center gap-2 text-xs font-mono">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>01 · PC DE TRABAJO</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-display text-lg font-bold text-stone-950">
                  Estación Multitarea, Desarrollo y Procesamiento
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  <li>
                    <strong className="text-stone-950">64 GB de RAM:</strong> Desarrollo simultáneo,
                    servidores locales y procesamiento de lotes de datos sin pausas.
                  </li>
                  <li>
                    <strong className="text-stone-950">GPU AMD Radeon RX 470 (8 GB):</strong>{' '}
                    Edición visual, escenas 3D web y experimentación con modelos de IA locales.
                  </li>
                  <li>
                    <strong className="text-stone-950">Almacenamiento NVMe:</strong> Lectura y
                    escritura veloz para video 360°, compilaciones y organización digital.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pillar 2: CÁMARA Y CREACIÓN VISUAL */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs">
            <div>
              <div className="relative h-44 w-full bg-stone-950">
                <img
                  src={getImgSrc(insta360Img)}
                  alt="Cámara 360 Insta360 X5 para fotografía y video inmersivo"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center gap-2 text-xs font-mono">
                  <Camera className="w-4 h-4 text-rose-400" />
                  <span>02 · CÁMARA Y CREACIÓN VISUAL</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-display text-lg font-bold text-stone-950">
                  Cámara 360° Insta360 X5 & Producción Inmersiva
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  <li>
                    <strong className="text-stone-950">Cámara 360° Insta360 X5:</strong> Captura
                    esférica de alta definición para espacios comerciales, talleres y proyectos.
                  </li>
                  <li>
                    <strong className="text-stone-950">Fotografía y Video 360°:</strong> Creación de
                    contenido inmersivo y ángulos dinámicos.
                  </li>
                  <li>
                    <strong className="text-stone-950">Recorridos Virtuales:</strong> Integración
                    directa en sitios web para que el visitante explore el lugar desde su pantalla.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pillar 3: DISPOSITIVOS Y HARDWARE */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs">
            <div>
              <div className="relative h-44 w-full bg-stone-950">
                <img
                  src={getImgSrc(iotMacroImg)}
                  alt="Microcontroladores ESP32, sensores y banco de pruebas electrónicas"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center gap-2 text-xs font-mono">
                  <Wifi className="w-4 h-4 text-emerald-400" />
                  <span>03 · DISPOSITIVOS Y HARDWARE</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-display text-lg font-bold text-stone-950">
                  ESP32, Hardware de Pruebas y Conectividad
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  <li>
                    <strong className="text-stone-950">ESP32 y Sensórica:</strong> Microcontroladores
                    Wi-Fi/BLE, sensores de temperatura, humedad, presencia y módulos de relé.
                  </li>
                  <li>
                    <strong className="text-stone-950">Dispositivos Conectados y NFC:</strong>{' '}
                    Tarjetas y etiquetas inteligentes NFC listas para programar.
                  </li>
                  <li>
                    <strong className="text-stone-950">Herramientas de Diagnóstico:</strong>{' '}
                    Periféricos y equipamiento para mantenimiento y validación técnica.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7 REQUIREMENT: DISPONIBILIDAD Y FORMA DE TRABAJO */}
        <div className="bg-stone-950 text-stone-100 border border-stone-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
              <CalendarClock className="w-4 h-4" />
              <span>DISPONIBILIDAD Y FORMA DE TRABAJO</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Coordinación ordenada, remota o por proyecto
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Trabajo bajo una modalidad realista y transparente: coordinamos previamente el alcance
              para dedicarte atención enfocada y seguimiento continuo.
            </p>
            <div className="p-3.5 rounded-xl bg-stone-900 border border-emerald-500/40 flex items-center gap-2.5 text-xs text-emerald-300 font-medium">
              <Globe className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>«Entorno preparado para trabajo digital y coordinación remota.»</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
              <div className="font-mono text-amber-400 font-bold">01 · Trabajo Remoto</div>
              <p className="text-stone-300 leading-relaxed">
                Desarrollo web, organización digital, asesoría y demostraciones mediante canales
                digitales sin importar tu ubicación.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
              <div className="font-mono text-amber-400 font-bold">02 · Por Proyectos</div>
              <p className="text-stone-300 leading-relaxed">
                Definimos etapas, entregables claros y plazos realistas antes de iniciar cualquier
                desarrollo o servicio.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
              <div className="font-mono text-amber-400 font-bold">03 · Coordinación Previa</div>
              <p className="text-stone-300 leading-relaxed">
                Atención según disponibilidad acordada y seguimiento digital documentado de cada
                avance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
