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

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
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
  const [notification, setNotification] = useState(null)

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
      id: String(persons.length + 1)
    }
    const checkName = persons.find(prop => prop.name.toLowerCase() === newPerson.name.toLowerCase())
    if (checkName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(checkName.id, newPerson)
          .then(updatedPerson => 
            setPersons(persons => 
              persons.map((person) => 
              person.id !== updatedPerson.id ? person : updatedPerson)
          ))
          .catch(() => {
            setNotification({
              type: "error",
              message: `Information of ${newName} has already been removed from server`
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNumber('')
        })
        .catch(error=>{
          setNotification({
            type:"error",
            message:error.response.data.error
          })
          setTimeout(()=>{
            setNotification(null)
          }, 5000)
        })
      setNotification({
        type: "success",
        message: `Added ${newPerson.name}`
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
        .then(() => {
          setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
          );
        })
    }
  };
  
  
  const filteredPersons = persons.filter(person => 
                                          person.name.toLowerCase().includes(filterName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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

