
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePlayersContext } from '@/contexts/PlayersContext';

interface AddPlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPlayerDialog: React.FC<AddPlayerDialogProps> = ({ open, onOpenChange }) => {
  const { addPlayer } = usePlayersContext();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    jerseyNumber: '',
    category: 'U15',
    imageUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addPlayer({
      name: formData.name,
      position: formData.position,
      jerseyNumber: parseInt(formData.jerseyNumber) || 0,
      category: formData.category as 'U7' | 'U9' | 'U11' | 'U13' | 'U15',
      imageUrl: formData.imageUrl || undefined,
      payments: []
    });
    
    // Reset form and close dialog
    setFormData({
      name: '',
      position: '',
      jerseyNumber: '',
      category: 'U15',
      imageUrl: ''
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gjakova-black border-gjakova-gray/30">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Player</DialogTitle>
          <DialogDescription className="text-white/60">
            Fill in the details to add a new player to the team.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-gjakova-gray/30 bg-gjakova-gray/20 text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position" className="text-white">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="border-gjakova-gray/30 bg-gjakova-gray/20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jerseyNumber" className="text-white">Jersey #</Label>
              <Input
                id="jerseyNumber"
                name="jerseyNumber"
                type="number"
                value={formData.jerseyNumber}
                onChange={handleChange}
                required
                className="border-gjakova-gray/30 bg-gjakova-gray/20 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="text-white">Age Category</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md border border-gjakova-gray/30 bg-gjakova-gray/20 text-white focus:outline-none focus:ring-1 focus:ring-gjakova-red"
            >
              <option value="U7">Under 7</option>
              <option value="U9">Under 9</option>
              <option value="U11">Under 11</option>
              <option value="U13">Under 13</option>
              <option value="U15">Under 15</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-white">Profile Image URL (optional)</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="border-gjakova-gray/30 bg-gjakova-gray/20 text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
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
              type="submit" 
              className="bg-gjakova-red text-white hover:bg-gjakova-dark-red"
            >
              Add Player
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlayerDialog;
