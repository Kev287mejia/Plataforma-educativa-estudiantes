"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { KingPulankaTribute } from "./KingPulankaTribute";

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-slate-900">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]} // Optimize for performance and retina displays
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        
        {/* Environment setup for the glass reflections */}
        <Environment resolution={256} blur={1}>
          {/* Lightformers act as glowing white panels in the environment map to create crisp reflections on the glass */}
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={[50, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
          </group>
        </Environment>

        <Suspense fallback={null}>
          <KingPulankaTribute />
        </Suspense>
      </Canvas>
    </div>
  );
}
