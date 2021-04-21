import React,{useState,useEffect} from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY


const SearchBar = ({value,onChange}) =>{
  return(
  <form>
        find countries <input 
        value={value}
        onChange={onChange} />
  </form>
  )
}

const CountryList = ({found,setShow}) =>{
  return(
    <div>
      {found.map(country => {
        return(
          <div key={country.name}>      
            {country.name}
            <button 
              value={country.name}
              onClick={() => setShow(country.name)}>
              show
            </button>
          </div>)})}
    </div>
  )
}

const WeatherInfo = ({country}) =>{
  const [weather,setWeather] = useState({current:{
    temperature:"",
    weather_descriptions: [""],
    weather_icons: [""],
    wind_degree: "",
    wind_dir: "",
    wind_speed: ""}})

  const params = {
    'access_key':api_key,
    'query':country.capital
  }
  
  useEffect(() =>{
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data)
      })
  },[])

  console.log(weather)
  return(
    <div>
      <h1>Weather in {country.name}</h1>
      <div>temperature {weather.current.temperature} celsius</div>
      <div><img src={weather.current.weather_icons} alt={`weather icon`} width="50"/></div>
      Wind {weather.current.wind_speed} mph direction {weather.current.wind_dir}
    </div>
  )
}

const DisplayCountry = ({country}) =>{
  return(
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h1>languages</h1>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul> 
      <img src={country.flag} alt={`Flag of ${country.name}`} width="300"/>
      <WeatherInfo country={country}/>
    </div>
  )

}


const Info = ({countries,search,setShow}) =>{
    const found = countries
      .filter(country => country.name.toLowerCase()
      .includes(search.toString().toLowerCase())
      )

    if (found.length > 10) {
      return(<div>Too many matches, specify another filter.</div>)
    }
    if (10 > found.length && found.length > 1){
      return(<CountryList found={found} setShow={setShow}/>)
    }
    if (found.length === 1){
      return(<DisplayCountry country={found[0]}/>)
    }
    if (found.length === 0 && search.length > 0){
      return(<div>No country found</div>)
    }
    else{return(<div></div>)}
}



const App = () =>{

  const [search,setSearch] = useState([])
  const [countries,setCountries] = useState([])

  useEffect(() =>{
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  },[])

  

  const handleOnChangeSearch = (event) =>{
    setSearch(event.target.value)
  }

  return(
    <div>
      <SearchBar value={search} onChange={handleOnChangeSearch}/>
      <Info countries={countries} search={search} setShow={setSearch} />
    </div>
  )
}

export default App;
