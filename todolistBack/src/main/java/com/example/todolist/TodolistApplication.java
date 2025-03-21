package com.example.todolist;

import com.example.todolist.domain.Todo;
import com.example.todolist.repository.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.stream.IntStream;

@SpringBootApplication
public class TodolistApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodolistApplication.class, args);

	}
// 서버 테스트 데이터 생성 코드
//	@Bean
//	public CommandLineRunner runner(TodoRepository todoRepository) throws Exception {
//		return (args) -> {
//			IntStream.rangeClosed(1, 5).forEach(index -> todoRepository.save(Todo.builder()
//					.content("오늘 할 일" + index)
//					.createdDateTime(LocalDateTime.now())
//					.isComplete(false)
//					.build())
//			);
//		};
//	}
}
