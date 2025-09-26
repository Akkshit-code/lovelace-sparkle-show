import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Brain, 
  Eye, 
  MessageSquare, 
  BarChart3, 
  Microscope,
  Home,
  Settings,
  Database,
  Zap,
  Users,
  Shield
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Neural Networks", url: "/neural", icon: Brain },
  { title: "Computer Vision", url: "/vision", icon: Eye },
  { title: "NLP Models", url: "/nlp", icon: MessageSquare },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Deep Learning", url: "/deep", icon: Microscope },
];

const systemItems = [
  { title: "Database", url: "/database", icon: Database },
  { title: "Performance", url: "/performance", icon: Zap },
  { title: "Team", url: "/team", icon: Users },
  { title: "Security", url: "/security", icon: Shield },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = !open;

  const isActive = (path: string) => currentPath === path;
  const isAIGroupExpanded = navigationItems.some((item) => isActive(item.url));
  const isSystemGroupExpanded = systemItems.some((item) => isActive(item.url));

  const getNavClasses = (path: string) =>
    isActive(path) 
      ? "bg-primary/20 text-primary border-l-2 border-primary font-medium cyber-button" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-300";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} glass-card border-r-2 border-primary/30 transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-to-b from-card/50 to-background/50">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold neon-text">CyberNet</h2>
                <p className="text-xs text-muted-foreground">AI Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Models Section */}
        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-primary font-semibold mb-2">
            🤖 AI Models
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`flex items-center space-x-3 p-3 rounded-lg ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {!collapsed && isActive(item.url) && (
                        <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Section */}
        <SidebarGroup className="px-2 mt-4">
          <SidebarGroupLabel className="text-secondary font-semibold mb-2">
            ⚡ System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`flex items-center space-x-3 p-3 rounded-lg ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {!collapsed && isActive(item.url) && (
                        <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border/50">
            <div className="glass-card p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">System Status</span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Models Active</span>
                <span className="text-accent font-bold">15</span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">Avg Accuracy</span>
                <span className="text-primary font-bold">92%</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}