import React, { useState,useEffect } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
 const [filteredTodos, setFilteredTodos] = useState([]);

 useEffect(()=>{
   getLocalTodos();
 },[])
  
  useEffect(()=>{
    saveLocal()
   filterHandler()
  }, [todos,status])

  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed===true))
        break;
        case 'uncompleted':
          setFilteredTodos(todos.filter((todo) => todo.completed===false))
          break;
          default:
            setFilteredTodos(todos);
            break;
    }
  }
  const saveLocal =()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos")===null){
      localStorage.setItem("todos",JSON.stringify([]));
    }else {
      let localSaved = JSON.parse(localStorage.getItem("todos"));
      setTodos(localSaved);
    }
  }
  
  return (
    <div className="App">
      <header>
        <h1>hari's Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
        
      />
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
