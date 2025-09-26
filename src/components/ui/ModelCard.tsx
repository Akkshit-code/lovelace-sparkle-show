import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ModelCardProps {
  title: string;
  description: string;
  accuracy: number;
  status: 'active' | 'training' | 'idle';
  category: string;
  icon: string;
  onDemo?: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

export function ModelCard({
  title,
  description,
  accuracy,
  status,
  category,
  icon,
  onDemo,
  onSelect,
  isSelected = false
}: ModelCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent text-accent-foreground';
      case 'training': return 'bg-secondary text-secondary-foreground';
      case 'idle': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '●';
      case 'training': return '◐';
      case 'idle': return '○';
      default: return '○';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card 
        className={`h-full glass-card transition-all duration-300 cursor-pointer group ${
          isSelected ? 'ring-2 ring-primary cyber-button' : 'hover:border-primary/50'
        }`}
        onClick={onSelect}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{icon}</div>
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
                <Badge variant="outline" className="mt-1 text-xs">
                  {category}
                </Badge>
              </div>
            </div>
            <Badge className={`${getStatusColor(status)} animate-pulse`}>
              {getStatusIcon(status)} {status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-bold text-primary">{accuracy}%</span>
              </div>
              <Progress 
                value={accuracy} 
                className="h-2 bg-muted"
              />
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 cyber-button text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onDemo?.();
                }}
              >
                🚀 Demo
              </Button>
              <Button 
                variant={isSelected ? "default" : "secondary"} 
                size="sm" 
                className="flex-1 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.();
                }}
              >
                {isSelected ? '✓ Selected' : 'Select'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}