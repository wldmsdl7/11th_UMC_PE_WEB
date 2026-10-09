import { useState } from 'react'
import TodoFormInput from './FormInput';


const TodoForm = () => {
  const [input, setInput] = useState <string>('');
  
  return (
    <form id="todo-form" >
        <label htmlFor = "todo-input" className="sr-only">할 일 입력</label>
        <TodoFormInput 
            input={input}
            setInput={setInput}
        />
    </form>
  )
}

export default TodoForm
