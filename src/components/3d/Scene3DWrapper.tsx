import { Suspense, Component, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

interface Scene3DWrapperProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class Scene3DErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full glass-card">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-lg font-bold text-primary neon-text mb-2">
              3D Scene Loading...
            </h3>
            <p className="text-sm text-muted-foreground">
              Initializing cyberpunk interface
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function Scene3DSuspenseFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🚀</div>
        <h3 className="text-lg font-bold text-primary neon-text">
          Loading 3D Models...
        </h3>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce [animation-delay:0.1s]"></div>
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>
      </div>
    </div>
  );
}

export function Scene3DWrapper({ children }: Scene3DWrapperProps) {
  return (
    <Scene3DErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0a', 0);
        }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </Scene3DErrorBoundary>
  );
}