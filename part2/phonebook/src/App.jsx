import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({value, onChange}) => {
    return(
      <div>
        filter shown with <input value={value} onChange={onChange}/>
      </div>
    )
}

const PersonForm = ({onSubmit, nameValue, handleNameChange, numberValue, handleNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={numberValue} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({persons, handleRemove}) => {
  return (
    <div>
       {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleRemove(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const checkName = persons.find(prop => prop.name.toLowerCase() === newPerson.name.toLowerCase())
    if (checkName) {
      alert(`${newName} is already added to phonebook`)
    } else {

      personService
        .create(newPerson)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNumber('')
        })
    }
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() =>
        setPersons(person =>
          person.filter(person => person.id !== id)
        ))
    }
  }
  
  const filteredPersons = persons.filter(person => 
                                          person.name.toLowerCase().includes(filterName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        handleNameChange={handleNameChange}
        numberValue={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
      persons={filteredPersons}
      handleRemove={handleRemove}  
      />
    </div>
  )
}

export default App


