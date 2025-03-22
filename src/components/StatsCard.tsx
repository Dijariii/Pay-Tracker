
import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon,
  trend,
  variant = 'default'
}) => {
  const variantClasses = {
    default: "glass-card",
    primary: "bg-gjakova-red/10 border border-gjakova-red/20",
    success: "bg-green-500/10 border border-green-500/20",
    warning: "bg-yellow-500/10 border border-yellow-500/20"
  };
  
  const iconClasses = {
    default: "text-white/60",
    primary: "text-gjakova-red",
    success: "text-green-500",
    warning: "text-yellow-500"
  };
  
  return (
    <div className={cn("rounded-xl p-6 animate-scale-up", variantClasses[variant])}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-white/60 mb-1">{title}</p>
          <h4 className="text-2xl font-bold">{value}</h4>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-xs font-medium",
                trend.positive ? "text-green-500" : "text-red-500"
              )}>
                {trend.positive ? '+' : '-'}{trend.value}%
              </span>
              <span className="text-xs text-white/40 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={cn("rounded-full p-3", iconClasses[variant])}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
