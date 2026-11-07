'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface CameraTargetState {
  camX: number;
  camY: number;
  camZ: number;
  lookX: number;
  lookY: number;
  lookZ: number;
  monogramX: number;
  monogramY: number;
  monogramZ: number;
  monogramRotY: number;
}

const ROUTE_TARGETS: Record<string, CameraTargetState> = {
  '/': {
    camX: 0,
    camY: 0.3,
    camZ: 8.5,
    lookX: 0,
    lookY: 0,
    lookZ: 0,
    monogramX: 0.4,
    monogramY: 0.6,
    monogramZ: -0.5,
    monogramRotY: -0.28,
  },
  '/about': {
    camX: -1.4,
    camY: 0.6,
    camZ: 7.8,
    lookX: -0.4,
    lookY: 0.1,
    lookZ: 0,
    monogramX: -2.2,
    monogramY: 0.3,
    monogramZ: -1.2,
    monogramRotY: 0.45,
  },
  '/stack': {
    camX: 0,
    camY: 1.1,
    camZ: 9.2,
    lookX: 0,
    lookY: 0,
    lookZ: 0,
    monogramX: 0,
    monogramY: 1.4,
    monogramZ: -2.2,
    monogramRotY: 0.15,
  },
  '/projects': {
    camX: 1.5,
    camY: -0.2,
    camZ: 8.0,
    lookX: 0.3,
    lookY: 0,
    lookZ: 0,
    monogramX: 2.4,
    monogramY: 0.4,
    monogramZ: -1.0,
    monogramRotY: -0.55,
  },
  '/achievements': {
    camX: 0,
    camY: -0.8,
    camZ: 7.2,
    lookX: 0,
    lookY: 0.4,
    lookZ: 0,
    monogramX: 0,
    monogramY: 0.8,
    monogramZ: -0.6,
    monogramRotY: 0,
  },
  '/contact': {
    camX: 0,
    camY: 0.2,
    camZ: 6.8,
    lookX: 0,
    lookY: 0.1,
    lookZ: 0,
    monogramX: 1.8,
    monogramY: 0.1,
    monogramZ: -0.4,
    monogramRotY: -0.35,
  },
};

export function GlobalThreeScene() {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const pathnameRef = useRef(pathname || '/');
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    pathnameRef.current = pathname || '/';
  }, [pathname]);

  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    // Detect Software WebGL (SwiftShader / llvmpipe / Basic Render) per threejs skill
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl =
        probeCanvas.getContext('webgl2') ||
        probeCanvas.getContext('webgl') ||
        probeCanvas.getContext('experimental-webgl');
      if (!gl) {
        requestAnimationFrame(() => setWebglSupported(false));
        return;
      }
      const glCtx = gl as WebGLRenderingContext;
      const ext = glCtx.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : glCtx.RENDERER;
      const gpu = String(glCtx.getParameter(param));
      glCtx.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      requestAnimationFrame(() => setWebglSupported(false));
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      requestAnimationFrame(() => setWebglSupported(false));
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;

    mountEl.innerHTML = '';
    mountEl.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.045);

    // Studio Environment Reflection (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / Math.max(window.innerHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0.3, 8.5);

    // 3-Point Studio Lighting with Warm/Cool Contrast & Red Rim Light
    const hemiLight = new THREE.HemisphereLight(0x2a3045, 0x080808, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4ee, 2.4);
    keyLight.position.set(5, 7, 6);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      const d = 6;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const redRimLight = new THREE.PointLight(0xe60023, 8.5, 18);
    redRimLight.position.set(-3.5, 2.0, -2.0);
    scene.add(redRimLight);

    const crimsonAccentLight = new THREE.PointLight(0xff1a3c, 5.5, 14);
    crimsonAccentLight.position.set(3.2, -1.8, 2.5);
    scene.add(crimsonAccentLight);

    // =========================================================================
    // COMPOSITE 7-PART PROCEDURAL 3D "LV" MONOGRAM GROUP
    // =========================================================================
    const monogramGroup = new THREE.Group();
    scene.add(monogramGroup);

    // Materials with varied roughness (>= 0.25 delta) and metallic finishes
    const obsidianMetalMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0c0f,
      metalness: 0.94,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const brushedTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e24,
      metalness: 0.86,
      roughness: 0.44,
    });

    const crimsonSlashMat = new THREE.MeshStandardMaterial({
      color: 0xe60023,
      emissive: 0x990019,
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.22,
    });

    const chromeEdgeMat = new THREE.LineBasicMaterial({
      color: 0xe60023,
      transparent: true,
      opacity: 0.75,
    });

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 1,
      depth: 0.34,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.04,
      bevelSegments: 2,
    };

    // Part 1: Geometric 'L' Shape
    const lShape = new THREE.Shape();
    lShape.moveTo(-1.45, 1.15);
    lShape.lineTo(-0.95, 1.15);
    lShape.lineTo(-1.15, -0.55);
    lShape.lineTo(-0.25, -0.55);
    lShape.lineTo(-0.38, -1.05);
    lShape.lineTo(-1.72, -1.05);
    lShape.closePath();

    const lGeo = new THREE.ExtrudeGeometry(lShape, extrudeSettings);
    lGeo.center();
    const lMesh = new THREE.Mesh(lGeo, obsidianMetalMat);
    lMesh.position.set(-0.62, 0.05, 0);
    lMesh.castShadow = !isSoftwareGl;
    lMesh.receiveShadow = !isSoftwareGl;
    monogramGroup.add(lMesh);

    // Part 2: Red Edge Wireframe on 'L'
    const lEdges = new THREE.EdgesGeometry(lGeo, 22);
    const lWire = new THREE.LineSegments(lEdges, chromeEdgeMat);
    lMesh.add(lWire);

    // Part 3: Interlocking Geometric 'V' Shape
    const vShape = new THREE.Shape();
    vShape.moveTo(-0.55, 1.15);
    vShape.lineTo(-0.02, 1.15);
    vShape.lineTo(0.18, -0.25);
    vShape.lineTo(0.72, 1.15);
    vShape.lineTo(1.22, 1.15);
    vShape.lineTo(0.32, -1.05);
    vShape.lineTo(-0.18, -1.05);
    vShape.closePath();

    const vGeo = new THREE.ExtrudeGeometry(vShape, {
      ...extrudeSettings,
      depth: 0.42,
    });
    vGeo.center();
    const vMesh = new THREE.Mesh(vGeo, brushedTitaniumMat);
    vMesh.position.set(0.55, 0.02, 0.12);
    vMesh.castShadow = !isSoftwareGl;
    vMesh.receiveShadow = !isSoftwareGl;
    monogramGroup.add(vMesh);

    // Part 4: Red Edge Wireframe on 'V'
    const vEdges = new THREE.EdgesGeometry(vGeo, 22);
    const vWire = new THREE.LineSegments(vEdges, chromeEdgeMat);
    vMesh.add(vWire);

    // Part 5: Diagonal Crimson Razor Slash Cutting Through Monogram
    const slashShape = new THREE.Shape();
    slashShape.moveTo(-1.95, -0.32);
    slashShape.lineTo(1.95, 0.42);
    slashShape.lineTo(1.82, 0.62);
    slashShape.lineTo(-2.08, -0.12);
    slashShape.closePath();

    const slashGeo = new THREE.ExtrudeGeometry(slashShape, {
      steps: 1,
      depth: 0.56,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 1,
    });
    slashGeo.center();
    const slashMesh = new THREE.Mesh(slashGeo, crimsonSlashMat);
    slashMesh.position.set(0.05, -0.05, 0.08);
    monogramGroup.add(slashMesh);

    // Part 6: Outer Angular Frame Brackets (Top-Right & Bottom-Left)
    const bracketGeo = new THREE.OctahedronGeometry(0.24, 0);
    const topBracket = new THREE.Mesh(bracketGeo, crimsonSlashMat);
    topBracket.scale.set(1.8, 0.35, 0.6);
    topBracket.position.set(1.55, 1.35, -0.15);
    topBracket.rotation.z = -0.35;
    monogramGroup.add(topBracket);

    const bottomBracket = new THREE.Mesh(bracketGeo, brushedTitaniumMat);
    bottomBracket.scale.set(2.1, 0.35, 0.6);
    bottomBracket.position.set(-1.55, -1.35, 0.15);
    bottomBracket.rotation.z = -0.35;
    monogramGroup.add(bottomBracket);

    // Part 7: Orbiting Angular Hex Ring
    const ringGeo = new THREE.RingGeometry(2.15, 2.21, 6);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe60023,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });
    const hexRing = new THREE.Mesh(ringGeo, ringMat);
    hexRing.rotation.x = 0.45;
    hexRing.rotation.y = -0.25;
    monogramGroup.add(hexRing);

    // Contact Shadow Grounding Disc beneath Monogram
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 6, 64, 64, 60);
      grad.addColorStop(0, 'rgba(230, 0, 35, 0.32)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const contactDiscGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const contactDiscMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const contactDisc = new THREE.Mesh(contactDiscGeo, contactDiscMat);
    contactDisc.rotation.x = -Math.PI / 2;
    contactDisc.position.set(0, -1.85, 0);
    monogramGroup.add(contactDisc);

    // =========================================================================
    // INSTANCED ANGULAR SHARDS FIELD (32 INSTANCES)
    // =========================================================================
    const shardCount = 32;
    const shardGeo = new THREE.OctahedronGeometry(0.16, 0);
    shardGeo.scale(1.0, 2.4, 0.35);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.85,
      roughness: 0.25,
    });
    const shardInstanced = new THREE.InstancedMesh(shardGeo, shardMat, shardCount);
    shardInstanced.frustumCulled = false;

    const shardDummy = new THREE.Object3D();
    const shardColor = new THREE.Color();
    const shardBasePositions: {
      x: number;
      y: number;
      z: number;
      rx: number;
      ry: number;
      rz: number;
      scale: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < shardCount; i++) {
      const angle = (i / shardCount) * Math.PI * 2;
      const radius = 3.2 + (i % 5) * 1.35;
      const x = Math.cos(angle) * radius;
      const y = ((i % 7) - 3) * 1.15;
      const z = -1.5 - (i % 4) * 1.4;
      const scale = 0.65 + (i % 4) * 0.25;

      shardBasePositions.push({
        x,
        y,
        z,
        rx: i * 0.4,
        ry: i * 0.7,
        rz: -0.45,
        scale,
        speed: 0.3 + (i % 5) * 0.12,
      });

      shardDummy.position.set(x, y, z);
      shardDummy.rotation.set(i * 0.4, i * 0.7, -0.45);
      shardDummy.scale.setScalar(scale);
      shardDummy.updateMatrix();
      shardInstanced.setMatrixAt(i, shardDummy.matrix);

      // Alternate between crimson red, deep obsidian, and stark white
      if (i % 3 === 0) {
        shardColor.setHex(0xe60023);
      } else if (i % 5 === 0) {
        shardColor.setHex(0xffffff);
      } else {
        shardColor.setHex(0x1a1a22);
      }
      shardInstanced.setColorAt(i, shardColor);
    }
    shardInstanced.instanceMatrix.needsUpdate = true;
    if (shardInstanced.instanceColor) shardInstanced.instanceColor.needsUpdate = true;
    shardInstanced.computeBoundingSphere();
    scene.add(shardInstanced);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer & Scroll State (Pre-allocated outside render loop for zero GC)
    let pointerX = 0;
    let pointerY = 0;
    let scrollProgress = 0;
    let isTabHidden = document.hidden;

    const onPointerMove = (e: MouseEvent) => {
      pointerX = (e.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
      pointerY = (e.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
    };

    const onScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const onVisibilityChange = () => {
      isTabHidden = document.hidden;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Software WebGL afterDraw helper per threejs skill
    let frameId = 0;
    let isDisposed = false;

    function afterDraw(cb: () => void) {
      if (isDisposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext | WebGLRenderingContext;
      if ('fenceSync' in gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isDisposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 8);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 90);
          }
        };
        frameId = window.setTimeout(poll, 8);
      } else {
        frameId = window.setTimeout(cb, 90);
      }
    }

    let lastTimeMs = performance.now();
    const startTimeMs = lastTimeMs;
    const lookTargetVec = new THREE.Vector3(0, 0, 0);

    function tick() {
      if (isDisposed) return;

      if (isTabHidden) {
        lastTimeMs = performance.now();
        frameId = window.setTimeout(tick, 250);
        return;
      }

      const nowMs = performance.now();
      const dt = Math.min((nowMs - lastTimeMs) / 1000, 0.1);
      lastTimeMs = nowMs;
      const elapsed = (nowMs - startTimeMs) / 1000;

      const routeTarget = ROUTE_TARGETS[pathnameRef.current] || ROUTE_TARGETS['/'];

      // Combine route target with scroll choreography
      const scrollSectionShiftX = Math.sin(scrollProgress * Math.PI * 2) * 1.1;
      const scrollSectionShiftY = Math.cos(scrollProgress * Math.PI) * 0.35;

      const desiredCamX = routeTarget.camX + pointerX * 0.4 + scrollSectionShiftX * 0.3;
      const desiredCamY = routeTarget.camY - pointerY * 0.3 + scrollSectionShiftY * 0.2;
      const desiredCamZ = routeTarget.camZ - scrollProgress * 0.9;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredCamX, 4, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredCamY, 4, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredCamZ, 4, dt);

      lookTargetVec.x = THREE.MathUtils.damp(lookTargetVec.x, routeTarget.lookX, 4, dt);
      lookTargetVec.y = THREE.MathUtils.damp(lookTargetVec.y, routeTarget.lookY, 4, dt);
      lookTargetVec.z = THREE.MathUtils.damp(lookTargetVec.z, routeTarget.lookZ, 4, dt);
      camera.lookAt(lookTargetVec);

      // Animate 3D LV Monogram
      const floatOffset = prefersReducedMotion ? 0 : Math.sin(elapsed * 1.6) * 0.15;
      monogramGroup.position.x = THREE.MathUtils.damp(
        monogramGroup.position.x,
        routeTarget.monogramX + scrollSectionShiftX * 0.4,
        3.5,
        dt
      );
      monogramGroup.position.y = THREE.MathUtils.damp(
        monogramGroup.position.y,
        routeTarget.monogramY + floatOffset,
        3.5,
        dt
      );
      monogramGroup.position.z = THREE.MathUtils.damp(
        monogramGroup.position.z,
        routeTarget.monogramZ,
        3.5,
        dt
      );

      const targetRotY =
        routeTarget.monogramRotY +
        pointerX * 0.32 +
        scrollProgress * Math.PI * 1.1 +
        (prefersReducedMotion ? 0 : Math.sin(elapsed * 0.5) * 0.16);
      const targetRotX = -pointerY * 0.2 + (prefersReducedMotion ? 0 : Math.cos(elapsed * 0.7) * 0.08);

      monogramGroup.rotation.y = THREE.MathUtils.damp(monogramGroup.rotation.y, targetRotY, 4, dt);
      monogramGroup.rotation.x = THREE.MathUtils.damp(monogramGroup.rotation.x, targetRotX, 4, dt);

      hexRing.rotation.z = elapsed * 0.25;

      // Subtle motion on Instanced Shards (skip per-frame matrix upload on software GL to keep frame fast)
      if (!isSoftwareGl && !prefersReducedMotion) {
        for (let i = 0; i < shardCount; i++) {
          const b = shardBasePositions[i];
          shardDummy.position.set(
            b.x,
            b.y + Math.sin(elapsed * b.speed + i) * 0.22,
            b.z
          );
          shardDummy.rotation.set(
            b.rx + elapsed * 0.15,
            b.ry + elapsed * 0.22,
            b.rz
          );
          shardDummy.scale.setScalar(b.scale);
          shardDummy.updateMatrix();
          shardInstanced.setMatrixAt(i, shardDummy.matrix);
        }
        shardInstanced.instanceMatrix.needsUpdate = true;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      lGeo.dispose();
      lEdges.dispose();
      vGeo.dispose();
      vEdges.dispose();
      slashGeo.dispose();
      bracketGeo.dispose();
      ringGeo.dispose();
      contactDiscGeo.dispose();
      shadowTex.dispose();
      shardGeo.dispose();
      obsidianMetalMat.dispose();
      brushedTitaniumMat.dispose();
      crimsonSlashMat.dispose();
      chromeEdgeMat.dispose();
      ringMat.dispose();
      contactDiscMat.dispose();
      shardMat.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      data-testid="global-three-background"
    >
      {/* Ambient Radial Vignette & Halftone Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(230,0,35,0.14)_0%,rgba(8,8,8,0.88)_58%,#030303_100%)]" />
      <div className="absolute inset-0 halftone-overlay opacity-25" />

      {webglSupported ? (
        <div ref={canvasMountRef} className="w-full h-full opacity-55 sm:opacity-75" />
      ) : (
        /* Graceful Static SVG Fallback when WebGL is unavailable */
        <div className="w-full h-full flex items-center justify-center opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 120"
            className="w-96 h-96"
            fill="none"
          >
            <polygon points="14,8 112,18 98,112 6,96" stroke="#E60023" strokeWidth="2" />
            <path d="M24 22 L44 22 L36 78 L66 78 L62 96 L14 96 Z" fill="#FFFFFF" />
            <path d="M56 22 L76 22 L82 68 L98 22 L114 22 L86 96 L68 96 Z" fill="#E60023" />
          </svg>
        </div>
      )}

      {/* Left-to-Right Editorial Contrast Scrim so Typography Always Remains Razor-Sharp */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/85 via-[#080808]/45 to-transparent" />
    </div>
  );
}
