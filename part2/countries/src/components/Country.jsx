const Country = ( {country}) => {
    <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
        </ul>
        <img source={country.flags.png} alt={country.flags.alt}></img>
    </div>
}

export default Country