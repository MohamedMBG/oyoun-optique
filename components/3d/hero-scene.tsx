"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

// Stylized eyeglasses component
function Eyeglasses() {
  const groupRef = useRef<THREE.Group>(null);

  // Create frame geometry
  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E3B261"),
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 1,
      }),
    []
  );

  const lensMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#ffffff"),
        metalness: 0,
        roughness: 0,
        transmission: 0.95,
        thickness: 0.5,
        ior: 1.5,
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle parallax based on mouse position
      const { x, y } = state.mouse;
      groupRef.current.rotation.y = x * 0.1;
      groupRef.current.rotation.x = y * 0.05;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.2, 0.2]}
    >
      <group ref={groupRef} scale={0.9}>
        {/* Left lens frame */}
        <mesh position={[-1.2, 0, 0]} material={frameMaterial}>
          <torusGeometry args={[0.8, 0.05, 16, 64]} />
        </mesh>

        {/* Right lens frame */}
        <mesh position={[1.2, 0, 0]} material={frameMaterial}>
          <torusGeometry args={[0.8, 0.05, 16, 64]} />
        </mesh>

        {/* Left lens */}
        <mesh position={[-1.2, 0, 0]} material={lensMaterial}>
          <circleGeometry args={[0.75, 32]} />
        </mesh>

        {/* Right lens */}
        <mesh position={[1.2, 0, 0]} material={lensMaterial}>
          <circleGeometry args={[0.75, 32]} />
        </mesh>

        {/* Bridge */}
        <mesh position={[0, 0.3, 0]} material={frameMaterial} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
        </mesh>

        {/* Left temple */}
        <group position={[-2.05, 0.2, -0.8]} rotation={[0, -0.3, 0]}>
          <mesh material={frameMaterial} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 2.5, 16]} />
          </mesh>
        </group>

        {/* Right temple */}
        <group position={[2.05, 0.2, -0.8]} rotation={[0, 0.3, 0]}>
          <mesh material={frameMaterial} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 2.5, 16]} />
          </mesh>
        </group>

        {/* Nose pads */}
        <mesh position={[-0.5, -0.5, 0.3]} material={frameMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <mesh position={[0.5, -0.5, 0.3]} material={frameMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
      </group>
    </Float>
  );
}

// Ambient particles for atmosphere
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 100;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const particlesMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#E3B261"),
        size: 0.03,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      }),
    []
  );

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef} geometry={particlesGeometry} material={particlesMaterial} />
  );
}

// Fallback component for SSR/mobile
function HeroFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-8 bg-gold/30 rounded-full blur-2xl animate-pulse delay-150" />
      </div>
    </div>
  );
}

// Main scene component
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#E3B261"
      />
      <spotLight
        position={[-5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />
      <pointLight position={[0, -3, 2]} intensity={0.5} color="#E3B261" />
      
      <Eyeglasses />
      <Particles />
      
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.3}
        scale={10}
        blur={2}
        far={4}
        resolution={256}
        frames={1}
      />
      
      <Environment preset="city" resolution={256} />
    </>
  );
}

// Main export component
export function HeroScene() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<HeroFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
