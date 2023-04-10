import { useState, useEffect } from 'react'
import React from 'react'
import './index.css'

import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [addMessage, setaddMessage] = useState(null)
  const [errorMessage, seterrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    < div >
      <h1>Phonebook</h1>
      <Notification addmessage={addMessage} errormessage={errorMessage}/>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <Form persons={persons}
        newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber}
        setPersons={setPersons}
        addMessage={addMessage}
        setaddMessage={setaddMessage} />
      <h2>Numbers</h2>
      <Numbers persons={persons} newSearch={newSearch} setPersons={setPersons} seterrorMessage={seterrorMessage} />
    </div >
  )
}

const Notification = ({ addmessage, errormessage }) => {
  if (addmessage === null && errormessage === null) {
    return null
  }
  if (errormessage)
    return (
      <div className='error'>
        {errormessage}
      </div>
    ) 
  if (addmessage)
    return (
      <div className='add'>
        {addmessage}
      </div>
    ) 
}

function delNumber (persons, person, setPersons, seterrorMessage) {
  if(window.confirm(`Delete ${person.name} ?`)) {
    personService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id))
      })
      .catch(error=> {
        seterrorMessage(`Information of '${person.name} has already been removed from server`)
        setPersons(persons.filter((p) => p.id !== person.id))
      })
      setTimeout(() => {seterrorMessage(null)}, 5000)  
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

const Form = ({ persons, newName, newNumber, setNewName, setNewNumber, setPersons, addMessage, setaddMessage}) => {
  // const handleSubmit = (event) => {

  const addNew = (event) => {
    event.preventDefault()
    const nameExists= persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (nameExists) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)){
        return
      } 
      else {
        const updatedPerson = { ...nameExists, number: newNumber }
          personService
          .update(nameExists.id, updatedPerson)
          .then(returnedPerson => {
            const updatedPerson = persons.map(person => {
              if (person.id === returnedPerson.id) {
                return returnedPerson
              } 
              else {
                return person
              }
            })
          setPersons(updatedPerson)
          })
        }
        setaddMessage(
          `added number change for '${newName}'`
        )
        setTimeout(() => {
          setaddMessage(null)
        }, 5000)  
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setaddMessage(
            `added '${newName}'`
          )
          setTimeout(() => {
            setaddMessage(null)
          }, 5000)  
         
        })
     }
    }

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

const Numbers = ({ persons, newSearch, setPersons, seterrorMessage }) => {
  console.log(persons);
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    filteredPersons.map((person) => (
      <div key={person.id}>{person.name} {person.number} 
        <button onClick= {() => delNumber(persons, person, setPersons, seterrorMessage)}>delete</button>
      </div>))
  )
}


export default App