import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

export function CyberGrid() {
  const gridRef = useRef<THREE.Mesh>(null);

  // Simplified grid material
  const gridMaterial = new THREE.MeshBasicMaterial({
    color: '#00d4ff',
    transparent: true,
    opacity: 0.2,
    wireframe: true,
    side: THREE.DoubleSide,
  });

  useFrame((state) => {
    if (gridRef.current && gridRef.current.material) {
      const material = gridRef.current.material as THREE.MeshBasicMaterial;
      // Simple pulsing opacity
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      {/* Main Grid Floor */}
      <Plane
        ref={gridRef}
        args={[50, 50, 20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -8, 0]}
        material={gridMaterial}
      />
      
      {/* Vertical Grid Walls */}
      <Plane
        args={[50, 30, 20, 15]}
        rotation={[0, 0, 0]}
        position={[0, 0, -15]}
        material={gridMaterial.clone()}
      />
      
      <Plane
        args={[50, 30, 20, 15]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-15, 0, 0]}
        material={gridMaterial.clone()}
      />
    </group>
  );
}