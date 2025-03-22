
import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@/utils/playerData';
import PaymentStatus from './PaymentStatus';
import { ChevronRight } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  // Calculate payment statistics
  const totalPayments = player.payments.length;
  const paidPayments = player.payments.filter(payment => payment.paid).length;
  const paymentPercentage = Math.round((paidPayments / totalPayments) * 100);
  
  // Get the latest payment status
  const latestPayment = player.payments[player.payments.length - 1];
  
  return (
    <Link 
      to={`/players/${player.id}`}
      className="glass-card rounded-xl overflow-hidden hover:border-gjakova-red/30 button-transition hover-scale"
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gjakova-red/20">
            {player.imageUrl ? (
              <img 
                src={player.imageUrl} 
                alt={player.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gjakova-gray/50 flex items-center justify-center text-white font-bold text-lg">
                {player.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg text-white">{player.name}</h3>
            <div className="flex items-center text-white/60 text-sm mt-1">
              <span className="mr-2">{player.position}</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span className="ml-2">#{player.jerseyNumber}</span>
            </div>
          </div>
          
          <ChevronRight className="text-white/40" size={20} />
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="bg-gjakova-gray/30 rounded-lg px-3 py-2">
            <span className="text-xs text-white/60">Payment Status</span>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium">{paidPayments}/{totalPayments} Paid</span>
              <span className="mx-2 text-white/30">|</span>
              <span className={`text-sm font-medium ${paymentPercentage >= 70 ? 'text-green-500' : paymentPercentage >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                {paymentPercentage}%
              </span>
            </div>
          </div>
          
          <PaymentStatus 
            paid={latestPayment.paid} 
            month={latestPayment.month}
            size="sm"
          />
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
