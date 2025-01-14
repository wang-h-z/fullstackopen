import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)