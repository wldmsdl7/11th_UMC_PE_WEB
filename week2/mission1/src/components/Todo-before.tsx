import { useState } from "react";
import type { TTodo } from "../types/todo";

const Todo =  () => {
 const [todos, setTodos] = useState<TTodo[]>([]);
 const [doneTodos, setDoneTodos] = useState <TTodo[]>([]);
 const [input, setInput] = useState <string>('');

 const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 버튼없이 Enter 키로만 할 일을 입력 받음
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = input.trim();
        if(text){
            console.log(text);
            const newTodo : TTodo = {
                id: Date.now(),
                text: text,
                isDone: false,
            }
            setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
            // 엔터치고 값 비워주기
            setInput('');
        }
    }
 }

 const completeTodo = (todo: TTodo) => {
    setTodos (prevTodos => prevTodos.filter((t): Boolean => t.id !==todo.id));
    setDoneTodos(prevDoneTodos => [...prevDoneTodos, todo]);
    
 }

 const deleteTodoFromTodos = (todo: TTodo) => {
    setTodos (prevTodos => prevTodos.filter((t): Boolean => t.id != todo.id));
 }

 const deleteTodoFromDone = (done: TTodo) => {
   setDoneTodos (prevDoneTodos => prevDoneTodos.filter((t): Boolean => t.id != done.id));
 }
 
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">Todo List</h1>
      <form id="todo-form" >
        <label htmlFor = "todo-input" className="sr-only">할 일 입력</label>
        <input type ="text" id="todo-input" className="todo-container__input" value = {input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleEnterKey} placeholder="할 일을 입력하고 Enter" required />
      </form>
      <div className="render-container__section">
        <h2 className="render-container__title">해야 할 일</h2>
        <ul id="todo-list" className="render-container__list">
            {todos.map((todo)=>(
                <li key={Math.random()} className="render-container__item">
                    <p>{todo.text}</p>
                    <div className="render-container__item-buttons">
                        <button className="render-container__item-button complete" onClick={(): void => completeTodo(todo)}>완료</button>
                        <button className="render-container__item-button delete" onClick={(): void => deleteTodoFromTodos(todo)}>삭제</button>
                    </div>
                </li>
            ))}
        </ul>
      </div>
      <div className="render-container__section">
        <h2 className="render-container__title">해낸 일</h2>
        <ul id="done-list" className="render-container__list">
            {doneTodos.map((doneTodo)=>(
                <li key={Math.random()} className="render-container__item">
                    <p className="render-container__item-text">{doneTodo.text}</p>
                    <div className="render-container__item-buttons">
                        <button className="render-container__item-button delete" onClick={(): void => deleteTodoFromDone(doneTodo)}>삭제</button>
                    </div>
                </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Todo
