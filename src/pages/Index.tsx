import { useState } from "react";
import { motion } from "framer-motion";
import { Scene3D } from "@/components/3d/Scene3D";
import { ModelCard } from "@/components/ui/ModelCard";
import { StatCard } from "@/components/ui/StatCard";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const aiModels = [
  {
    id: 'neural-network',
    title: 'GPT-4 Enhanced NLP',
    description: 'Advanced natural language processing with contextual understanding and sentiment analysis capabilities.',
    accuracy: 94.7,
    status: 'active' as const,
    category: 'NLP',
    icon: '🧠'
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision AI',
    description: 'Real-time object detection and image classification using state-of-the-art deep learning models.',
    accuracy: 91.2,
    status: 'active' as const,
    category: 'Vision',
    icon: '👁️'
  },
  {
    id: 'analytics',
    title: 'Predictive Analytics',
    description: 'Machine learning models for forecasting trends and behavioral predictions with high accuracy.',
    accuracy: 89.8,
    status: 'training' as const,
    category: 'Analytics',
    icon: '📊'
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning Engine',
    description: 'Advanced neural networks for complex pattern recognition and decision making processes.',
    accuracy: 96.1,
    status: 'active' as const,
    category: 'Deep Learning',
    icon: '🔬'
  },
  {
    id: 'nlp',
    title: 'Advanced NLP Suite',
    description: 'Comprehensive natural language processing with multilingual support and context awareness.',
    accuracy: 88.5,
    status: 'idle' as const,
    category: 'NLP',
    icon: '💬'
  }
];

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<string>('neural-network');
  const [view, setView] = useState<'3d' | 'grid'>('3d');

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_70%)]" />
          
          {view === '3d' ? (
            <Scene3D selectedModel={selectedModel} className="absolute inset-0" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-6"
              >
                <h1 className="text-7xl font-bold neon-text bg-gradient-cyber bg-clip-text text-transparent">
                  CyberNet
                </h1>
                <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
                  AI Model Integration Platform
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Cutting-edge machine learning models for Media.net Hackathon. 
                  Experience the future of AI with our 3D interactive platform.
                </p>
              </motion.div>
            </div>
          )}

          {/* Floating Controls */}
          <div className="absolute top-6 right-6 z-10 flex space-x-3">
            <Button
              variant={view === '3d' ? 'default' : 'outline'}
              onClick={() => setView('3d')}
              className="cyber-button"
            >
              🎯 3D View
            </Button>
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              onClick={() => setView('grid')}
              className="cyber-button"
            >
              📋 Grid View
            </Button>
          </div>

          {/* Call to Action */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex space-x-4"
            >
              <Button className="cyber-button px-8 py-3 text-lg">
                🚀 Explore Models
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg">
                🎮 View Demo
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 px-6 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <StatCard
              icon="🤖"
              label="AI Models"
              value="15+"
              description="Active & Training"
              gradient
            />
            <StatCard
              icon="🎯"
              label="Avg Accuracy"
              value="92%"
              description="Across All Models"
            />
            <StatCard
              icon="📊"
              label="Data Points"
              value="1.2M"
              description="Processed Daily"
            />
            <StatCard
              icon="⚡"
              label="Uptime"
              value="99.9%"
              description="System Reliability"
            />
          </div>
        </section>

        {/* AI Models Showcase */}
        <section className="flex-1 py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold mb-4 neon-text">
                🤖 AI Models Showcase
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover our cutting-edge AI models designed for the Media.net Hackathon. 
                Each model is optimized for performance and accuracy.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ModelCard
                    title={model.title}
                    description={model.description}
                    accuracy={model.accuracy}
                    status={model.status}
                    category={model.category}
                    icon={model.icon}
                    isSelected={selectedModel === model.id}
                    onSelect={() => setSelectedModel(model.id)}
                    onDemo={() => console.log(`Demo ${model.title}`)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
