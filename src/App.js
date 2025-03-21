import React from 'react';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';
 
class App extends React.Component {
    constructor(props) {
        super(props);

        // this.id=0;
        // this.state = {
        //     // ***Form.js에서 Hook(useState) 사용으로 인해 제거
        //     // input: "",
        //     todos: [

        //     ]
        // }

        this.state = {
            input : "",
            todos : [

            ]
        }

        // this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleInitInfo = this.handleInitInfo.bind(this);
        }

    componentDidMount() {
        fetch("api/todos")
        .then(res => res.json())
        .then(todos => this.setState({todos:todos}))
        .catch(err => console.log(err))
    }

    handleInitInfo(){
        fetch("/api/todos")
        .then(res => res.json())
        .then(todos => this.setState({todos:todos}))
        .catch(err => console.log(err))
    }
 
    // *** Form.js 에서 Hook(useState) 사용으로 인해 제거
    //input값 변경
    // handleChange(event) {
    //     this.setState({
    //         input: event.target.value
    //     });
    // }
 
    // ***Form.js에서 Hook(useState) 사용으로 인해 state에서 input을 제외하고 parameter로 받음
    // 등록
    handleCreate(inputValue) {
        const { todos } = this.state;
        if (inputValue === "") {
            alert("오늘 할 일을 입력해주세요!");
            return;
        }

        // 화면에서 먼저 변경사항을 보여주는 방법으로 이용
        this.setState({
            // input: "",
            // concat을 사용하여 배열에 추가
            todos:todos.concat({
                id: 0,                  // 임의의 id를 부여하여 key error 방지
                content: inputValue,
                isComplete: false
            })
        });

        // 처리
        const data = {
            body: JSON.stringify({"content":inputValue}),
            headers: {'Content-Type':'application/json'},
            method:'post'
        }
        fetch("/api/todos", data)
        .then (res => {
            if(!res.ok) {
                throw new Error(res.status);
            } else {
                return this.handleInitInfo();
            }
        })
        .catch(err => console.log(err));
    }

    // *** Form.js 에서 Hook(useState) 사용으로 인해 제거
    // Enter Key 이벤트
    // handleKeyPress(event) {
    //     if (event.key === "Enter") {
    //         this.handleCreate();
    //     }
    // }

    handleToggle(id) {
        const {todos} = this.state;

        // todos 배열에서 id가 일치하는 요소를 찾아 해당 할 일의 완료 여부(isComplete)를 가져옴
        const isComplete = todos.find(todo => todo.id === id).isComplete;
        if(!window.confirm(isComplete ? "미완료 처리 하시겠습니까?" : "완료 처리 하시겠습니까?")){
            return;
        }
        
        // 파라미터로 받은 id를 가지고 몇 번째 아이템인지 찾기
        const index = todos.findIndex(todo => todo.id ===id);

        // 선택한 객체 저장
        const selected = todos[index];

        // 배열 복사
        const nextTodos = [...todos];

        // 기존의 값을 복사하고 isComplete 값을 덮어 쓰기
        nextTodos[index] = {
            ...selected,
            isComplete : !selected.isComplete
        };

        this.setState({
            todos:nextTodos
        });

        const data = {
            headers:{'Content-Type':'application/json'},
            method:'put'
        }
        fetch("/api/todos/" + id, data).then(res => {
            if(!res.ok) {
                throw new Error(res.status);
            } else {
                return this.handleInitInfo();
            }
        }).catch(err => console.log(err));
    }

    // 삭제
    handleRemove(id) {
        const {todos} = this.state;

        const removeContent = todos.find(todo => todo.id === id).content;
        if(!window.confirm("'" + removeContent + "'을 삭제하시겠습니까?")) {
            return;
        }

        this.setState({
            todos:todos.filter(todo => todo.id !== id)
        });

        const data = {
            headers: {'Content-Type':'application/json'},
            method:'delete'
        }
        fetch("api/todos/" + id, data).then(res => {
            if(!res.ok) {
                throw new Error(res.status);
            } else {
                return this.handleInitInfo();
            }
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <TodoListTemplate form={(
                <Form
                    // *** Form.js 에서 Hook(useState) 사용으로 인해 제거
                    // value={this.state.input}
                    // onChange={this.handleChange}
                    // onCreate={this.handleCreate}
                    // onKeyPress={this.handleKeyPress} 
                    onCreate = {this.handleCreate}
                />
            )}>
                <TodoItemList 
                    todos = {this.state.todos} 
                    onToggle = {this.handleToggle}
                    onRemove = {this.handleRemove}
                />
            </TodoListTemplate>
        );
    }
}
 
export default App;