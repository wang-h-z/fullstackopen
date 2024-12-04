import Countries from "./Countries"
import Country from "./Country"

const Notes = ( {countries, selectCountry} ) =>  {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter {countries.length}</p>
    }

    if (countries.length <= 10 && countries.length > 1) {
        return <Countries countries={countries} selectCountry={selectCountry}></Countries>
    }

    if (countries.length === 1) {
        console.log(countries[0])
        return <Country country={countries[0]}></Country>
    }

    return <p>No matches</p>
}

export default Notes