
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { usePlayersContext } from '@/contexts/PlayersContext';

interface DeletePlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playerId: number;
  playerName: string;
}

const DeletePlayerDialog: React.FC<DeletePlayerDialogProps> = ({ 
  open, 
  onOpenChange, 
  playerId,
  playerName
}) => {
  const { deletePlayer } = usePlayersContext();
  
  const handleDelete = () => {
    deletePlayer(playerId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gjakova-black border-gjakova-gray/30">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-full">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <DialogTitle className="text-white">Delete Player</DialogTitle>
          </div>
          <DialogDescription className="text-white/60">
            Are you sure you want to delete {playerName}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gjakova-gray/30 text-white hover:bg-gjakova-gray/30 hover:text-white"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePlayerDialog;
