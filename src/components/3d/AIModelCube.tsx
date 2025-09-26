import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Html } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { motion } from 'framer-motion';

interface AIModelCubeProps {
  position: [number, number, number];
  scale: number;
  modelType: string;
  label: string;
  accuracy: number;
  isSelected?: boolean;
  onHover?: (model: string | null) => void;
  rotationSpeed?: number;
}

export function AIModelCube({ 
  position, 
  scale, 
  modelType, 
  label, 
  accuracy, 
  isSelected = false,
  onHover,
  rotationSpeed = 1
}: AIModelCubeProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
      meshRef.current.rotation.y += delta * rotationSpeed;
      
      // Floating animation
      if (groupRef.current) {
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  const getModelColor = (type: string) => {
    switch (type) {
      case 'neural-network': return '#00d4ff';
      case 'computer-vision': return '#a855f7';
      case 'nlp': return '#00ff88';
      case 'analytics': return '#ff6b6b';
      case 'deep-learning': return '#ffd93d';
      default: return '#00d4ff';
    }
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'neural-network': return '🧠';
      case 'computer-vision': return '👁️';
      case 'nlp': return '💬';
      case 'analytics': return '📊';
      case 'deep-learning': return '🔬';
      default: return '🤖';
    }
  };

  return (
    <group 
      ref={groupRef}
      position={position}
      scale={isSelected ? [scale * 1.2, scale * 1.2, scale * 1.2] : [scale, scale, scale]}
      onPointerEnter={() => {
        setHovered(true);
        onHover?.(modelType);
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHover?.(null);
      }}
    >
      {/* Main Cube */}
      <Box
        ref={meshRef}
        args={[2, 2, 2]}
        onClick={() => console.log(`Selected: ${modelType}`)}
      >
        <meshStandardMaterial
          color={getModelColor(modelType)}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          wireframe={!isSelected}
          emissive={getModelColor(modelType)}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Box>

      {/* Floating Wireframe */}
      <Box args={[2.2, 2.2, 2.2]}>
        <meshBasicMaterial
          color={getModelColor(modelType)}
          transparent
          opacity={0.2}
          wireframe
        />
      </Box>

      {/* Model Label */}
      <Html 
        position={[0, 2.5, 0]} 
        center
        className={`transition-all duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card px-3 py-2 rounded-lg text-center min-w-[120px]"
        >
          <div className="text-2xl mb-1">{getModelIcon(modelType)}</div>
          <div className="text-sm font-bold text-primary neon-text">
            {label}
          </div>
          <div className="text-xs text-accent">
            {accuracy}% Accuracy
          </div>
          {isSelected && (
            <div className="text-xs text-secondary mt-1 animate-pulse">
              ● ACTIVE
            </div>
          )}
        </motion.div>
      </Html>

      {/* Particle Effects */}
      {hovered && (
        <group>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[
              Math.cos(i * Math.PI * 2 / 8) * 3,
              Math.sin(i * Math.PI * 2 / 8) * 3,
              0
            ]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial
                color={getModelColor(modelType)}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}