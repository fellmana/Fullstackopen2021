import React,{useState,useEffect} from 'react'
import personServices from './services/persons'
import Notification from './components/Notification'

const Header = ({text}) => {
  return(<h2>{text}</h2>)
}

const Filter = ({value,onChange}) => {
  return (
    <form>
    Filter shows with<input
    value={value}
    onChange={onChange}/>
  </form>
  )
}

const PersonForm = ({valueName,handleName,valueNumber,handleNumber,onClick}) => {
  return(
    <form>
    <div>
      name: <input
      value={valueName}
      onChange={handleName}/>
    </div>
    <div>
      number: <input
      value={valueNumber}
      onChange={handleNumber}/>
    </div>
    <div>
      <button type="submit" onClick={onClick}>add</button>
    </div>
  </form>
  )
}



const Persons = ({persons,filter,onRemove}) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter))
  return(
    <ul>
    {filtered.map(person =>
    <li key={person.name}>{person.name} {person.number}
    <button
    value={person.id}
    onClick={() => onRemove(person)}>delete
    </button></li>)
    }
    </ul>
  )
}

const App = () => {
  const [persons,setPersons] = useState([])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter]  = useState('')
  const [message,setMessage] = useState({msg:null,error:false})
  
  

  useEffect( () => {
    personServices.getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  },[])

  const handleOnChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleOnChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) =>{

    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const changeNumber = () => {
      persons.map(person => {
        if (person.name === newName) {
          if (window.confirm(`${person.name} is allready in phonebook, do you want to replace the number?`)){
            personServices.update(person.id,newPerson)
              .then(returnedPerson => {
                setPersons(persons.map(person => 
                  person.name !== newName ? person : returnedPerson ))
                  setMessage({msg:`${returnedPerson.name} updated`,error:false})
                  setTimeout(() => {
                    setMessage({msg:null,error:false})}
                    ,4000
                  )
                  }
                )
                .catch(error => {
                  setMessage({msg:`Failed to update ${newName}`,error:true})
                  setTimeout(
                    setMessage({msg:null,error:false}),
                    4000
                  )
            })
          }
        }
      })
    }

    persons.some((person) => person.name === newName)
    ? changeNumber()
    : personServices.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({msg:`${returnedPerson.name} added to phonebook`,error:false})
        setTimeout(() => {
          setMessage({msg:null,error:false})}
          ,4000
        )
        }
      )
      .catch(error => {
        setMessage({msg:`Failed to add ${newName}`,error:true})
        setTimeout(
          setMessage({msg:null,error:false}),
          4000
        )
      })
      
  }

  const removePerson = (person) => {
    if (window.confirm(`Do you want to delete ${person.name} ?`)) {
      personServices.remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage({msg:`${person.name} removed from phonebook`,error:false})
        setTimeout(() => {
          setMessage({msg:null,error:false})}
          ,4000
        )
        }
      )
      .catch(error => {
        console.log("error")
        setMessage({msg:`Failed to remove ${newName}. Likely removed before`,error:true})
        setTimeout(() => {
          setMessage({msg:null,error:false})},
          4000
        )
      })
    }
  }


  return(
    <div>
      <Header text="Phonebook"/>
      <Notification message={message.msg} error={message.error} />
      <Filter value={filter} onChange={handleOnChangeFilter}/>
      
      <Header text="Add a new"/>
      
      <PersonForm 
      valueName={newName}
      handleName={handleOnChangeName}
      valueNumber={newNumber}
      handleNumber={handleOnChangeNumber}
      onClick={addPerson}
      />

      <Header text="Numbers:"/>
      
      <Persons 
        persons={persons}
        filter={filter}
        onRemove={removePerson}
      />
  
    </div>
  )
}


export default App
