
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePlayersContext } from '@/contexts/PlayersContext';
import { DollarSign, Calendar, User } from 'lucide-react';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playerId: number;
  paymentIndex: number;
  playerName: string;
  month: string;
  year: number;
  amount: number;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ 
  open, 
  onOpenChange, 
  playerId, 
  paymentIndex, 
  playerName, 
  month, 
  year, 
  amount 
}) => {
  const { recordPayment } = usePlayersContext();
  
  const handleRecordPayment = () => {
    recordPayment(playerId, paymentIndex);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gjakova-black border-gjakova-gray/30">
        <DialogHeader>
          <DialogTitle className="text-white">Record Payment</DialogTitle>
          <DialogDescription className="text-white/60">
            Confirm payment details before recording.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gjakova-gray/10 rounded-lg">
            <div className="p-2 bg-gjakova-gray/20 rounded-full">
              <User size={18} className="text-white/60" />
            </div>
            <div>
              <p className="text-sm text-white/60">Player</p>
              <p className="font-medium text-white">{playerName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gjakova-gray/10 rounded-lg">
            <div className="p-2 bg-gjakova-gray/20 rounded-full">
              <Calendar size={18} className="text-white/60" />
            </div>
            <div>
              <p className="text-sm text-white/60">Period</p>
              <p className="font-medium text-white">{month} {year}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gjakova-gray/10 rounded-lg">
            <div className="p-2 bg-gjakova-gray/20 rounded-full">
              <DollarSign size={18} className="text-white/60" />
            </div>
            <div>
              <p className="text-sm text-white/60">Amount</p>
              <p className="font-medium text-white">€{amount}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gjakova-gray/30 text-white hover:bg-gjakova-gray/30 hover:text-white"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRecordPayment}
            className="bg-gjakova-red text-white hover:bg-gjakova-dark-red"
          >
            Confirm Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
