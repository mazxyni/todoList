package com.example.todolist.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table                  // Todo 엔티티에 해당하는 테이블을 생성하거나 매핑

public class Todo implements Serializable {

    // 클래스의 직렬화 버전 관리. 객체 직렬화/역직렬화 시 버전 관리에 사용
    private static final long serialVersionUID = 1L;

    @Id     // 기본키
    @Column // 테이블의 컬럼에 매핑
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Column(name="createdDateTime")
    private LocalDateTime createdDateTime;

    @Column(name="isComplete", columnDefinition = "TINYINT(1)")
    private Boolean isComplete;

    // Builder 패턴을 사용하여 객체를 생성하는 생성자
    @Builder
    public Todo(Long id, String content, LocalDateTime createdDateTime, Boolean isComplete) {
        this.id = id;
        this.content = content;
        this.createdDateTime = createdDateTime;
        this.isComplete = isComplete;
    }

    // 객체를 문자열로 변환할 때 출력할 형식 정의
    @Override
    public String toString() {
        return "Todo [id = " + id + ", content = " + content + ", createdDateTime = " + createdDateTime +
                ", isComplete = " + isComplete + "]";
    }
}
