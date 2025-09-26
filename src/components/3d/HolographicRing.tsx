import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Ring } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicRingProps {
  radius: number;
  position: [number, number, number];
  rotationSpeed?: number;
  opacity?: number;
}

export function HolographicRing({ 
  radius, 
  position, 
  rotationSpeed = 1,
  opacity = 0.5 
}: HolographicRingProps) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * rotationSpeed;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ringRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Ring
      ref={ringRef}
      args={[radius - 0.2, radius, 64]}
      position={position}
    >
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </Ring>
  );
}