import { useState, useEffect } from 'react'
import React from 'react'

import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [persons, setPersons])

  return (
    < div >
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <Form persons={persons}
        newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber}
        setPersons={setPersons} />
      <h2>Numbers</h2>
      <Numbers persons={persons} newSearch={newSearch} setPersons={setPersons} />
    </div >
  )
}

function delNumber (persons, person, index, setPersons) {
  //console.log(person, index)
  if(window.confirm(`Delete ${person.name} ?`)) {
    personService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(person => person.index !== index))
      })
    }
}

const Filter = ({ newSearch, setNewSearch }) => {
  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  }

  return (
    <form>
      <div>
        filter shown with <input type="text" value={newSearch} onChange={handleSearch} />
      </div>
    </form>
  )
}

const Form = ({ persons, newName, newNumber, setNewName, setNewNumber, setPersons }) => {
  // const handleSubmit = (event) => {

  const addNew = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (nameExists) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`) 
      if (confirmed){
       return 
      }

    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          //setPersons('')
        })
    }
  }
  /* event.preventDefault()
   const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
   if (nameExists) {
     window.alert(`${newName} is already added to phonebook`)
   }
   else
     setPersons([...persons, { name: newName, number: newNumber }])
   setNewName('')
   setNewNumber('')*/

  return (
    <form onSubmit={addNew}>
      <h3>Add a new</h3>
      <div>
        name:<input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:<input type="text" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = ({ persons, newSearch, setPersons }) => {
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    filteredPersons.map((person, index) => (
      <div key={index}>{person.name} {person.number} 
        <button onClick= {() => delNumber(persons, person, person.id, setPersons)}>delete</button>
      </div>))
  )
}


export default App