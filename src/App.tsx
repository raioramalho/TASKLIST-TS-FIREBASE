import './styles/App.css'
import Container from './components/Container'
import { useEffect, useState } from 'react'
import { Item } from './types/Item'
import Header from './components/Header'
import Content from './components/Content'
import Tarefa from './components/Tarefa'
import Create from './components/Create'
import api from './services/api'
import { addDoc, collection, getDocs, getFirestore, setDoc, deleteDoc, updateDoc, doc, where } from 'firebase/firestore'


function App() {
  const db = getFirestore(api)
  const dataCollectionRef = collection(db, 'tasks')

  const [lista, setLista] = useState<Item[]>([])
  //[{ id: 0, tarefa: 'Feito com Vite+TypeScript+Firebase', done: true },])


  async function createTask(newTask: Item) {
    const task = await addDoc(dataCollectionRef, newTask)
    console.log(newTask)
  }

  async function changeTask(selectedTask: Item) {
    const docRef = doc(dataCollectionRef, selectedTask.id.toString())
    const setTask = await updateDoc(docRef, selectedTask)
    console.log(setTask)
  }

  async function deleteTask(id: string) {
    const docRef = doc(dataCollectionRef, id.toString())
    const delTask = await deleteDoc(docRef)
    console.log(delTask)
  }

  useEffect(() =>{
    const getData = async () => {
      const data = await getDocs(dataCollectionRef)
      setLista(data.docs.map((doc: any) => ({...doc.data(), id: doc.id})))
    }
    getData()
  }, [lista])

  const handleAddTask = (taskName: string) =>{
    let newList = [...lista]
    let newTask = {
      id: lista.length + 1,
      done: false,
      tarefa: taskName
    }
    newList.push(newTask)
    setLista(newList)
    createTask(newTask)
  }

  const handleChangeTask = (id: string, done: boolean) => {
    let newList = [...lista]
    for (let i in newList){
      if(newList[i].id === id){
        newList[i].done = done
        changeTask(newList[i])
      }
    }
    setLista(newList)

  }

  const handleDeleteTask = (id: string) =>{
    setLista((prevState) => prevState.filter((where) => where.id !== id))
    deleteTask(id)
    //console.log(id)
  }

  return (
    <div className="App">
      <Container>
        <Header />
        <Create onEnter={handleAddTask}/>
        <Content>
          {lista.map((item, index) => (

            <Tarefa
              key={item.id}
              item={item}
              onChange={handleChangeTask}
              onClick={handleDeleteTask}
            />

            ))}
        </Content>
      </Container>
    </div>
  )
}

export default App
