'use client'
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");

  // Ensure the model is valid and has no NaN values
  useEffect(() => {
    if (earth && earth.scene) {
      earth.scene.traverse((object) => {
        if (object.isMesh && object.geometry) {
          const positions = object.geometry.attributes.position;
          
          if (positions) {
            // Check for NaN values in position attribute
            for (let i = 0; i < positions.array.length; i++) {
              if (isNaN(positions.array[i])) {
                positions.array[i] = 0;
              }
            }
            positions.needsUpdate = true;
          }
        }
      });
    }
  }, [earth]);

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      onCreated={({ gl }) => {
        // Add error handling for WebGL context
        gl.getContext().getExtension('WEBGL_debug_renderer_info');
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        {/* Disable preload temporarily to see if it's causing issues */}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;