"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function KingPulankaTribute() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the King Pulanka generated illustration
  const texture = useTexture("/images/king_pulanka_dance.png");
  // Set texture to cover without harsh stretching
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (groupRef.current) {
      // Parallax effect: the entire canvas subtly tilts following the mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.mouse.y * 0.1, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* 
        The Living Canvas: 
        A massive 3D plane that distorts gracefully simulating the Caribbean wind 
      */}
      <mesh position={[0, 0, -5]} scale={[35, 35, 1]}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <MeshDistortMaterial
          map={texture}
          distort={0.15} // Amount of wave distortion
          speed={1.5}    // Speed of the wind/waves
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Atmospheric Particles (Sparks / Fireflies) */}
      <Sparkles
        count={200}
        scale={25}
        size={6}
        speed={0.4}
        opacity={0.8}
        color="#F4D35E" // Golden/Fire sparks
        position={[0, 0, 5]}
      />
      
      <Sparkles
        count={100}
        scale={20}
        size={4}
        speed={0.8}
        opacity={0.5}
        color="#2EC4B6" // Teal magical particles
        position={[0, 0, 2]}
      />
    </group>
  );
}
