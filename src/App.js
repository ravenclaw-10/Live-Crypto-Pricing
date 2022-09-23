// let apiKey="coinranking9c1bee803edfbb50744c9887d0c6e5788bd2d43f4f5a0eb7";
// let apiURL="https://api.coinranking.com/v2/coins";
// let apiURL_coingecko="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import WebFont from 'webfontloader';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Courgette', '-cursive']
      }
    });
   }, []);


  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Live Crypto Pricing</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
