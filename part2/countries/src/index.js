import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

axios.get('https://restcountries.com/v3.1/all').then(response => {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
})