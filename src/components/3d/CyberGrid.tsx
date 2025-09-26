import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

export function CyberGrid() {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (gridRef.current) {
      // Subtle pulsing effect
      const material = gridRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
      }
    }
  });

  // Custom shader material for animated grid
  const gridMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#00d4ff') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
      
      void main() {
        vec2 grid = fract(vUv * 20.0);
        float line = smoothstep(0.0, 0.1, grid.x) * smoothstep(0.0, 0.1, grid.y);
        line = 1.0 - line;
        
        // Animated pulse
        float pulse = sin(uTime * 2.0 + vUv.x * 10.0 + vUv.y * 10.0) * 0.5 + 0.5;
        
        float alpha = line * 0.3 * (0.5 + pulse * 0.3);
        
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });

  return (
    <group>
      {/* Main Grid Floor */}
      <Plane
        ref={gridRef}
        args={[50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -8, 0]}
        material={gridMaterial}
      />
      
      {/* Vertical Grid Walls */}
      <Plane
        args={[50, 30]}
        rotation={[0, 0, 0]}
        position={[0, 0, -15]}
        material={gridMaterial.clone()}
      />
      
      <Plane
        args={[50, 30]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-15, 0, 0]}
        material={gridMaterial.clone()}
      />
    </group>
  );
}