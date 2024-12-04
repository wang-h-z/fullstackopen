import { useState , useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import getAllCountries from './services/countries'
import countries from './services/countries'
import Notes from './components/Notes'


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    getAllCountries()
      .then((countries) => {
        console.log("promise fulfilled")
        setCountries(countries)
        setFilteredCountries(countries);
      })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    const filteredCountries = newFilter.trim().length === 0
      ? countries
      : countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.trim().toLowerCase()))
    
    setFilteredCountries(filteredCountries)
    setFilter(newFilter)
  }

  const selectCountry = (country) => {
    setFilteredCountries([country])
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <Notes countries={filteredCountries} selectCountry={selectCountry} />
    </div>
  )
}

export default App
