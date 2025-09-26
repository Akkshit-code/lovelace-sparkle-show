import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count: number;
}

export function FloatingParticles({ count }: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, [count]);

  const colors = useMemo(() => {
    const colorArray = new Float32Array(count * 3);
    const cyberColors = [
      [0, 0.83, 1], // Cyber blue
      [0.66, 0.33, 1], // Electric purple
      [0, 1, 0.53], // Neon green
    ];
    
    for (let i = 0; i < count; i++) {
      const colorIndex = Math.floor(Math.random() * cyberColors.length);
      const color = cyberColors[colorIndex];
      const i3 = i * 3;
      colorArray[i3] = color[0];
      colorArray[i3 + 1] = color[1];
      colorArray[i3 + 2] = color[2];
    }
    
    return colorArray;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Floating motion
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        
        // Rotating motion
        const radius = Math.sqrt(positions[i3] ** 2 + positions[i3 + 2] ** 2);
        const angle = Math.atan2(positions[i3 + 2], positions[i3]) + 0.002;
        positions[i3] = radius * Math.cos(angle);
        positions[i3 + 2] = radius * Math.sin(angle);
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="attributes-color"
        count={count}
        array={colors}
        itemSize={3}
      />
    </Points>
  );
}