import { Children, createContext, useContext, useState, type PropsWithChildren } from "react";
import type { TTodo } from "../types/todo";

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodoFromTodos: (todo: TTodo) => void;
    deleteTodoFromDone: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined> (undefined);
export const TodoProvider = ({children} : PropsWithChildren) => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState <TTodo[]>([]);
    
    const addTodo = (text: string) => {
        const newTodo: TTodo= { id: Math.random(), text, isDone: false};
        setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
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
        <TodoContext.Provider value={{todos, doneTodos, addTodo, completeTodo, deleteTodoFromTodos, deleteTodoFromDone }}>{children}</TodoContext.Provider>);

 };

 export const useTodo = () => {
    const context = useContext(TodoContext);
    
    if(!context){
        throw new Error("useTodo를 사용하기 위해서는 Provider로 감싸야 합니다. ");
        
    }

    return context;
 }