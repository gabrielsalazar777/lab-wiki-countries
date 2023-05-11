import { Link, useParams } from 'react-router-dom';
import countriesData from '../countries.json';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDetails = () => {
  const { countryCode } = useParams();
  const [foundCountry, setFoundCountry] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryCode}`)
      .then((response) => {
        setFoundCountry(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [countryCode]);

  //   const foundCountry = countriesData.find((oneCountry) => {
  //     return oneCountry.alpha3Code === countryCode;
  //   });

  let img;
  !isLoading
    ? (img = `https://flagpedia.net/data/flags/icon/72x54/${foundCountry.alpha2Code.toLowerCase()}.png`)
    : (img = '');

  return (
    <>
      {!isLoading ? (
        <div className="col-7">
          <img src={img} style={{ width: '30%' }} alt="country-flag" />
          <h1>{foundCountry.name.common}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{foundCountry.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {foundCountry.area} km <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {foundCountry.borders.map((border) => {
                      return (
                        <li>
                          <Link to={`/${border}`}>{border}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default CountryDetails;
