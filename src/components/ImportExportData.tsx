
import React, { useState } from 'react';
import { FileDown, FileUp, FilePdf, FileSpreadsheet } from 'lucide-react';
import { exportData, importData } from '@/utils/localStorage';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { usePlayersContext } from '@/contexts/PlayersContext';
import { formatForSpreadsheet } from '@/utils/dateUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ImportExportData: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const { syncData, players } = usePlayersContext();
  
  // Export data in JSON format
  const handleExportJSON = () => {
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
      
      toast.success('Data exported as JSON');
    } catch (error) {
      toast.error('Failed to export data');
      console.error('Export error:', error);
    }
  };

  // Export data as CSV for spreadsheet
  const handleExportCSV = () => {
    try {
      // Prepare player data for CSV format
      const playersData = players.map(player => ({
        ID: player.id,
        Name: player.name,
        Category: player.category,
        Position: player.position,
        JerseyNumber: player.jerseyNumber,
        DateOfBirth: player.dateOfBirth || '',
        PaymentStatus: player.payments[player.payments.length - 1]?.paid ? 'Paid' : 'Unpaid'
      }));
      
      const csvData = formatForSpreadsheet(playersData);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `gjakova-fc-players-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Data exported as CSV');
    } catch (error) {
      toast.error('Failed to export CSV');
      console.error('CSV export error:', error);
    }
  };

  // Export data as PDF
  const handleExportPDF = () => {
    try {
      // Create a printable version of the data
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error('Pop-up blocked. Please allow pop-ups to export PDF.');
        return;
      }
      
      // HTML content for the print window
      printWindow.document.write(`
        <html>
          <head>
            <title>Gjakova FC - Players Data</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { border-collapse: collapse; width: 100%; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              h1 { color: #e11d48; }
              .header { display: flex; justify-content: space-between; align-items: center; }
              .date { font-size: 14px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Gjakova FC - Players Data</h1>
              <p class="date">Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Position</th>
                  <th>Jersey</th>
                  <th>DOB</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                ${players.map(player => `
                  <tr>
                    <td>${player.id}</td>
                    <td>${player.name}</td>
                    <td>${player.category}</td>
                    <td>${player.position}</td>
                    <td>${player.jerseyNumber}</td>
                    <td>${player.dateOfBirth || '-'}</td>
                    <td>${player.payments[player.payments.length - 1]?.paid ? 'Paid' : 'Unpaid'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Add slight delay to ensure content is loaded
      setTimeout(() => {
        printWindow.print();
        // printWindow will be automatically closed after printing or if user cancels
      }, 500);
      
      toast.success('PDF export ready');
    } catch (error) {
      toast.error('Failed to export PDF');
      console.error('PDF export error:', error);
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start border-gjakova-gray/30 hover:bg-gjakova-gray/20"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-gjakova-gray/95 border-gjakova-gray/30">
              <DropdownMenuItem onClick={handleExportJSON} className="cursor-pointer hover:bg-gjakova-gray/50">
                <FileDown className="mr-2 h-4 w-4" /> JSON Format
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer hover:bg-gjakova-gray/50">
                <FileSpreadsheet className="mr-2 h-4 w-4" /> Spreadsheet (CSV)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer hover:bg-gjakova-gray/50">
                <FilePdf className="mr-2 h-4 w-4" /> PDF Document
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-xs text-white/60 mt-1">
            Export player data and attendance records in different formats.
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
