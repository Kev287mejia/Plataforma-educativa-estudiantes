"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Torus, Sphere, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function DetailedAstrolabe() {
  const outerRingRef = useRef<THREE.Group>(null);
  const middleRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.2;
      outerRingRef.current.rotation.y = t * 0.3;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.x = t * -0.4;
      middleRingRef.current.rotation.z = t * 0.5;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = t * 0.6;
      innerRingRef.current.rotation.z = t * -0.3;
    }
    if (coreRef.current) {
      // Pulsing effect for the core
      const scale = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Outer Ring - Very thin and elegant */}
        <group ref={outerRingRef}>
          <Torus args={[2.2, 0.03, 16, 100]}>
            <meshStandardMaterial color="#0A84FF" metalness={0.8} roughness={0.1} />
          </Torus>
          {/* Subtle glow ring */}
          <Torus args={[2.2, 0.08, 16, 100]}>
            <meshBasicMaterial color="#0A84FF" transparent opacity={0.1} />
          </Torus>
        </group>

        {/* Middle Ring */}
        <group ref={middleRingRef}>
          <Torus args={[1.8, 0.02, 16, 100]}>
            <meshStandardMaterial color="#2EC4B6" metalness={0.9} roughness={0.1} />
          </Torus>
        </group>

        {/* Inner Ring */}
        <group ref={innerRingRef}>
          <Torus args={[1.4, 0.04, 16, 100]}>
            <MeshTransmissionMaterial 
              thickness={0.1}
              roughness={0}
              transmission={1}
              ior={1.5}
              color="#FFD700" 
            />
          </Torus>
        </group>

        {/* Central Core (The "Knowledge" spark) */}
        <Sphere ref={coreRef} args={[0.5, 32, 32]}>
          <MeshTransmissionMaterial
            backside
            backsideThickness={1}
            thickness={2}
            roughness={0.1}
            transmission={1}
            ior={2}
            chromaticAberration={0.5}
            color="#ffffff"
            clearcoat={1}
          />
        </Sphere>
        
        <Sphere args={[0.3, 16, 16]}>
          <meshBasicMaterial color="#FFD700" transparent opacity={0.8} />
        </Sphere>

      </Float>
    </group>
  );
}

export function DashboardReward() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <spotLight position={[-5, 5, 5]} intensity={2} color="#0A84FF" />
        <Environment preset="city" />
        <group scale={0.65}>
          <DetailedAstrolabe />
        </group>
      </Canvas>
    </div>
  );
}
