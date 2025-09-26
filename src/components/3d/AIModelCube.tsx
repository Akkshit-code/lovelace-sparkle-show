import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Html } from '@react-three/drei';
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

  const getModelColor = (type: string): string => {
    const colors: Record<string, string> = {
      'neural-network': '#00d4ff',
      'computer-vision': '#a855f7',
      'nlp': '#00ff88',
      'analytics': '#ff6b6b',
      'deep-learning': '#ffd93d'
    };
    return colors[type] || '#00d4ff';
  };

  const getModelIcon = (type: string): string => {
    const icons: Record<string, string> = {
      'neural-network': '🧠',
      'computer-vision': '👁️',
      'nlp': '💬',
      'analytics': '📊',
      'deep-learning': '🔬'
    };
    return icons[type] || '🤖';
  };

  const modelColor = getModelColor(modelType);
  const modelIcon = getModelIcon(modelType);

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
          color={modelColor}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          wireframe={!isSelected}
          emissive={modelColor}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Box>

      {/* Floating Wireframe */}
      <Box args={[2.2, 2.2, 2.2]}>
        <meshBasicMaterial
          color={modelColor}
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
          <div className="text-2xl mb-1">{modelIcon}</div>
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
              <meshBasicMaterial color={modelColor} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}