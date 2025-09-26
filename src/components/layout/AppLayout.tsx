import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border/50 flex items-center px-6 glass-card">
            <SidebarTrigger className="mr-4 hover:bg-primary/20 transition-colors" />
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold neon-text">CyberNet AI Platform</h1>
              <div className="text-xs text-muted-foreground">
                Media.net Hackathon 2024
              </div>
            </div>
            
            {/* Status indicators */}
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-muted-foreground">15 Models Active</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-muted-foreground">92% Avg Accuracy</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 relative">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}