package com.example.todolist.controller;

import com.example.todolist.domain.Todo;
import com.example.todolist.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    // 목록 조회
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>getTodos() throws Exception {
        List<Todo> todos =todoService.getTodos(Sort.by(Sort.Direction.ASC, "id"));
        return ResponseEntity.ok(todos);
    }

    // 등록

}
