import React          from 'react'
import './App.css'
import BasicForm      from './testForms/BasicForm'
import ValidationForm from './components/formTestValidation/formValidation'

const App : React.FC = () => {
  return (
    <div className="App">

      <ValidationForm/>

    </div>
  )
}

export default App
