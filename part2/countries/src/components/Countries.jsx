const Countries = ({ countries }) => {
    return countries.map((country) => (
        <div key={country.name.common}>
          <p>
            {country.name.common}
          </p>
        </div>
      ));
}

export default Countries;