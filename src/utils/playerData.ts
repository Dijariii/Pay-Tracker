
export interface Player {
  id: number;
  name: string;
  position: string;
  jerseyNumber: number;
  imageUrl?: string;
  payments: {
    month: string;
    year: number;
    paid: boolean;
    amount: number;
    date?: string;
  }[];
}

// Mock data for players
export const players: Player[] = [
  {
    id: 1,
    name: "Armend Krasniqi",
    position: "Goalkeeper",
    jerseyNumber: 1,
    imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNvY2NlciUyMHBsYXllcnxlbnwwfHwwfHx8MA%3D%3D",
    payments: [
      { month: "January", year: 2023, paid: true, amount: 25, date: "2023-01-05" },
      { month: "February", year: 2023, paid: true, amount: 25, date: "2023-02-03" },
      { month: "March", year: 2023, paid: true, amount: 25, date: "2023-03-07" },
      { month: "April", year: 2023, paid: false, amount: 25 },
      { month: "May", year: 2023, paid: false, amount: 25 }
    ]
  },
  {
    id: 2,
    name: "Drilon Berisha",
    position: "Defender",
    jerseyNumber: 4,
    imageUrl: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vdGJhbGwlMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D",
    payments: [
      { month: "January", year: 2023, paid: true, amount: 25, date: "2023-01-10" },
      { month: "February", year: 2023, paid: true, amount: 25, date: "2023-02-12" },
      { month: "March", year: 2023, paid: true, amount: 25, date: "2023-03-15" },
      { month: "April", year: 2023, paid: true, amount: 25, date: "2023-04-10" },
      { month: "May", year: 2023, paid: true, amount: 25, date: "2023-05-08" }
    ]
  },
  {
    id: 3,
    name: "Burim Hoxha",
    position: "Midfielder",
    jerseyNumber: 8,
    imageUrl: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vdGJhbGwlMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D",
    payments: [
      { month: "January", year: 2023, paid: true, amount: 25, date: "2023-01-03" },
      { month: "February", year: 2023, paid: true, amount: 25, date: "2023-02-05" },
      { month: "March", year: 2023, paid: false, amount: 25 },
      { month: "April", year: 2023, paid: false, amount: 25 },
      { month: "May", year: 2023, paid: false, amount: 25 }
    ]
  },
  {
    id: 4,
    name: "Valon Gashi",
    position: "Forward",
    jerseyNumber: 10,
    imageUrl: "https://images.unsplash.com/photo-1580698543091-f2ee757a7e62?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vdGJhbGwlMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D",
    payments: [
      { month: "January", year: 2023, paid: true, amount: 25, date: "2023-01-07" },
      { month: "February", year: 2023, paid: true, amount: 25, date: "2023-02-09" },
      { month: "March", year: 2023, paid: true, amount: 25, date: "2023-03-05" },
      { month: "April", year: 2023, paid: true, amount: 25, date: "2023-04-08" },
      { month: "May", year: 2023, paid: false, amount: 25 }
    ]
  },
  {
    id: 5,
    name: "Besart Morina",
    position: "Defender",
    jerseyNumber: 3,
    imageUrl: "https://images.unsplash.com/photo-1507249098506-78d442e2fd8e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb3RiYWxsJTIwcGxheWVyfGVufDB8fDB8fHww",
    payments: [
      { month: "January", year: 2023, paid: true, amount: 25, date: "2023-01-12" },
      { month: "February", year: 2023, paid: true, amount: 25, date: "2023-02-14" },
      { month: "March", year: 2023, paid: true, amount: 25, date: "2023-03-11" },
      { month: "April", year: 2023, paid: false, amount: 25 },
      { month: "May", year: 2023, paid: false, amount: 25 }
    ]
  },
  {
    id: 6,
    name: "Faton Kryeziu",
    position: "Midfielder",
    jerseyNumber: 6,
    imageUrl: "https://images.unsplash.com/photo-1604935189570-46c92a9f2ef8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb3RiYWxsJTIwcGxheWVyfGVufDB8fDB8fHww",
    payments: [
      { month: "January", year: 2023, paid: true, amount: 25, date: "2023-01-02" },
      { month: "February", year: 2023, paid: true, amount: 25, date: "2023-02-04" },
      { month: "March", year: 2023, paid: true, amount: 25, date: "2023-03-03" },
      { month: "April", year: 2023, paid: true, amount: 25, date: "2023-04-02" },
      { month: "May", year: 2023, paid: true, amount: 25, date: "2023-05-05" }
    ]
  },
  {
    id: 7,
    name: "Liridon Rexhepi",
    position: "Forward",
    jerseyNumber: 11,
    imageUrl: "https://images.unsplash.com/photo-1580698544585-56c7ed64d4d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb3RiYWxsJTIwcGxheWVyfGVufDB8fDB8fHww",
    payments: [
      { month: "January", year: 2023, paid: true, amount: 25, date: "2023-01-15" },
      { month: "February", year: 2023, paid: false, amount: 25 },
      { month: "March", year: 2023, paid: false, amount: 25 },
      { month: "April", year: 2023, paid: false, amount: 25 },
      { month: "May", year: 2023, paid: false, amount: 25 }
    ]
  },
  {
    id: 8,
    name: "Adnan Haliti",
    position: "Goalkeeper",
    jerseyNumber: 12,
    imageUrl: "https://images.unsplash.com/photo-1618667622988-33499ab97a2e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZvb3RiYWxsJTIwcGxheWVyfGVufDB8fDB8fHww",
    payments: [
      { month: "January", year: 2023, paid: true, amount: 25, date: "2023-01-08" },
      { month: "February", year: 2023, paid: true, amount: 25, date: "2023-02-08" },
      { month: "March", year: 2023, paid: true, amount: 25, date: "2023-03-09" },
      { month: "April", year: 2023, paid: true, amount: 25, date: "2023-04-09" },
      { month: "May", year: 2023, paid: true, amount: 25, date: "2023-05-10" }
    ]
  }
];

// Helper functions for data analysis
export const getPaymentStats = () => {
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
    paidPercentage: Math.round((paidCount / (paidCount + overdueCount)) * 100)
  };
};

export const getMonthlyPaymentStatus = () => {
  const months = ["January", "February", "March", "April", "May"];
  
  const monthlyStats = months.map(month => {
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
      percentage: Math.round((totalPaid / totalPlayers) * 100)
    };
  });
  
  return monthlyStats;
};
