import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Building, Equipment, HealthStatus, Position3D } from '../types';
import { 
  Maximize2, 
  RotateCcw, 
  Eye, 
  Flame, 
  Zap, 
  Shield, 
  Layers, 
  Crosshair, 
  Box, 
  Info,
  Sliders
} from 'lucide-react';

interface DigitalTwin3DProps {
  buildings: Building[];
  equipment: Equipment[];
  selectedEquipment: Equipment | null;
  selectedBuilding: Building | null;
  selectedFloorLevel: number | 'all';
  viewMode: 'standard' | 'thermal' | 'energy' | 'security';
  onSelectEquipment: (equipment: Equipment | null) => void;
  onSelectBuilding: (building: Building | null) => void;
  focusTargetPosition?: Position3D | null;
  onFloorChange?: (floor: number | 'all') => void;
  onViewModeChange?: (mode: 'standard' | 'thermal' | 'energy' | 'security') => void;
}

export const DigitalTwin3D: React.FC<DigitalTwin3DProps> = ({
  buildings,
  equipment,
  selectedEquipment,
  selectedBuilding,
  selectedFloorLevel,
  viewMode,
  onSelectEquipment,
  onSelectBuilding,
  focusTargetPosition,
  onFloorChange,
  onViewModeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js instances ref
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);
  
  // Interactive objects mapping
  const interactiveMeshesRef = useRef<Map<string, { type: 'building' | 'equipment'; data: any }>>(new Map());
  const equipmentMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const buildingMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const particleSystemRef = useRef<THREE.Points | null>(null);

  // Camera Animation State
  const cameraTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const cameraLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const isTransitioningCamera = useRef<boolean>(false);
  const cameraLerpSpeed = useRef<number>(0.05);

  // Orbit controls state (custom lightweight smooth math)
  const isDragging = useRef<boolean>(false);
  const isRightDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraRadius = useRef<number>(42);
  const cameraTheta = useRef<number>(Math.PI / 4);
  const cameraPhi = useRef<number>(Math.PI / 3.4);

  // Hover state
  const [hoveredEntity, setHoveredEntity] = useState<{ name: string; type: string; status: HealthStatus } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hudStats, setHudStats] = useState({ fps: 60, objectsCount: 0, drawCalls: 18 });

  // Update camera coordinates based on spherical angles
  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const phi = Math.max(0.1, Math.min(Math.PI / 2.05, cameraPhi.current));
    const theta = cameraTheta.current;
    const r = cameraRadius.current;

    const x = cameraTarget.current.x + r * Math.sin(phi) * Math.sin(theta);
    const y = cameraTarget.current.y + r * Math.cos(phi);
    const z = cameraTarget.current.z + r * Math.sin(phi) * Math.cos(theta);

    if (!isTransitioningCamera.current) {
      cameraRef.current.position.set(x, y, z);
      cameraRef.current.lookAt(cameraTarget.current);
    }
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = Math.max(containerRef.current.clientWidth || 800, 300);
    const height = Math.max(containerRef.current.clientHeight || 600, 300);

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06080e);
    scene.fog = new THREE.FogExp2(0x06080e, 0.015);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1000);
    cameraRef.current = camera;
    updateCameraPosition();

    // 3. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;
    } catch (e) {
      console.error('Failed to create WebGLRenderer:', e);
      return;
    }

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xd1e4ff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(30, 45, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    dirLight.shadow.camera.left = -35;
    dirLight.shadow.camera.right = 35;
    dirLight.shadow.camera.top = 35;
    dirLight.shadow.camera.bottom = -35;
    scene.add(dirLight);

    // Accent Cyber Lights
    const cyanLight = new THREE.PointLight(0x06b6d4, 1.5, 40);
    cyanLight.position.set(-10, 8, -6);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 1.2, 40);
    purpleLight.position.set(12, 6, 8);
    scene.add(purpleLight);

    // 5. Ground Grid & Roads
    const gridHelper = new THREE.GridHelper(90, 45, 0x06b6d4, 0x172554);
    gridHelper.position.y = -0.01;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // Dark cyber ground plane
    const groundGeo = new THREE.PlaneGeometry(120, 120);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x080c16,
      roughness: 0.85,
      metalness: 0.2,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.05;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Campus Road & Pathway Ribbons
    const roadMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.8 });
    const roadGeo1 = new THREE.PlaneGeometry(70, 3.5);
    const roadMesh1 = new THREE.Mesh(roadGeo1, roadMat);
    roadMesh1.rotation.x = -Math.PI / 2;
    roadMesh1.position.set(0, 0.02, 0);
    scene.add(roadMesh1);

    const roadGeo2 = new THREE.PlaneGeometry(3.5, 60);
    const roadMesh2 = new THREE.Mesh(roadGeo2, roadMat);
    roadMesh2.rotation.x = -Math.PI / 2;
    roadMesh2.position.set(0, 0.02, 0);
    scene.add(roadMesh2);

    // Ambient floating cyber particles / dust
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = Math.random() * 22;
      particlePositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.35,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // 6. Resize Observer
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      if (w > 0 && h > 0) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      }
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    // 7. Render Loop
    let clock = new THREE.Clock();
    let lastTime = 0;
    let frames = 0;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Particle floating
      if (particleSystemRef.current) {
        particleSystemRef.current.rotation.y = elapsedTime * 0.02;
      }

      // Equipment status beacons animation (pulsing alert rings)
      equipmentMeshesRef.current.forEach((eqGroup, eqId) => {
        const haloRing = eqGroup.getObjectByName('haloRing');
        const pointBeacon = eqGroup.getObjectByName('pointBeacon');
        const eqData = equipment.find(e => e.id === eqId);

        if (haloRing && eqData) {
          if (eqData.status === 'critical') {
            const scale = 1 + Math.sin(elapsedTime * 6) * 0.35;
            haloRing.scale.set(scale, scale, scale);
            (haloRing as THREE.Mesh).rotation.z += 0.04;
          } else if (eqData.status === 'warning') {
            const scale = 1 + Math.sin(elapsedTime * 3) * 0.2;
            haloRing.scale.set(scale, scale, scale);
          }
        }

        if (pointBeacon && eqData && eqData.status === 'critical') {
          pointBeacon.position.y = 2.2 + Math.sin(elapsedTime * 4) * 0.2;
        }
      });

      // Smooth Camera Lerp
      if (isTransitioningCamera.current && cameraRef.current) {
        const phi = Math.max(0.1, Math.min(Math.PI / 2.05, cameraPhi.current));
        const theta = cameraTheta.current;
        const r = cameraRadius.current;

        const targetCamX = cameraTarget.current.x + r * Math.sin(phi) * Math.sin(theta);
        const targetCamY = cameraTarget.current.y + r * Math.cos(phi);
        const targetCamZ = cameraTarget.current.z + r * Math.sin(phi) * Math.cos(theta);

        cameraRef.current.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), cameraLerpSpeed.current);
        cameraLookAt.current.lerp(cameraTarget.current, cameraLerpSpeed.current);
        cameraRef.current.lookAt(cameraLookAt.current);

        const dist = cameraRef.current.position.distanceTo(new THREE.Vector3(targetCamX, targetCamY, targetCamZ));
        if (dist < 0.1) {
          isTransitioningCamera.current = false;
        }
      }

      renderer.render(scene, camera);

      // Simple FPS counter
      frames++;
      if (elapsedTime - lastTime >= 1) {
        setHudStats(prev => ({ ...prev, fps: frames, objectsCount: scene.children.length }));
        frames = 0;
        lastTime = elapsedTime;
      }
    };

    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  // Build & Rebuild 3D Meshes when environment / viewMode / floor selection changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clear previous dynamic meshes
    buildingMeshesRef.current.forEach(group => scene.remove(group));
    buildingMeshesRef.current.clear();

    equipmentMeshesRef.current.forEach(group => scene.remove(group));
    equipmentMeshesRef.current.clear();

    interactiveMeshesRef.current.clear();

    // 1. Create Building Geometry
    buildings.forEach(b => {
      const bGroup = new THREE.Group();
      bGroup.position.set(b.position.x, b.position.y, b.position.z);

      const [w, h, d] = b.dimensions;

      // Color based on viewMode
      let mainColor = new THREE.Color(b.color);
      let opacity = 0.85;
      let roughness = 0.3;
      let metalness = 0.6;
      let wireframe = false;

      if (viewMode === 'thermal') {
        mainColor = b.status === 'critical' ? new THREE.Color(0xf43f5e) : b.status === 'warning' ? new THREE.Color(0xf59e0b) : new THREE.Color(0x0284c7);
        opacity = 0.65;
      } else if (viewMode === 'energy') {
        mainColor = new THREE.Color(0x38bdf8);
        wireframe = true;
      } else if (viewMode === 'security') {
        mainColor = new THREE.Color(0x10b981);
        opacity = 0.55;
      }

      // Check if selected or floor sliced
      const isSelectedB = selectedBuilding?.id === b.id;
      if (isSelectedB) {
        mainColor = mainColor.clone().addScalar(0.2);
      }

      // Base Structure
      const bGeo = new THREE.BoxGeometry(w, h, d);
      const bMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        roughness: roughness,
        metalness: metalness,
        transparent: true,
        opacity: opacity,
        wireframe: wireframe,
      });

      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.y = h / 2;
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      bMesh.userData = { type: 'building', id: b.id, data: b };
      bGroup.add(bMesh);

      // Architectural Edge lines for high-tech aesthetic
      const edges = new THREE.EdgesGeometry(bGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: isSelectedB ? 0x06b6d4 : (b.status === 'critical' ? 0xf43f5e : 0x38bdf8),
        linewidth: 2,
        transparent: true,
        opacity: 0.9,
      });
      const line = new THREE.LineSegments(edges, lineMat);
      line.position.y = h / 2;
      bGroup.add(line);

      // Roof Details (HVAC Units, Solar Arrays, Antennas)
      const roofHvacGeo = new THREE.BoxGeometry(w * 0.35, 1.2, d * 0.35);
      const roofHvacMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
      const roofHvac = new THREE.Mesh(roofHvacGeo, roofHvacMat);
      roofHvac.position.set(0, h + 0.6, 0);
      bGroup.add(roofHvac);

      // Floor Slices / Windows indicator planes
      const floorsCount = b.floorsCount || 3;
      const floorHeight = h / floorsCount;

      for (let f = 1; f < floorsCount; f++) {
        const slabGeo = new THREE.BoxGeometry(w + 0.1, 0.2, d + 0.1);
        const slabMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
        const slabMesh = new THREE.Mesh(slabGeo, slabMat);
        slabMesh.position.y = f * floorHeight;
        bGroup.add(slabMesh);
      }

      // Building 3D Label & Status Halo at top
      const statusColor = b.status === 'critical' ? 0xf43f5e : b.status === 'warning' ? 0xf59e0b : 0x10b981;
      const topBeaconGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const topBeaconMat = new THREE.MeshBasicMaterial({ color: statusColor });
      const topBeacon = new THREE.Mesh(topBeaconGeo, topBeaconMat);
      topBeacon.position.set(0, h + 2.5, 0);
      bGroup.add(topBeacon);

      scene.add(bGroup);
      buildingMeshesRef.current.set(b.id, bGroup);
      interactiveMeshesRef.current.set(bMesh.uuid, { type: 'building', data: b });
    });

    // 2. Create Equipment 3D Models
    equipment.forEach(eq => {
      const eqGroup = new THREE.Group();
      eqGroup.position.set(eq.position.x, eq.position.y, eq.position.z);

      const isEqSelected = selectedEquipment?.id === eq.id;
      const eqStatusColor = eq.status === 'critical' ? 0xf43f5e : eq.status === 'warning' ? 0xf59e0b : 0x10b981;

      // Equipment Body Shape according to category
      let eqGeo: THREE.BufferGeometry;
      if (eq.category === 'server_rack') {
        eqGeo = new THREE.BoxGeometry(1.4, 2.6, 1.2);
      } else if (eq.category === 'gpu_cluster') {
        eqGeo = new THREE.BoxGeometry(1.6, 2.2, 1.4);
      } else if (eq.category === 'transformer') {
        eqGeo = new THREE.CylinderGeometry(1.2, 1.2, 2.0, 16);
      } else if (eq.category === 'robot_arm') {
        eqGeo = new THREE.CylinderGeometry(0.6, 0.9, 2.4, 12);
      } else {
        eqGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
      }

      const eqMat = new THREE.MeshStandardMaterial({
        color: isEqSelected ? 0x06b6d4 : 0x1e293b,
        metalness: 0.85,
        roughness: 0.25,
        emissive: eq.status === 'critical' ? 0x881337 : (eq.status === 'warning' ? 0x78350f : 0x064e3b),
        emissiveIntensity: eq.status === 'critical' ? 0.6 : 0.2,
      });

      const eqMesh = new THREE.Mesh(eqGeo, eqMat);
      eqMesh.position.y = 1.2;
      eqMesh.castShadow = true;
      eqMesh.receiveShadow = true;
      eqMesh.userData = { type: 'equipment', id: eq.id, data: eq };
      eqGroup.add(eqMesh);

      // High-tech edge highlight
      const eqEdges = new THREE.EdgesGeometry(eqGeo);
      const eqEdgeMat = new THREE.LineBasicMaterial({
        color: isEqSelected ? 0x38bdf8 : eqStatusColor,
        linewidth: 2,
      });
      const eqLine = new THREE.LineSegments(eqEdges, eqEdgeMat);
      eqLine.position.y = 1.2;
      eqGroup.add(eqLine);

      // Status Ring on Ground
      const ringGeo = new THREE.RingGeometry(1.2, 1.5, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: eqStatusColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: eq.status === 'critical' ? 0.9 : 0.6,
      });
      const haloRing = new THREE.Mesh(ringGeo, ringMat);
      haloRing.name = 'haloRing';
      haloRing.rotation.x = -Math.PI / 2;
      haloRing.position.y = 0.05;
      eqGroup.add(haloRing);

      // Hovering Floating Alert Indicator Point
      const beaconGeo = new THREE.OctahedronGeometry(0.35);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: eqStatusColor,
        wireframe: eq.status === 'normal',
      });
      const pointBeacon = new THREE.Mesh(beaconGeo, beaconMat);
      pointBeacon.name = 'pointBeacon';
      pointBeacon.position.set(0, 2.8, 0);
      eqGroup.add(pointBeacon);

      scene.add(eqGroup);
      equipmentMeshesRef.current.set(eq.id, eqGroup);
      interactiveMeshesRef.current.set(eqMesh.uuid, { type: 'equipment', data: eq });
    });
  }, [buildings, equipment, selectedEquipment, selectedBuilding, selectedFloorLevel, viewMode]);

  // Smooth focus on target position if provided (e.g. from Alert or Tree select)
  useEffect(() => {
    if (focusTargetPosition) {
      cameraTarget.current.set(focusTargetPosition.x, focusTargetPosition.y, focusTargetPosition.z);
      cameraRadius.current = 14;
      cameraPhi.current = Math.PI / 3.8;
      isTransitioningCamera.current = true;
    }
  }, [focusTargetPosition]);

  // Handle Raycasting for Click & Hover
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cameraRef.current || !sceneRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    setMousePos({ x: e.clientX, y: e.clientY });

    // Handle Orbit Pan / Rotate Dragging
    if (isDragging.current) {
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      cameraTheta.current -= deltaX * 0.008;
      cameraPhi.current += deltaY * 0.008;
      updateCameraPosition();
    } else if (isRightDragging.current) {
      // Pan camera target
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      const panSpeed = 0.04;
      const forward = new THREE.Vector3();
      cameraRef.current.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();
      const right = new THREE.Vector3().crossVectors(cameraRef.current.up, forward).normalize();

      cameraTarget.current.addScaledVector(right, deltaX * panSpeed);
      cameraTarget.current.addScaledVector(forward, -deltaY * panSpeed);
      updateCameraPosition();
    } else {
      // Raycast Hover
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

      const interactiveList = Array.from(interactiveMeshesRef.current.keys())
        .map(uuid => sceneRef.current?.getObjectByProperty('uuid', uuid))
        .filter(Boolean) as THREE.Object3D[];

      const intersects = raycaster.intersectObjects(interactiveList, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const entry = interactiveMeshesRef.current.get(hit.uuid);
        if (entry) {
          setHoveredEntity({
            name: entry.data.name,
            type: entry.type === 'building' ? `Building (${entry.data.code})` : `Equipment (${entry.data.code})`,
            status: entry.data.status,
          });
          canvasRef.current.style.cursor = 'pointer';
          return;
        }
      }

      setHoveredEntity(null);
      canvasRef.current.style.cursor = 'grab';
    }

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button === 0) {
      isDragging.current = true;
    } else if (e.button === 2) {
      isRightDragging.current = true;
    }
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = false;
    isRightDragging.current = false;

    // Check if it was a fast click (raycast selection)
    if (!canvasRef.current || !cameraRef.current || !sceneRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

    const interactiveList = Array.from(interactiveMeshesRef.current.keys())
      .map(uuid => sceneRef.current?.getObjectByProperty('uuid', uuid))
      .filter(Boolean) as THREE.Object3D[];

    const intersects = raycaster.intersectObjects(interactiveList, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const entry = interactiveMeshesRef.current.get(hit.uuid);

      if (entry) {
        if (entry.type === 'equipment') {
          onSelectEquipment(entry.data as Equipment);
          // Lerp camera to equipment
          cameraTarget.current.set(entry.data.position.x, entry.data.position.y, entry.data.position.z);
          cameraRadius.current = 10;
          cameraPhi.current = Math.PI / 3.6;
          isTransitioningCamera.current = true;
        } else if (entry.type === 'building') {
          onSelectBuilding(entry.data as Building);
          cameraTarget.current.set(entry.data.position.x, entry.data.position.y, entry.data.position.z);
          cameraRadius.current = 24;
          cameraPhi.current = Math.PI / 3.4;
          isTransitioningCamera.current = true;
        }
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY * 0.035;
    cameraRadius.current = Math.max(5, Math.min(95, cameraRadius.current + zoomFactor));
    updateCameraPosition();
  };

  // Quick Preset Camera Positions
  const setPresetCamera = (type: 'overview' | 'server_room' | 'aiml_lab' | 'substation' | 'top_down') => {
    isTransitioningCamera.current = true;
    if (type === 'overview') {
      cameraTarget.current.set(0, 0, 0);
      cameraRadius.current = 46;
      cameraTheta.current = Math.PI / 4;
      cameraPhi.current = Math.PI / 3.4;
    } else if (type === 'server_room') {
      const sr = equipment.find(e => e.id === 'eq-sr-rack-04');
      if (sr) {
        cameraTarget.current.set(sr.position.x, sr.position.y, sr.position.z);
        cameraRadius.current = 10;
        cameraTheta.current = Math.PI / 3;
        cameraPhi.current = Math.PI / 3.2;
        onSelectEquipment(sr);
      }
    } else if (type === 'aiml_lab') {
      const aiEq = equipment.find(e => e.id === 'eq-gpu-cluster-01');
      if (aiEq) {
        cameraTarget.current.set(aiEq.position.x, aiEq.position.y, aiEq.position.z);
        cameraRadius.current = 12;
        cameraTheta.current = Math.PI / 2.5;
        cameraPhi.current = Math.PI / 3.2;
        onSelectEquipment(aiEq);
      }
    } else if (type === 'substation') {
      const tx = equipment.find(e => e.id === 'eq-transformer-33k');
      if (tx) {
        cameraTarget.current.set(tx.position.x, tx.position.y, tx.position.z);
        cameraRadius.current = 14;
        cameraTheta.current = -Math.PI / 3;
        cameraPhi.current = Math.PI / 3.4;
        onSelectEquipment(tx);
      }
    } else if (type === 'top_down') {
      cameraTarget.current.set(0, 0, 0);
      cameraRadius.current = 55;
      cameraTheta.current = 0;
      cameraPhi.current = 0.15; // almost direct top down
    }
  };

  return (
    <div 
      ref={containerRef} 
      id="nexus-3d-viewport" 
      className="relative w-full h-full min-h-[460px] bg-[#05070c] overflow-hidden select-none"
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        onContextMenu={e => e.preventDefault()}
      />

      {/* Top HUD Controls Layer */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[#090d16]/90 border border-cyan-500/20 backdrop-blur-md rounded-lg pointer-events-auto shadow-lg">
          <button
            id="btn-view-standard"
            onClick={() => onViewModeChange?.('standard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'standard'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Standard 3D
          </button>
          <button
            id="btn-view-thermal"
            onClick={() => onViewModeChange?.('thermal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'thermal'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Thermal Heatmap
          </button>
          <button
            id="btn-view-energy"
            onClick={() => onViewModeChange?.('energy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'energy'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Energy Grid
          </button>
          <button
            id="btn-view-security"
            onClick={() => onViewModeChange?.('security')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'security'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Occupancy & Sec
          </button>
        </div>

        {/* Spatial Presets & Reset */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden md:flex items-center gap-1 p-1 bg-[#090d16]/90 border border-white/10 backdrop-blur-md rounded-lg">
            <button
              onClick={() => setPresetCamera('overview')}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded transition-colors"
              title="Campus Skyview"
            >
              Skyview
            </button>
            <button
              onClick={() => setPresetCamera('server_room')}
              className="px-2.5 py-1 text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-500/20 rounded transition-colors font-medium"
              title="Focus Server Room HPC (Critical Alert)"
            >
              Server SR-04 ⚠️
            </button>
            <button
              onClick={() => setPresetCamera('aiml_lab')}
              className="px-2.5 py-1 text-xs text-amber-300 hover:text-amber-200 hover:bg-amber-500/20 rounded transition-colors"
              title="Focus DGX AI Lab"
            >
              AI Cluster
            </button>
            <button
              onClick={() => setPresetCamera('substation')}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-yellow-300 hover:bg-yellow-500/10 rounded transition-colors"
              title="Focus 33kV Substation"
            >
              Substation
            </button>
            <button
              onClick={() => setPresetCamera('top_down')}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded transition-colors"
              title="2D Top-down Schematic"
            >
              2D Schematic
            </button>
          </div>

          <button
            onClick={() => setPresetCamera('overview')}
            className="p-2 bg-[#090d16]/90 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 backdrop-blur-md rounded-lg transition-colors shadow-md"
            title="Reset Camera Target"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating 3D Telemetry HUD / Coordinates */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3 pointer-events-none z-10 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#090d16]/80 border border-white/10 backdrop-blur-md rounded-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300 font-semibold">ENGINE: THREE.JS R185</span>
          <span className="text-slate-600">|</span>
          <span>FPS: {hudStats.fps}</span>
          <span className="text-slate-600">|</span>
          <span>ENTITIES: {buildings.length + equipment.length}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#090d16]/80 border border-white/10 backdrop-blur-md rounded-md">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span>Left-Click: Rotate • Right-Click: Pan • Scroll: Zoom</span>
        </div>
      </div>

      {/* Interactive Entity Hover Tooltip */}
      {hoveredEntity && (
        <div
          className="fixed pointer-events-none z-50 px-3 py-2 bg-slate-950/95 border border-cyan-500/40 rounded-md shadow-2xl backdrop-blur-lg transform -translate-x-1/2 -translate-y-full -mt-3"
          style={{ left: mousePos.x, top: mousePos.y }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <span
              className={`w-2 h-2 rounded-full ${
                hoveredEntity.status === 'critical'
                  ? 'bg-rose-500'
                  : hoveredEntity.status === 'warning'
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`}
            />
            {hoveredEntity.name}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{hoveredEntity.type}</div>
          <div className="text-[10px] text-cyan-300 mt-1 font-mono">Click to inspect digital twin metrics &gt;</div>
        </div>
      )}
    </div>
  );
};
