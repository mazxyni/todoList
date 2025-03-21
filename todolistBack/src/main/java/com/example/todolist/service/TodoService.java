package com.example.todolist.service;

import com.example.todolist.domain.Todo;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface TodoService {

    // Sort를 파라미터로 가지며, Sort를 통해 Todo 목록을 정렬하여 가져옴
    List<Todo> getTodos(Sort sort) throws Exception;

    // Todo를 추가 및 수정
    void postTodo(Todo todo) throws Exception;

    // Id에 해당하는 Todo 삭제
    void deleteTodo(Long Id) throws Exception;

    // Id에 해당하는 Todo 조회
    Todo findTodoById(Long id) throws Exception;

}
