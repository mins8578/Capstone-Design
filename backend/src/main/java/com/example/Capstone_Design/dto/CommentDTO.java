package com.example.Capstone_Design.dto;

import java.time.LocalDateTime;

public class CommentDTO {
    private Long id;
    private String content;
    private String author;
    private String authorId;    // 작성자 ID (userID)
    private LocalDateTime createdAt;

    // 생성자
    public CommentDTO(Long id, String content, String author, String authorId, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.authorId = authorId;
        this.createdAt = createdAt;
    }

    // Getter
    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getAuthor() {
        return author;
    }

    public String getAuthorId() {
        return authorId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}