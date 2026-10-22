import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { soundManager } from '../utils/soundManager';

export default function Computer3DLanding({ onEnter }) {
  const mountRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const [webglError, setWebglError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let scene, camera, renderer, animFrameId;
    let computerGroup, screenMesh, screenGlowLight;
    let interactiveMeshes = [];
    let mouseX = 0, mouseY = 0;
    let targetCameraX = 0.18, targetCameraY = 1.42;
    let isTransitioning = false;

    try {
      // 1. Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x07010f);
      scene.fog = new THREE.FogExp2(0x07010f, 0.08);

      // 2. Camera setup - Perfectly calibrated 3/4 vantage looking at the retro workstation
      camera = new THREE.PerspectiveCamera(
        40,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0.18, 1.42, 3.2);

      // 3. Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // 4. Lighting Rig (Synthwave Neon Pink Underglow + Warm Studio Key Light)
      const ambientLight = new THREE.AmbientLight(0x321354, 2.2);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.0);
      keyLight.position.set(4, 5.5, 3.5);
      keyLight.castShadow = true;
      scene.add(keyLight);

      // Neon Magenta / Pink Underlight from grid floor
      const neonGridLight = new THREE.DirectionalLight(0xff1493, 2.4);
      neonGridLight.position.set(-3, -1, 2);
      scene.add(neonGridLight);

      // CRT Screen Glow Light
      screenGlowLight = new THREE.PointLight(0x38bdf8, 2.6, 3.5);
      screenGlowLight.position.set(-0.088, 1.25, 0.15);
      scene.add(screenGlowLight);

      // 5. Synthwave Wireframe Grid Floor (Pink/Magenta glowing lines)
      const gridHelper = new THREE.GridHelper(24, 32, 0xff007f, 0xd946ef);
      gridHelper.position.set(0, -0.01, 0);
      scene.add(gridHelper);

      // Dark floor base under grid
      const floorGeo = new THREE.PlaneGeometry(30, 30);
      const floorMat = new THREE.MeshBasicMaterial({ color: 0x05000c });
      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.position.set(0, -0.015, 0);
      scene.add(floorMesh);

      // 6. Computer Setup Group
      computerGroup = new THREE.Group();
      scene.add(computerGroup);

      // Canvas Texture for CRT Monitor Screen (Authentic Windows 95 Retro Desktop)
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1024;
      screenCanvas.height = 768;
      const sCtx = screenCanvas.getContext('2d');

      const drawScreenTexture = (hovered = false) => {
        // Mac OS X Aqua Swirling Blue Wallpaper
        const bgGrad = sCtx.createRadialGradient(512, 384, 80, 512, 384, 580);
        bgGrad.addColorStop(0, hovered ? '#2563eb' : '#1d4ed8');
        bgGrad.addColorStop(0.5, hovered ? '#1e40af' : '#172554');
        bgGrad.addColorStop(1, '#050c1e');
        sCtx.fillStyle = bgGrad;
        sCtx.fillRect(0, 0, 1024, 768);

        // Scanline CRT raster effect
        sCtx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        for (let y = 0; y < 768; y += 4) {
          sCtx.fillRect(0, y, 1024, 2);
        }

        // Top Aqua Menubar
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        sCtx.fillRect(0, 0, 1024, 30);
        sCtx.fillStyle = '#111827';
        sCtx.font = 'bold 16px -apple-system, sans-serif';
        sCtx.textAlign = 'left';
        sCtx.fillText('  Finder  File  Edit  View  Go  Projects  Window  Help', 20, 21);
        sCtx.textAlign = 'right';
        sCtx.fillText('🔊  10:24 AM', 1004, 21);

        // Classic Desktop Icons along the right
        const icons = [
          { name: 'Macintosh HD', icon: '💻' },
          { name: 'Sarvasva', icon: '👨‍💻' },
          { name: 'Projects', icon: '💼' },
          { name: 'Arcade', icon: '🕹️' }
        ];
        icons.forEach((ic, idx) => {
          const iy = 50 + idx * 80;
          sCtx.textAlign = 'center';
          sCtx.font = '36px sans-serif';
          sCtx.fillText(ic.icon, 960, iy + 36);
          sCtx.fillStyle = '#ffffff';
          sCtx.font = 'bold 12px -apple-system, sans-serif';
          sCtx.fillText(ic.name, 960, iy + 56);
        });

        // Center Aqua Window
        const wx = 180, wy = 90, ww = 660, wh = 540;
        sCtx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        sCtx.fillRect(wx + 10, wy + 10, ww, wh);

        // Window Frame & Titlebar
        sCtx.fillStyle = '#ededed';
        sCtx.fillRect(wx, wy, ww, wh);
        sCtx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        sCtx.lineWidth = 2;
        sCtx.strokeRect(wx, wy, ww, wh);

        // Aqua Titlebar
        const tbGrad = sCtx.createLinearGradient(wx, wy, wx, wy + 32);
        tbGrad.addColorStop(0, '#f8f8f8');
        tbGrad.addColorStop(0.5, '#d4d4d4');
        tbGrad.addColorStop(1, '#c8c8c8');
        sCtx.fillStyle = tbGrad;
        sCtx.fillRect(wx, wy, ww, 32);

        // Traffic Lights
        sCtx.fillStyle = '#ef4444';
        sCtx.beginPath(); sCtx.arc(wx + 20, wy + 16, 7, 0, Math.PI * 2); sCtx.fill();
        sCtx.fillStyle = '#f59e0b';
        sCtx.beginPath(); sCtx.arc(wx + 38, wy + 16, 7, 0, Math.PI * 2); sCtx.fill();
        sCtx.fillStyle = '#22c55e';
        sCtx.beginPath(); sCtx.arc(wx + 56, wy + 16, 7, 0, Math.PI * 2); sCtx.fill();

        // Titlebar text
        sCtx.fillStyle = '#111827';
        sCtx.font = 'bold 15px -apple-system, sans-serif';
        sCtx.textAlign = 'center';
        sCtx.fillText('About Sarvasva — Mac OS X Aqua Workstation', wx + ww / 2, wy + 21);

        // Window Content with Pinstripe background
        sCtx.fillStyle = '#ffffff';
        sCtx.fillRect(wx + 10, wy + 42, ww - 20, wh - 52);

        // Content
        sCtx.fillStyle = '#111827';
        sCtx.font = 'bold 28px -apple-system, sans-serif';
        sCtx.fillText('SARVASVA', wx + ww / 2, wy + 115);

        sCtx.fillStyle = '#2563eb';
        sCtx.font = 'bold 16px -apple-system, sans-serif';
        sCtx.fillText('Cybersecurity Enthusiast & Full-Stack Engineer', wx + ww / 2, wy + 150);

        sCtx.fillStyle = '#64748b';
        sCtx.font = '14px -apple-system, sans-serif';
        sCtx.fillText('Pentester · Full Stack · Graphics Designer · Quiz Host', wx + ww / 2, wy + 180);

        // Decorative Terminal Prompt Box
        sCtx.fillStyle = '#0f172a';
        sCtx.fillRect(wx + 45, wy + 215, ww - 90, 175);
        sCtx.strokeStyle = '#38bdf8';
        sCtx.lineWidth = 1;
        sCtx.strokeRect(wx + 45, wy + 215, ww - 90, 175);

        sCtx.textAlign = 'left';
        sCtx.font = '13px monospace';
        sCtx.fillStyle = '#4ade80';
        sCtx.fillText('sarvasva@workstation:~$ ./init_aqua_os.sh', wx + 65, wy + 250);
        sCtx.fillStyle = '#94a3b8';
        sCtx.fillText('[OK] Verified operator identity: Sarvasva (scrxtch12418)', wx + 65, wy + 280);
        sCtx.fillText('[OK] Security framework & tools ready', wx + 65, wy + 305);
        sCtx.fillText('[OK] 4 vintage arcade games loaded', wx + 65, wy + 330);
        sCtx.fillStyle = '#38bdf8';
        sCtx.fillText('SYSTEM READY. CLICK TO BOOT INTO THE OS...', wx + 65, wy + 365);

        // Pulsing Start Prompt Banner
        sCtx.textAlign = 'center';
        sCtx.fillStyle = hovered ? '#0284c7' : '#0369a1';
        sCtx.fillRect(wx + 110, wy + 425, ww - 220, 56);
        sCtx.fillStyle = '#ffffff';
        sCtx.font = 'bold 18px -apple-system, sans-serif';
        sCtx.fillText('▶ CLICK COMPUTER TO ENTER OS', wx + ww / 2, wy + 460);

        // Bottom Glassy Dock Preview
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        sCtx.fillRect(362, 706, 300, 60);
        sCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        sCtx.strokeRect(362, 706, 300, 60);
        const dockEmojis = ['👨‍💻', '🛡️', '💻', '⏱️', '🚀', '✉️'];
        dockEmojis.forEach((em, i) => {
          sCtx.font = '28px sans-serif';
          sCtx.fillText(em, 390 + i * 48, 745);
        });
      };

      drawScreenTexture(false);
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      screenTexture.colorSpace = THREE.SRGBColorSpace;

      const screenMaterial = new THREE.MeshBasicMaterial({
        map: screenTexture
      });

      // Interactive CRT Display Screen Plane fitted to the monitor
      const screenGeo = new THREE.PlaneGeometry(0.76, 0.56);
      screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
      screenMesh.position.set(-0.088, 1.196, -0.344);
      computerGroup.add(screenMesh);
      interactiveMeshes.push(screenMesh);

      // 7. Load GLTF 3D Personal Computer Model
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/models/personal_computer.glb',
        (gltf) => {
          const root = gltf.scene;

          // Compute bounding box to center the model and align its base to the floor
          const box = new THREE.Box3().setFromObject(root);
          const center = new THREE.Vector3();
          box.getCenter(center);

          // Center the root inside its pivot
          root.position.set(-center.x, -box.min.y, -center.z);

          // Pivot group for rotation & scale
          const modelPivot = new THREE.Group();
          modelPivot.add(root);
          modelPivot.rotation.y = -Math.PI / 2;
          modelPivot.scale.set(2.6, 2.6, 2.6);

          // Traverse and configure meshes
          root.traverse((node) => {
            if (node.isMesh) {
              node.castShadow = true;
              node.receiveShadow = true;
              interactiveMeshes.push(node);
            }
          });

          computerGroup.add(modelPivot);
        },
        undefined,
        (error) => {
          console.warn('GLTF loading note:', error);
        }
      );

      // Ambient Floating Cyber Dust Moters
      const particlesGeo = new THREE.BufferGeometry();
      const count = 100;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = Math.random() * 4 - 0.5;
        positions[i + 2] = (Math.random() - 0.5) * 6;
      }
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMat = new THREE.PointsMaterial({
        size: 0.035,
        color: 0xff007f,
        transparent: true,
        opacity: 0.65
      });
      const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particlesMesh);

      // Event Listeners
      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        targetCameraX = 0.18 + mouseX * 0.35;
        targetCameraY = 1.42 + mouseY * 0.22;

        // Raycasting to detect monitor / computer hover
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
        const intersects = raycaster.intersectObjects(interactiveMeshes, true);
        const hovered = intersects.length > 0;
        setIsHovered(hovered);
        drawScreenTexture(hovered);
        screenTexture.needsUpdate = true;
      };

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      container.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Idle floating motion
        if (!isTransitioning) {
          computerGroup.position.y = Math.sin(elapsed * 1.2) * 0.02;
          camera.position.x += (targetCameraX - camera.position.x) * 0.05;
          camera.position.y += (targetCameraY - camera.position.y) * 0.05;
          camera.lookAt(-0.05, 1.05, 0);
        } else {
          // Camera push-in zoom directly into CRT monitor screen
          camera.position.z += (0.25 - camera.position.z) * 0.08;
          camera.position.y += (1.196 - camera.position.y) * 0.08;
          camera.position.x += (-0.088 - camera.position.x) * 0.08;
          camera.lookAt(-0.088, 1.196, -0.344);

          if (camera.position.z <= 0.45) {
            cancelAnimationFrame(animFrameId);
            onEnter();
            return;
          }
        }

        particlesMesh.rotation.y = elapsed * 0.03;
        renderer.render(scene, camera);
      };

      animate();

      // Trigger zoom transition
      window.__triggerEnter3D = () => {
        if (isTransitioning) return;
        isTransitioning = true;
        setIsZooming(true);
        soundManager.playLogon();
      };
    } catch (err) {
      console.warn("WebGL initialization failed:", err);
      setWebglError(true);
    }

    return () => {
      cancelAnimationFrame(animFrameId);
      if (renderer && renderer.domElement) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [onEnter]);

  const handleStart = () => {
    if (window.__triggerEnter3D) {
      window.__triggerEnter3D();
    } else {
      soundManager.playLogon();
      onEnter();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#060912',
        overflow: 'hidden',
        cursor: isHovered ? 'pointer' : 'default'
      }}
      onClick={handleStart}
      role="banner"
      aria-label="3D Computer setup entrance"
    >
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Fallback if WebGL fails */}
      {webglError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle, #1a4478 0%, #060912 100%)',
            color: '#fff',
            padding: 24,
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 12 }}>💻</div>
          <h1 style={{ fontFamily: 'inherit', fontSize: 32, fontWeight: 700 }}>
            SARVASVA'S WORKSTATION
          </h1>
          <p style={{ color: '#bde2ff', maxWidth: 440, fontSize: 15, margin: '10px 0 24px' }}>
            Interactive 3D Workstation & Mac OS X Aqua Operating System
          </p>
          <button
            className="aqua-btn primary"
            style={{ fontSize: 16, padding: '12px 28px' }}
            onClick={onEnter}
          >
            POWER ON / ENTER DESKTOP
          </button>
        </div>
      )}

      {/* HUD Overlay with Title & Skip Button */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 28,
          color: '#ffffff',
          fontFamily: 'inherit',
          pointerEvents: 'none'
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>
          SARVASVA // WORKSTATION
        </div>
        <div style={{ fontSize: 12, color: '#88aacc', marginTop: 2 }}>
          Interactive 3D Exhibition · Mac OS X Aqua Experience
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            background: 'rgba(10, 30, 60, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: 30,
            padding: '10px 24px',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ff66', display: 'inline-block', boxShadow: '0 0 8px #00ff66' }} />
          <span>Click computer screen or tap anywhere to enter</span>
        </div>
      </div>

      {/* Instant Skip Button */}
      <button
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#ffffff',
          padding: '8px 18px',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          zIndex: 10
        }}
        onClick={(e) => {
          e.stopPropagation();
          soundManager.playLogon();
          onEnter();
        }}
      >
        Skip 3D Intro [ESC] ➔
      </button>

      {/* Screen Zoom Overlay Flash */}
      {isZooming && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(100,180,255,0.4) 0%, rgba(6,9,18,0.95) 100%)',
            pointerEvents: 'none',
            animation: 'fadeIn 0.6s ease-out forwards'
          }}
        />
      )}
    </div>
  );
}
