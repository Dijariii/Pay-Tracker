
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentStatusProps {
  paid: boolean;
  month?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  date?: string;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ 
  paid, 
  month, 
  size = 'md', 
  showText = true,
  date
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };
  
  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16
  };
  
  return (
    <div className="flex items-center gap-2">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center font-medium transition-transform hover:scale-105", 
          sizeClasses[size],
          paid 
            ? "bg-green-500/20 text-green-500 border border-green-500/30" 
            : "bg-red-500/20 text-red-500 border border-red-500/30"
        )}
      >
        {paid ? (
          <Check size={iconSize[size]} />
        ) : (
          <AlertCircle size={iconSize[size]} />
        )}
      </div>
      
      {showText && (
        <div className="flex flex-col">
          {month && <span className="text-sm text-white/80 font-medium">{month}</span>}
          <span className={cn(
            "text-xs",
            paid ? "text-green-500" : "text-red-500"
          )}>
            {paid ? `Paid${date ? ` · ${date}` : ''}` : 'Unpaid'}
          </span>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
