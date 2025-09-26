import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count: number;
}

export function FloatingParticles({ count }: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positionsArray = new Float32Array(count * 3);
    const colorsArray = new Float32Array(count * 3);
    
    // Predefined cyber colors
    const cyberColors = [
      [0, 0.83, 1], // Cyber blue
      [0.66, 0.33, 1], // Electric purple
      [0, 1, 0.53], // Neon green
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions
      positionsArray[i3] = (Math.random() - 0.5) * 20;
      positionsArray[i3 + 1] = (Math.random() - 0.5) * 20;
      positionsArray[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Random colors from palette
      const colorIndex = Math.floor(Math.random() * cyberColors.length);
      const color = cyberColors[colorIndex];
      colorsArray[i3] = color[0];
      colorsArray[i3 + 1] = color[1];
      colorsArray[i3 + 2] = color[2];
    }
    
    return [positionsArray, colorsArray];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current?.geometry?.attributes?.position) {
      const positionAttribute = pointsRef.current.geometry.attributes.position;
      const array = positionAttribute.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Floating motion
        array[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        
        // Rotating motion
        const radius = Math.sqrt(array[i3] ** 2 + array[i3 + 2] ** 2);
        const angle = Math.atan2(array[i3 + 2], array[i3]) + 0.002;
        array[i3] = radius * Math.cos(angle);
        array[i3 + 2] = radius * Math.sin(angle);
      }
      
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}