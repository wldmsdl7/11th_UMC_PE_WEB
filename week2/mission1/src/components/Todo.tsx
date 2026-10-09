import { useTodo } from "../context/TodoContext";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
   const {todos, doneTodos} = useTodo();
 
  return (
    <div className='todo-container'>
      <h1 className='todo-container__header'>Todo List</h1>
      <TodoForm />
      <div className='render-container__section'>
        <h2 className='render-container__title'>해야 할 일</h2>
        <TodoList id="todo-list" todos={todos}/>
      </div>
      <div className='render-container__section'>
        <h2 className='render-container__title'>해낸 일</h2>
        <TodoList id="done-list" todos={doneTodos} />
      </div>
    </div>
  )
}

export default Todo
