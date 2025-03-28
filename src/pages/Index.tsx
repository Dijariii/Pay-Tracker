
import React, { useState, useEffect } from 'react';
import { getPaymentStats, getMonthlyPaymentStatus } from '@/utils/playerData';
import StatsCard from '@/components/StatsCard';
import { Users, PiggyBank, AlertCircle, Calendar, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentStatus from '@/components/PaymentStatus';
import { usePlayersContext } from '@/contexts/PlayersContext';
import OfflineIndicator from '@/components/OfflineIndicator';
import { getKosovoTime, formatReadableDate, getCurrentMonth } from '@/utils/dateUtils';

const Index = () => {
  const { players, isLoading } = usePlayersContext();
  const [stats, setStats] = useState(getPaymentStats());
  const [monthlyStats, setMonthlyStats] = useState(getMonthlyPaymentStatus());
  const [currentTime, setCurrentTime] = useState(formatReadableDate(getKosovoTime()));
  const [currentTimeObj, setCurrentTimeObj] = useState(getKosovoTime());
  
  // Update Kosovo time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const kosovoTime = getKosovoTime();
      setCurrentTime(formatReadableDate(kosovoTime));
      setCurrentTimeObj(kosovoTime);
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Recalculate stats when players data changes
      const calculateStats = () => {
        let totalPlayers = players.length;
        let totalCollected = 0;
        let totalDue = 0;
        let paidCount = 0;
        let overdueCount = 0;
        
        players.forEach(player => {
          player.payments.forEach(payment => {
            if (payment.paid) {
              totalCollected += payment.amount;
              paidCount++;
            } else {
              totalDue += payment.amount;
              overdueCount++;
            }
          });
        });
        
        return {
          totalPlayers,
          totalCollected,
          totalDue,
          paidCount,
          overdueCount,
          paidPercentage: paidCount + overdueCount > 0 
            ? Math.round((paidCount / (paidCount + overdueCount)) * 100)
            : 0
        };
      };

      const calculateMonthlyStats = () => {
        // Use actual months rather than hardcoded ones
        const currentMonth = getCurrentMonth();
        const currentMonthIndex = new Date().getMonth();
        
        // Get previous 4 months and current month
        const months = [];
        for (let i = 4; i >= 0; i--) {
          const monthIndex = (currentMonthIndex - i + 12) % 12; // Handle wrap around to previous year
          const monthName = new Date(0, monthIndex).toLocaleString('default', { month: 'long' });
          months.push(monthName);
        }
        
        return months.map(month => {
          let totalPaid = 0;
          let totalPlayers = players.length;
          
          players.forEach(player => {
            const payment = player.payments.find(p => p.month === month);
            if (payment && payment.paid) {
              totalPaid++;
            }
          });
          
          return {
            month,
            paidCount: totalPaid,
            unpaidCount: totalPlayers - totalPaid,
            percentage: totalPlayers > 0 ? Math.round((totalPaid / totalPlayers) * 100) : 0
          };
        });
      };

      setStats(calculateStats());
      setMonthlyStats(calculateMonthlyStats());
    }
  }, [players, isLoading, currentTimeObj]);

  // Animation delay utilities
  const getDelayClass = (index: number) => {
    const delays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]', 'delay-[300ms]'];
    return delays[index % delays.length];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gjakova-red/20 mb-4"></div>
          <div className="h-2 w-24 bg-gjakova-gray/20 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen">
      {/* Offline Indicator */}
      <OfflineIndicator />
      
      {/* Page Content */}
      <div className="md:pl-72 pt-20 md:pt-8 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-gjakova-red/10 text-gjakova-red text-xs font-medium rounded-full mb-2">
                Dashboard
              </div>
              <h1 className="text-3xl font-bold">Gjakova FC Payment Tracker</h1>
              <p className="text-white/60 mt-2">
                Track and manage player payment status.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center bg-gjakova-gray/20 px-4 py-2 rounded-lg text-sm text-white/80">
              <Clock size={16} className="mr-2 text-gjakova-red" />
              <span>{currentTime} (Kosovo Time)</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className={`animate-slide-up ${getDelayClass(0)}`}>
              <StatsCard
                title="Total Players"
                value={stats.totalPlayers}
                icon={<Users size={20} />}
                variant="default"
              />
            </div>
            <div className={`animate-slide-up ${getDelayClass(1)}`}>
              <StatsCard
                title="Collected Payments"
                value={`€${stats.totalCollected}`}
                icon={<PiggyBank size={20} />}
                variant="success"
                trend={{ value: 12, positive: true }}
              />
            </div>
            <div className={`animate-slide-up ${getDelayClass(2)}`}>
              <StatsCard
                title="Pending Payments"
                value={`€${stats.totalDue}`}
                icon={<AlertCircle size={20} />}
                variant="warning"
              />
            </div>
            <div className={`animate-slide-up ${getDelayClass(3)}`}>
              <StatsCard
                title="Payment Rate"
                value={`${stats.paidPercentage}%`}
                icon={<Calendar size={20} />}
                variant="primary"
              />
            </div>
          </div>

          {/* Monthly Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="glass-card rounded-xl p-6 animate-slide-up delay-[200ms]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Monthly Payment Status</h2>
                  <span className="text-xs text-white/60">{currentTimeObj.getFullYear()}</span>
                </div>
                
                <div className="space-y-6">
                  {monthlyStats.map((month, index) => (
                    <div key={month.month} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{month.month}</span>
                        <span className="text-sm text-white/60">
                          {month.paidCount}/{month.paidCount + month.unpaidCount} players paid
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gjakova-gray/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-gjakova-red to-gjakova-light-red transition-all duration-1000 ease-out" 
                          style={{ width: `${month.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="glass-card rounded-xl p-6 animate-slide-up delay-[300ms]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Quick Actions</h2>
                </div>
                
                <div className="space-y-3">
                  <Link
                    to="/players"
                    className="flex items-center justify-between p-3 rounded-lg bg-gjakova-gray/20 hover:bg-gjakova-gray/30 button-transition"
                  >
                    <div className="flex items-center">
                      <Users size={18} className="text-white/70 mr-3" />
                      <span>View All Players</span>
                    </div>
                    <ChevronRight size={18} className="text-white/40" />
                  </Link>
                  
                  <button
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gjakova-red/10 text-gjakova-red hover:bg-gjakova-red/20 button-transition"
                  >
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-3" />
                      <span>Mark Payment</span>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gjakova-gray/20">
                  <h3 className="text-sm font-medium mb-4">Overdue Payments</h3>
                  
                  {stats.overdueCount === 0 ? (
                    <div className="text-center p-4 bg-gjakova-gray/10 rounded-lg">
                      <p className="text-white/60 text-sm">No overdue payments</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {Array(Math.min(3, stats.overdueCount)).fill(0).map((_, index) => (
                        <div key={index} className="flex items-center justify-between p-2">
                          <span className="text-sm">Player {index + 1}</span>
                          <PaymentStatus paid={false} size="sm" showText={false} />
                        </div>
                      ))}
                      
                      {stats.overdueCount > 3 && (
                        <Link 
                          to="/players" 
                          className="text-sm text-gjakova-red hover:text-gjakova-light-red flex items-center justify-center mt-2"
                        >
                          View all <ChevronRight size={16} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
