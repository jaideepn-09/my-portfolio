'use client'
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import CanvasLoader from "./Loader";

const Earth = () => {
    const [model, setModel] = useState(null);
  
    useEffect(() => {
      new GLTFLoader().load('/planet/scene.gltf', (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.geometry.computeBoundingSphere();
          }
        });
        setModel(gltf.scene);
      });
    }, []);
  
    return model ? <primitive object={model} /> : null;
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
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};
export default EarthCanvas;
