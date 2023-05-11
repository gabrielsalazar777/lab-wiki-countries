import logo from './logo.svg';
import './App.css';
import countriesData from './countries.json';
import { useState } from 'react';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  axios
    .get('https://ih-countries-api.herokuapp.com/countries')
    .then((response) => {
      setCountries(response.data);
    });
  // const [countries, letCountries] = useState(countriesData);


  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          <CountriesList countries={countries} />
          <Routes>
            <Route path="/:countryCode" element={<CountryDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
