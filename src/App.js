import React from 'react';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';
 
class App extends React.Component {
    constructor(props) {
        super(props);
        this.id = 2;
        this.state = {
            input: "",
            todos: [
                { id: 0, content: '리액트를 공부하자0', isComplete: false },
                { id: 1, content: '리액트를 공부하자1', isComplete: true }
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
 
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
 
    handleCreate() {
        const { input, todos } = this.state;
        if (input === "") {
            alert("오늘 할 일을 입력해주세요!");
            return;
        }
        this.setState({
            input: "",
            todos: todos.concat({
                id: this.id++,
                content: input,
                isComplete: false
            })
        });
    }
 
    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.handleCreate();
        }
    }
 
    render() {
        return (
            <TodoListTemplate form={(
                <Form
                    value={this.state.input}
                    onChange={this.handleChange}
                    onCreate={this.handleCreate}
                    onKeyPress={this.handleKeyPress} />
            )}>
                <TodoItemList todos={this.state.todos} />
            </TodoListTemplate>
        );
    }
}
 
export default App;