import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log("l'anguille", response.data)
        console.log("c'est vigousse", persons)
      })
  }, [])
  console.log("je t'ai vu")

  return (
    < div >
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <Form persons={persons}
        newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber}
        setPersons={setPersons} />
      <h2>Numbers</h2>
      <Numbers persons={persons} newSearch={newSearch} />
    </div >
  )
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
  const handleSubmit = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (nameExists) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else
      setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={handleSubmit}>
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

const Numbers = ({ persons, newSearch }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    filteredPersons.map((person, index) => (
      <div key={index}>{person.name} {person.number}</div>))
  )
}


export default App