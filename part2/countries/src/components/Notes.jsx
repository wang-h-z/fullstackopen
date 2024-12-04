import Countries from "./Countries"
import Country from "./Country"

const Notes = ( {countries} ) =>  {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter {countries.length}</p>
    }

    if (countries.length <= 10 && countries.length > 0) {
        console.log("youre fucked")
        return <Countries countries={countries}></Countries>
    }

    if (countries.length === 1) {
        console.log("reached here")
        return <Country country={countries[0]}></Country>
    }

    return <p>No matches</p>
}

export default Notes