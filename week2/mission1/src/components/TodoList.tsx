import TodoListBtn from './TodoListBtn';
import { useTodo } from '../context/TodoContext';
import type { TTodo } from '../types/todo';

interface TodoListProps {
    id: string,
    todos: TTodo[]
}

const TodoList = ({
    id,
    todos
}: TodoListProps) => {
  const { completeTodo, deleteTodoFromDone, deleteTodoFromTodos} = useTodo();
     
  return (
    <ul id={id} className="render-container__list">
        {todos.map((todo)=>(
            <li key={Math.random()} className="render-container__item">
                <p>{todo.text}</p>
                <div className="render-container__item-buttons">
                    {/**
                     * 완료 버튼 type : complete
                     * 삭제 버튼 type: delete
                     */}
                    {id==='todo-list' 
                        ? <TodoListBtn 
                            todo={todo} 
                            type = "complete" 
                            onClick={completeTodo} 
                        /> : null
                    }
                    <TodoListBtn
                        todo={todo}
                        type="delete"
                        onClick={id === 'todo-list' ? deleteTodoFromTodos : deleteTodoFromDone}
                    />
                </div>
            </li>
        ))}
    </ul>
  )
}

export default TodoList
