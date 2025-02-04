import React, { useState } from 'react';
import './App.css'; // Importing CSS file

function App() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState('');
  const [i, setI] = useState('');

  // Format date to DD/MM/YYYY
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Adjust date to the same day in previous/next month
  const adjustDate = (date, monthChange) => {
    let newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + monthChange);

    // Ensure the same day (14th of every month), adjusting if needed
    if (newDate.getDate() !== date.getDate()) {
      newDate.setDate(date.getDate());
    }

    return newDate;
  };

  const handleSubmit = () => {
    if (!fromDate || !toDate || !amount || !percentage) {
      alert('All fields are required!');
      console.log('Error: One or more fields are empty.');
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (from >= to) {
      alert('From Date should be earlier than To Date!');
      console.log('Error: From Date is greater than or equal to To Date.');
      return;
    }

    // Calculate months difference
    const totalMonths = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    const completedMonths = totalMonths - (to.getDate() < from.getDate() ? 1 : 0);

    // Interest per month
    const monthlyInterest = (amount / 100) * percentage;
    const totalInterest = monthlyInterest * completedMonths;

    // Adjust prevMonth and nextMonth with gaps
    const prevMonth = adjustDate(from, completedMonths);
    const nextMonth = adjustDate(from, completedMonths + 1);

    // Calculate interest for the previous and next months
    const prevTotalInterest = monthlyInterest * completedMonths;
    const nextTotalInterest = monthlyInterest * (completedMonths + 1);

    const gapNextToTo = Math.abs((to - nextMonth) / (1000 * 60 * 60 * 24)); // Gap in days

    console.log(
      `Previous Month: ${formatDate(prevMonth)}, Interest for ${completedMonths} months: ${prevTotalInterest}`
    );
    console.log(
      `Next Month: ${formatDate(nextMonth)}, Interest for ${completedMonths + 1} months: ${nextTotalInterest}`
    );

    const gapPrevToTo = Math.abs((to - prevMonth) / (1000 * 60 * 60 * 24)); // Gap in days between prevMonth and toDate
    
    setI(`
          Interest Per Month: ${monthlyInterest}
          Total Interest for ${completedMonths} months: ${totalInterest}
          
          ${formatDate(prevMonth)} (Gap: ${gapPrevToTo} days)
          Interest for ${completedMonths} months: ${prevTotalInterest}
  
    
          ${formatDate(nextMonth)} (Gap: ${gapNextToTo} days)
          Interest for ${completedMonths + 1} months: ${nextTotalInterest}
        `);
  };

  return (
    <div className="app-container">
      <h1>Interest Calculation</h1>
      <p>Developed by Prabhas</p>

      <div className="container">
        <div className="date-container">
          <div className="main">
            <h3>From</h3>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>

          <div className="main">
            <h3>To</h3>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
        </div>

        <div className="main">
          <input type="number" placeholder="Enter total amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input type="number" placeholder="Enter percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
        </div>

        <button onClick={handleSubmit}>Enter</button>

        <div className="output">
          <pre>{i}</pre> {/* Displays interest & formatted dates */}
        </div>
      </div>
    </div>
  );
}

export default App;
