// 1. HTML 요소 선택
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일이 어떻게 생긴 아이인지 Type을 정의
type Todo = {
    id: number;
    text: string;
    isDone: boolean;
};

let todos : Todo[] = [];
let doneTasks : Todo[] = [];

// - 할 일 목록 렌더링 하는 함수 정의
const renderTask = () : void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo) : void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo) : void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    })
}

// 3. 할 일 텍스트 입력 처리 함수 (공백 자르기)
const getTodoText = () : string => {
    return todoInput.value.trim();
};

// 4. 할 일 추가 처리 함수
const addTodo = (text: string) : void => {
    todos.push({id: Date.now(), text, isDone: false});
    renderTask();
}

// 5. 할 일 상태 변경 (완료로 이동)
const completedTodo = (todo: Todo) : void => {
    todos = todos.filter((t) : boolean => t.id!==todo.id); // 내가 선택한 todo 제외하고 전체 렌더링
    doneTasks.push({...todo, isDone: true});
    renderTask();
};

// 6-1. 해야할 일 삭제 함수
const deleteTodoFromTodos = (todo: Todo): void => { 
    todos = todos.filter((t) : boolean => t.id !== todo.id); 
    renderTask(); 
};

// 6-2. 완료된 할 일 삭제 함수
const deleteTodoFromDone = (todo: Todo) : void => {
    doneTasks = doneTasks.filter((t) : boolean => t.id !==todo.id);
    renderTask();
}

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone =false): HTMLElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');

    const textP = document.createElement('p');
    textP.textContent = todo.text;
    li.appendChild(textP);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('render-container__item-buttons');
    if(!isDone){
        const completeButton = document.createElement('button');
        completeButton.classList.add('render-container__item-button', 'complete');
        completeButton.textContent = '완료';

        completeButton.addEventListener('click', (): void => {
            completedTodo(todo);
        });
        btnContainer.appendChild(completeButton);

    }
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('render-container__item-button', 'delete');
    deleteButton.textContent = '삭제';
    
    deleteButton.addEventListener('click', (): void => {
        if(todo.isDone){
            deleteTodoFromDone(todo);
        }else{
            deleteTodoFromTodos(todo);
        }
    });
    btnContainer.appendChild(deleteButton);

    li.appendChild(btnContainer)

    return li;
}
//8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event) : void => {
    event?.preventDefault();
    const text = getTodoText();
    if(text){
        addTodo(text);
        todoInput.value = '';
    }
});

renderTask();