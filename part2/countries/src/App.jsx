import { useState , useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import getAllCountries from './services/countries'
import countries from './services/countries'


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState('')

  useEffect(() => {
    getAllCountries()
      .then((countries) => {
        console.log("promise fulfilled")
        setCountries(countries)
      })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    const filteredCountries = newFilter === 0
      ? countries
      : countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.trim().toLowerCase()))
    
    setFilteredCountries(countries)
    setFilter(newFilter)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
    </div>
  )
}

export default App
