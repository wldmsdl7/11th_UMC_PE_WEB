import { useTodo } from '../context/TodoContext';

interface FormInputProps {
    input: string;
    setInput: (input: string) => void;
}

const TodoFormInput = ({
    input,
    setInput,
}: FormInputProps) => {

  const {addTodo} = useTodo();

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 버튼없이 Enter 키로만 할 일을 입력 받음
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = input.trim();
        if(text){
            console.log(text);
            addTodo(text);
            setInput('');
        }
    }
 }
  
  return (
    <input 
        type ="text" 
        id="todo-input" 
        className="todo-container__input" 
        value = {input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={handleEnterKey} 
        placeholder="할 일을 입력하고 Enter" 
        required 
    />
  )
}

export default TodoFormInput
