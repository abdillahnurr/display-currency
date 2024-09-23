import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

// Regular function to fetch currency data
function fetchCurrencyData(setRates, setLoading) {
  axios
    .get(`https://api.currencyfreaks.com/latest?apikey=5d4212b0a4014db48bf022b924f54602`)
    .then((response) => {
      setRates(response.data.rates);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching exchange rates", error);
    });
}

// Regular function to calculate 'We Buy' rate
function calculateWeBuy(rate) {
  return (rate * 1.02).toFixed(4); // 2% markup for 'We Buy'
}

// Regular function to calculate 'We Sell' rate
function calculateWeSell(rate) {
  return (rate * 0.98).toFixed(4); // 2% markdown for 'We Sell'
}

// Regular function to generate table rows
function generateTableRows(props) {
  const { currencies, rates } = props;
  return currencies.map((currency) => (
    <tr key={currency}>
      <td>{currency}</td>
      <td>{calculateWeBuy(rates[currency])}</td>
      <td>{parseFloat(rates[currency]).toFixed(4)}</td>
      <td>{calculateWeSell(rates[currency])}</td>
    </tr>
  ));
}

// Stateless Table Component using regular function
function CurrencyTable(props) {
  const { rates, currencies } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>We Buy</th>
          <th>Exchange Rate</th>
          <th>We Sell</th>
        </tr>
      </thead>
      <tbody>
        {generateTableRows({ currencies, rates })}
      </tbody>
    </table>
  );
}

// Stateless Loading Component using regular function
function Loading() {
  return <div>Loading...</div>;
}

// Main App Component with regular function
function App() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrencyData(setRates, setLoading);
  }, []);

  const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "USD"];

  return (
    <div className="app">
      {loading ? <Loading /> : <CurrencyTable rates={rates} currencies={currencies} />}
      <p>Base currency is USD</p>
      <p>Data from CurrencyFreaks API</p>
    </div>
  );
}

export default App;
