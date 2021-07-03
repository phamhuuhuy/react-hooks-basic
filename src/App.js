import { useEffect, useState } from "react";
import querryString from 'query-string'
import "./App.scss";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFiltersForm from "./components/PostFiltersForm";
function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love u" },
    { id: 2, title: "qhuy thui" },
    { id: 3, title: "Ht map" },
  ]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  })

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like :'',
  })

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const paramsString = querryString.stringify(filters)
        const requestURL =
          `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestURL);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;

        setPostList(data);
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch post list', error.message)
      }
    }
    fetchData()
  }, [filters]);

  function handlePageChange(newPage){
    console.log(newPage)
    setFilters({
      ...filters,
      _page: newPage,
      
    })
  }

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

  function handleFiltersChange(newFilters){
    setFilters({
      ...filters,
      _page: 1,
      title_like : newFilters.searchTerm
    })
  }

  return (
    <div className="app">
      <h1>Welcome to my To do List</h1>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleRemoveTodo} />
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
