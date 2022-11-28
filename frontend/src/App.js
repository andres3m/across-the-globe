import './App.css';
import { FilterBar } from './components/FilterBar/FilterBar.js'
import { Header } from './components/Header/Header.js'
import { Input } from './components/Input/Input.js'
import { ObjectList } from './components/ObjectList/ObjectList.js'
import { StartPage } from './components/StartPage/StartPage.js'
import { useState } from 'react'


let url = "http://localhost:3001"


function App() {

  // Object/or set of objects sent to ObjectList
  const [object, setObject] = useState([])
  // Input sent from FilterBar for the search
  const [input, setInput] = useState("")
  // Visibility for the 'create new object' form
  const [isVisible, setVisible] = useState()
  // Visibility for the 'edit object' form
  const [isEditVisible, setEditVisible] = useState()
   // Start page visibility: 
   const [isStartPageVisible, setIsStartPageVisible] = useState(true)
  // Id of the object to be edited
  const [editObject, setEditObject] = useState()
  // Array file.
  const [arrayFile, setArrayFile] = useState([])
  // State for languages
  const [language, setLanguage] = useState('englishDefinitions')
  // foreign handleChange filterBar
  const [translateSearch, setTranslateSearch] = useState()

  const [isActive, setIsActive] = useState(false);
  const [isActiveES, setIsActiveES] = useState(false);
  const [isActiveFR, setIsActiveFR] = useState(false);
  const [isActiveDE, setIsActiveDE] = useState(false);
 
  console.log(object)

  async function getAllObjects() {
    const allObjects = await fetch(`http://localhost:3001/api/${language}`)
    let data = await allObjects.json()
    return data.payload
  }

  async function getByTitle() {
    const titleObject = await fetch(`${url}/api/${language}/${input}`)
    let data = await titleObject.json()
    return data.payload
  }

  async function handleNewObject(newObject) {
    const objectToAdd = await fetch(`http://localhost:3001/api/${language}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObject)
    })
    let data = await objectToAdd.json()
    let brandNewObject = data.payload[0]
    const objectToAddOnScreen = [...object, brandNewObject]
    setObject(objectToAddOnScreen)
  
  }

  async function handleDelete(id) {
    for (let i = 0; i < object.length; i++) {
      if (object[i].id === id) {
        await fetch(`${url}/api/${language}/${id}`, {
          method: "DELETE"
        })
        const deleted = [...object.slice(0, i), ...object.slice(i + 1)];
        setObject(deleted);
//const objectToDelete = 
      }
    } return
  }

  async function handleEdit(changes) {

    const editField = object.filter(field => { return field.id === editObject})
    
    const editedItem = createEditObject(editField, changes)
    
      await fetch(`${url}/api/${language}/${editObject}`, {
       method: 'PATCH',
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(editedItem[0])
    })
  }
  

  function createEditObject(original, newEdit) {

    if (language === 'englishDefinitions'){

      if(newEdit.title){  
        original[0].title = newEdit.title
      }
      if(newEdit.definition){
        original[0].definition = newEdit.definition
      }
      if(newEdit.example){
        original[0].example = newEdit.example
      }
      if(newEdit.links){
        original[0].links = newEdit.links
      }
      if(newEdit.week){
        original[0].week = newEdit.week
      }
    }else{

      if(newEdit.englishtitle){
        original[0].englishtitle = newEdit.englishtitle
      }
      if(newEdit.title){  
        original[0].title = newEdit.title
      }
      if(newEdit.definition){
        original[0].definition = newEdit.definition
      }
      if(newEdit.example){
        original[0].example = newEdit.example
      }
      if(newEdit.links){
        original[0].links = newEdit.links
      }
      if(newEdit.week){
        original[0].week = newEdit.week
      }
    }
    return original
  }

  function handleObjectState(object) {

    setEditObject(object)
    handleVisibilityEdit()
  }

  const handleVisibility = event => {
    setVisible(current => !current);
  };

  const handleVisibilityEdit = event => {
    setEditVisible(current => !current);
  };

  async function handleClick() {
    if (!input) {
      const objects = await getAllObjects()
      const sortedObjects = objects.sort((a, b) =>
      a.title?.localeCompare(b.title));
      setObject(sortedObjects)
    } else {
      const titleObject = await getByTitle()
      setObject(titleObject)
    }
  }

  async function handleTranslation() {
    console.log(translateSearch)

    if (!translateSearch) {
      const objects = await getAllObjects()
      const sortedObjects = objects.sort((a, b) =>
      a.title?.localeCompare(b.title));
      setObject(sortedObjects)
    }else {
      const titleObject = await getByForeignTitle()
      setObject(titleObject)
    }
  }

  async function getByForeignTitle() {
   
      const titleObject = await fetch(`${url}/api/${language}/english/${translateSearch}`)
    
      let data = await titleObject.json()
      return data.payload
  }

  function handleChange(e) {
    setInput(e.target.value)
  }

  function handleTranslateSearch(e) {
    setTranslateSearch(e.target.value)
  }

  function sortByWeek() {
    let sortedObjects = [...object].sort(function(a,b){return a.week - b.week})
    setObject(sortedObjects)
  }

  function favourite(id) {
    const editFavourite = object.filter(field => { return field.id === id})

    const newArray = [...arrayFile, editFavourite[0]]
    setArrayFile(newArray)
  }

  function displayFavourite() {
    setObject(arrayFile)
    setIsActive(current => !current)
  }

  function handleClickSpanish() {
    setLanguage('spanishDefinitions')
    changeStartState()
    setIsActiveES(current => !current)
    setIsActive(false)
    setIsActiveDE(false)
    setIsActiveFR(false)
    setObject([])
  }

  function handleClickFrench() {
    setLanguage('frenchDefinitions')
    changeStartState()
    setIsActiveFR(current => !current)
    setIsActive(false)
    setIsActiveDE(false)
    setIsActiveES(false)
    setObject([])
  }

  function handleClickGerman() {
    setLanguage('germanDefinitions')
    changeStartState()
    setIsActiveDE(current => !current)
    setIsActive(false)
    setIsActiveFR(false)
    setIsActiveES(false)
    setObject([])
  }

  function handleClickEnglish() {
    setLanguage('englishDefinitions')
    changeStartState()
    setIsActive(current => !current)
    setIsActiveES(false)
    setIsActiveFR(false)
    setIsActiveDE(false)
    setObject([])
  }

  const changeStartState = event => {
    if (isStartPageVisible){
      setIsStartPageVisible(current => !current);
    }  
  };
  
  return (
    <div className="App">
      <div className="start-page" style={{ visibility: isStartPageVisible ? 'visible' : 'hidden' }}>
        <StartPage changeSpanish={handleClickSpanish} changeEnglish={handleClickEnglish} changeGerman={handleClickGerman} changeFrench={handleClickFrench}></StartPage>
      </div>

      <div className="main-container">
        <div className="languages">
          <Header isActive={isActive} isActiveES={isActiveES} isActiveFR={isActiveFR} isActiveDE={isActiveDE} handleSpanish={handleClickSpanish} handleFrench={handleClickFrench} handleGerman={handleClickGerman} handleEnglish={handleClickEnglish}></Header>
        </div>

        <div className="search-bar"> 
          <FilterBar foreignClick={handleTranslation} language={language} handleClick={handleClick} handleTranslate={handleTranslateSearch} handleChange={handleChange} handleSort={sortByWeek} displayFave={displayFavourite}></FilterBar>
        </div>
      </div>

      <div className="form-container" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
        <Input visibility={handleVisibility} handleNewObject={handleNewObject} language={language}></Input>
      </div>

      <div className="form-container" style={{ visibility: isEditVisible ? 'visible' : 'hidden' }}>
        <Input visibility={handleVisibilityEdit} handleNewObject={handleEdit} language={language}></Input>
      </div>

      <div className="main-container">
        <button className="addNewButton" onClick={handleVisibility}>Add New Resource</button>
        <ObjectList object={object} handleFavourite={favourite} handleDelete={handleDelete} handleEdit={handleObjectState}></ObjectList>
      </div>

    </div>
  );

  }
export default App;

/* <div className="form-container" style={{ visibility: isForeignVisible ? 'visible' : 'hidden' }}>
        <Input visibility={handleVisibilityForeign} handleNewObject={handleNewObject}></Input>
      </div> */

// <ObjectList object={object} handleDelete={handleDelete} handleEdit={handleEdit} handleVisibility={handleVisibilityEdit}></ObjectList>