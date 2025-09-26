import { Suspense, useState } from 'react';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Scene3DWrapper } from './Scene3DWrapper';
import { AIModelCube } from './AIModelCube';
import { FloatingParticles } from './FloatingParticles';
import { CyberGrid } from './CyberGrid';
import { HolographicRing } from './HolographicRing';

interface Scene3DProps {
  selectedModel?: string;
  className?: string;
}

export function Scene3D({ selectedModel, className }: Scene3DProps) {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative w-full h-full ${className}`}
    >
      <Scene3DWrapper>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        
        {/* Environment and Lighting */}
        <Environment preset="night" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        
        {/* 3D Models Array */}
        <group>
          {/* Central Main Model */}
          <AIModelCube
            position={[0, 0, 0]}
            scale={1.2}
            modelType="neural-network"
            label="Neural Network"
            accuracy={94.7}
            isSelected={selectedModel === 'neural-network'}
            onHover={setHoveredModel}
          />
          
          {/* Orbiting Models */}
          <AIModelCube
            position={[-4, 2, -2]}
            scale={0.8}
            modelType="computer-vision"
            label="Computer Vision"
            accuracy={91.2}
            isSelected={selectedModel === 'computer-vision'}
            onHover={setHoveredModel}
            rotationSpeed={0.5}
          />
          
          <AIModelCube
            position={[4, -1, -1]}
            scale={0.7}
            modelType="nlp"
            label="NLP Engine"
            accuracy={89.8}
            isSelected={selectedModel === 'nlp'}
            onHover={setHoveredModel}
            rotationSpeed={-0.3}
          />
          
          <AIModelCube
            position={[-3, -3, 1]}
            scale={0.6}
            modelType="analytics"
            label="Analytics AI"
            accuracy={87.3}
            isSelected={selectedModel === 'analytics'}
            onHover={setHoveredModel}
            rotationSpeed={0.7}
          />
          
          <AIModelCube
            position={[3, 3, -3]}
            scale={0.9}
            modelType="deep-learning"
            label="Deep Learning"
            accuracy={96.1}
            isSelected={selectedModel === 'deep-learning'}
            onHover={setHoveredModel}
            rotationSpeed={-0.4}
          />
        </group>

        {/* Interactive Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          autoRotate={!hoveredModel}
          autoRotateSpeed={0.5}
        />
      </Scene3DWrapper>

      {/* Overlay UI */}
      {hoveredModel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-lg"
        >
          <h3 className="text-lg font-bold text-primary neon-text">
            {hoveredModel.replace('-', ' ').toUpperCase()}
          </h3>
          <p className="text-sm text-muted-foreground">
            Advanced AI model with real-time processing capabilities
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}