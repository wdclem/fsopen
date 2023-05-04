import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

axios.get('http://localhost:3001/api/persons').then(response => {
    const persons = response.data
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
})