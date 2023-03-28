import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0630101921' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <Form persons={persons}
        newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber}
        setPersons={setPersons} />
      <h2>Numbers</h2>
      <Numbers persons={persons} newSearch={newSearch} />
    </div>
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
      setPersons([...persons, { name: newName }, { number: newNumber }])
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