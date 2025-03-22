
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { players } from '@/utils/playerData';
import PaymentStatus from '@/components/PaymentStatus';
import { ArrowLeft, User, Edit, MessageSquare, CheckCircle2, Circle } from 'lucide-react';

const PlayerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState(players.find(p => p.id === Number(id)));
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'payments' | 'details'>('payments');

  useEffect(() => {
    // Simulate loading player data
    const timer = setTimeout(() => {
      setPlayer(players.find(p => p.id === Number(id)));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

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

  if (!player) {
    return (
      <div className="md:pl-72 pt-20 md:pt-8 px-4 md:px-10 min-h-screen">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Player Not Found</h2>
          <p className="text-white/60 mb-6">We couldn't find the player you're looking for.</p>
          <Link 
            to="/players" 
            className="inline-flex items-center px-6 py-3 bg-gjakova-red text-white rounded-lg hover:bg-gjakova-dark-red transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  // Calculate payment statistics
  const totalPayments = player.payments.length;
  const paidPayments = player.payments.filter(payment => payment.paid).length;
  const paymentPercentage = Math.round((paidPayments / totalPayments) * 100);

  return (
    <div className="page-transition min-h-screen">
      {/* Page Content */}
      <div className="md:pl-72 pt-20 md:pt-8 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/players" 
            className="inline-flex items-center px-4 py-2 mb-6 bg-gjakova-gray/20 text-white/80 rounded-lg hover:bg-gjakova-gray/30 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Players
          </Link>
          
          {/* Player Header */}
          <div className="glass-card rounded-xl overflow-hidden mb-8 animate-fade-in">
            <div className="relative h-40 bg-gradient-to-r from-gjakova-black to-gjakova-red/50">
              <div className="absolute -bottom-10 left-8 w-24 h-24 rounded-full border-4 border-gjakova-black overflow-hidden">
                {player.imageUrl ? (
                  <img 
                    src={player.imageUrl} 
                    alt={player.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gjakova-gray flex items-center justify-center text-white font-bold text-2xl">
                    {player.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <button className="absolute top-4 right-4 p-2 bg-gjakova-black/40 rounded-full hover:bg-gjakova-black/60 transition-colors">
                <Edit size={18} className="text-white/80" />
              </button>
            </div>
            
            <div className="p-8 pt-14">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{player.name}</h1>
                  <div className="flex items-center text-white/60 mt-1">
                    <span>{player.position}</span>
                    <span className="mx-2">•</span>
                    <span>#{player.jerseyNumber}</span>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0 flex items-center gap-3">
                  <div className="px-4 py-2 bg-gjakova-gray/20 rounded-lg">
                    <div className="text-xs text-white/60">Payment Rate</div>
                    <div className="font-medium">{paymentPercentage}%</div>
                  </div>
                  <button className="p-3 bg-gjakova-red/10 text-gjakova-red rounded-lg hover:bg-gjakova-red/20 transition-colors">
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gjakova-gray/20 mb-6">
            <button
              className={`px-6 py-3 font-medium text-sm relative ${
                activeTab === 'payments' 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80'
              }`}
              onClick={() => setActiveTab('payments')}
            >
              Payments
              {activeTab === 'payments' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gjakova-red"></span>
              )}
            </button>
            
            <button
              className={`px-6 py-3 font-medium text-sm relative ${
                activeTab === 'details' 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Player Details
              {activeTab === 'details' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gjakova-red"></span>
              )}
            </button>
          </div>
          
          {/* Content based on active tab */}
          <div className="animate-fade-in">
            {activeTab === 'payments' && (
              <>
                {/* Payment Overview */}
                <div className="glass-card rounded-xl p-6 mb-6">
                  <h2 className="text-lg font-medium mb-4">Payment Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gjakova-gray/20 rounded-lg p-4">
                      <div className="text-sm text-white/60 mb-1">Total Due</div>
                      <div className="text-xl font-bold">€{totalPayments * 25}</div>
                    </div>
                    
                    <div className="bg-gjakova-gray/20 rounded-lg p-4">
                      <div className="text-sm text-white/60 mb-1">Paid</div>
                      <div className="text-xl font-bold">€{paidPayments * 25}</div>
                    </div>
                    
                    <div className="bg-gjakova-gray/20 rounded-lg p-4">
                      <div className="text-sm text-white/60 mb-1">Remaining</div>
                      <div className="text-xl font-bold">€{(totalPayments - paidPayments) * 25}</div>
                    </div>
                  </div>
                </div>
                
                {/* Payment History */}
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">Payment History</h2>
                    <button className="px-4 py-2 bg-gjakova-red text-white rounded-lg text-sm hover:bg-gjakova-dark-red transition-colors">
                      Record Payment
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {player.payments.map((payment, index) => (
                      <div 
                        key={`${payment.month}-${payment.year}`}
                        className="flex items-center justify-between p-4 rounded-lg bg-gjakova-gray/10 border border-gjakova-gray/10 hover:border-gjakova-gray/20 transition-all animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center">
                          <PaymentStatus 
                            paid={payment.paid} 
                            size="md"
                            showText={false}
                          />
                          <div className="ml-3">
                            <div className="font-medium">{payment.month} {payment.year}</div>
                            <div className="text-sm text-white/60">€{payment.amount}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          {payment.paid ? (
                            <div className="text-green-500 text-sm">Paid on {payment.date}</div>
                          ) : (
                            <button className="px-3 py-1 bg-gjakova-red/10 text-gjakova-red text-sm rounded hover:bg-gjakova-red/20 transition-colors">
                              Mark as Paid
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'details' && (
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-lg font-medium mb-6">Player Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-white/60 mb-1">Full Name</div>
                      <div className="font-medium">{player.name}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-white/60 mb-1">Position</div>
                      <div className="font-medium">{player.position}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-white/60 mb-1">Jersey Number</div>
                      <div className="font-medium">#{player.jerseyNumber}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-white/60 mb-1">Payment Status</div>
                      <div className={`font-medium ${paymentPercentage >= 70 ? 'text-green-500' : paymentPercentage >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {paymentPercentage >= 70 ? 'Good Standing' : paymentPercentage >= 40 ? 'Partial' : 'Behind'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gjakova-gray/20">
                    <h3 className="text-md font-medium mb-4">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-white/60 mb-1">Email</div>
                        <div className="font-medium">contact@example.com</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-white/60 mb-1">Phone</div>
                        <div className="font-medium">+383 44 123 456</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gjakova-gray/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-md font-medium">Additional Details</h3>
                      <button className="text-gjakova-red text-sm hover:text-gjakova-light-red">
                        Edit
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center py-2">
                        <CheckCircle2 size={18} className="text-green-500 mr-3" />
                        <span>Registered Player</span>
                      </div>
                      
                      <div className="flex items-center py-2">
                        <Circle size={18} className="text-white/40 mr-3" />
                        <span className="text-white/60">Medical Check</span>
                      </div>
                      
                      <div className="flex items-center py-2">
                        <CheckCircle2 size={18} className="text-green-500 mr-3" />
                        <span>Signed Contract</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
