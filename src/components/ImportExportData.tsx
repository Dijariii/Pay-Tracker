
import React, { useState } from 'react';
import { Download, Upload, FileDown, FileUp } from 'lucide-react';
import { exportData, importData } from '@/utils/localStorage';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { usePlayersContext } from '@/contexts/PlayersContext';

const ImportExportData: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const { syncData } = usePlayersContext();
  
  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create temporary link to download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = `gjakova-fc-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Data exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
      console.error('Export error:', error);
    }
  };
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsImporting(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const success = importData(jsonData);
        
        if (success) {
          toast.success('Data imported successfully');
          // Refresh data
          syncData();
        } else {
          toast.error('Failed to import data');
        }
      } catch (error) {
        toast.error('Invalid data format');
        console.error('Import error:', error);
      } finally {
        setIsImporting(false);
        // Reset the input
        event.target.value = '';
      }
    };
    
    reader.onerror = () => {
      toast.error('Error reading file');
      setIsImporting(false);
      // Reset the input
      event.target.value = '';
    };
    
    reader.readAsText(file);
  };
  
  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-lg font-bold mb-4">Data Management</h2>
      
      <div className="flex flex-col space-y-4">
        <div>
          <Button
            variant="outline"
            onClick={handleExport}
            className="w-full justify-start border-gjakova-gray/30 hover:bg-gjakova-gray/20"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <p className="text-xs text-white/60 mt-1">
            Download all player data and attendance records as a JSON file.
          </p>
        </div>
        
        <div>
          <label className="cursor-pointer">
            <div className="w-full flex items-center justify-start px-4 py-2 rounded-md border border-gjakova-gray/30 bg-transparent hover:bg-gjakova-gray/20 text-sm font-medium transition-colors">
              <FileUp className="mr-2 h-4 w-4" />
              Import Data
              <input 
                type="file" 
                accept=".json"
                className="hidden"
                onChange={handleImport}
                disabled={isImporting}
              />
            </div>
          </label>
          <p className="text-xs text-white/60 mt-1">
            Import player data and attendance records from a JSON file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportExportData;
