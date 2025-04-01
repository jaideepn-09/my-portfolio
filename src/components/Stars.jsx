import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    try {
      // Create vertices
      const positions = new Float32Array(5000 * 3); // Explicitly create array with correct size
      
      // Fill with random positions manually to avoid potential issues with maath
      for (let i = 0; i < positions.length; i += 3) {
        // Generate random point in sphere using rejection sampling
        let x, y, z, radiusSquared;
        do {
          x = (Math.random() * 2 - 1) * 1.2;
          y = (Math.random() * 2 - 1) * 1.2;
          z = (Math.random() * 2 - 1) * 1.2;
          radiusSquared = x*x + y*y + z*z;
        } while (radiusSquared > 1.2*1.2 || radiusSquared === 0);
        
        positions[i] = x;
        positions[i+1] = y;
        positions[i+2] = z;
      }
      
      return positions;
    } catch (error) {
      console.error("Error creating star positions:", error);
      // Return a fallback array with no NaN values
      return new Float32Array(5000 * 3);
    }
  });

  useEffect(() => {
    // Double-check for NaN values after initialization
    for (let i = 0; i < sphere.length; i++) {
      if (isNaN(sphere[i])) {
        sphere[i] = 0;
      }
    }
  }, [sphere]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.0015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;