import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  description?: string;
  gradient?: boolean;
}

export function StatCard({ icon, label, value, description, gradient = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`glass-card text-center p-6 ${gradient ? 'bg-gradient-cyber' : ''} pulse-glow`}>
        <CardContent className="p-0">
          <div className="text-4xl mb-3">{icon}</div>
          <div className={`text-3xl font-bold mb-1 ${gradient ? 'text-primary-foreground neon-text' : 'text-primary neon-text'}`}>
            {value}
          </div>
          <div className={`text-sm font-medium mb-1 ${gradient ? 'text-primary-foreground/90' : 'text-foreground'}`}>
            {label}
          </div>
          {description && (
            <div className={`text-xs ${gradient ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {description}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}