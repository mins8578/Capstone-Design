package com.example.Capstone_Design.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "board_like", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"board_id", "user_id"})
})
public class BoardLikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    private BoardEntity board;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // ✅ 기본 생성자 (JPA 필수)
    public BoardLikeEntity() {}

    // ✅ 게시글 & 사용자만으로 생성 (createdAt은 자동 설정됨)
    public BoardLikeEntity(BoardEntity board, UserEntity user) {
        this.board = board;
        this.user = user;
    }

    // ✅ 게시글 & 사용자 & 시간까지 지정하는 생성자 (필요 시 사용 가능)
    public BoardLikeEntity(BoardEntity board, UserEntity user, LocalDateTime createdAt) {
        this.board = board;
        this.user = user;
        this.createdAt = createdAt;
    }

    // ✅ 저장 직전 자동 시간 설정
    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        }
    }

    // ✅ Getter
    public Long getId() {
        return id;
    }

    public BoardEntity getBoard() {
        return board;
    }

    public UserEntity getUser() {
        return user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // ✅ Setter (createdAt은 보통 setter 없이도 충분함)
    public void setBoard(BoardEntity board) {
        this.board = board;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}