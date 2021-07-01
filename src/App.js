import { useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([
    {id: 1, title: 'I love u'},
    {id: 2, title: 'qhuy thui'},
    {id: 3, title: 'Ht map'}
  ])
  
  function handleRemoveTodo(todo){
    const index = todoList.findIndex(x => x.id === todo.id)
    if(index < 0) return;

    const newTodoList = [...todoList]
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
  }

  function handleTodoFormSubmit(formValues){
    const newTodo = {
      id: todoList.length +1,
      ...formValues
    }
    const newTodoList = [...todoList]
    newTodoList.push(newTodo)
    setTodoList(newTodoList)
  }


  return (
    <div className="app">
      <h1>Welcome to my To do List</h1>
      <TodoForm onSubmit={handleTodoFormSubmit}  />
      <TodoList todos={todoList} onTodoClick={handleRemoveTodo} />
    </div>
  );
}


export default App;
