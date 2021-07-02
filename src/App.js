import { useEffect, useState } from "react";
import "./App.scss";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love u" },
    { id: 2, title: "qhuy thui" },
    { id: 3, title: "Ht map" },
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestURL =
          "http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
        const response = await fetch(requestURL);
        const responseJSON = await response.json();

        const { data } = responseJSON;

        setPostList(data);
      } catch (error) {
        console.log('Failed to fetch post list', error.message)
      }
    }
    fetchData()
  });

  function handleRemoveTodo(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>Welcome to my To do List</h1>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleRemoveTodo} />

      <PostList posts={postList} />
    </div>
  );
}

export default App;
