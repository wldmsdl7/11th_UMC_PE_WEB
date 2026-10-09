import type { TTodo } from '../types/todo';

interface TodoListBtnProps {
    todo: TTodo,
    type: string,
    onClick: (todo: TTodo) => void;
}


const TodoListBtn = ({
    todo,
    type,
    onClick
}: TodoListBtnProps) => {
  return (
     <button 
        className={`render-container__item-button ${type}`}
        onClick={() => onClick(todo)} 
      > 
      { type === "complete" ? "완료" : "삭제"}
     </button>
  )
}

export default TodoListBtn;
