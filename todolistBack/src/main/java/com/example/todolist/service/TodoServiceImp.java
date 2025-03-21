package com.example.todolist.service;

import com.example.todolist.domain.Todo;
import com.example.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
public class TodoServiceImp implements TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<Todo> getTodos(Sort sort) throws Exception {
        return todoRepository.findAll(sort);
    }

    @Override
    public void postTodo(Todo todo) throws Exception {
        todoRepository.save(todo);
    }

    @Override
    public void deleteTodo(Long id) throws Exception {
        todoRepository.deleteById(id);
    }

    @Override
    public Todo findTodoById(Long id) throws Exception {
        return todoRepository.findById(id).orElse(new Todo());
    }
}
