package com.example.Capstone_Design.dto;

import java.time.LocalDateTime;

public class CommentDTO {
    private Long id;
    private String content;
    private String author;
<<<<<<< HEAD
    private String authorId;    // 작성자 ID (userID) ← 새로 추가됨
    private LocalDateTime createdAt;

    public CommentDTO(Long id, String content, String author, String authorId, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.authorId = authorId;
=======
    private LocalDateTime createdAt;

    public CommentDTO(Long id, String content, String author, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.author = author;
>>>>>>> 1a5d5f2ffe2cdae9e10275d1c02c7aa8f3c4aa7d
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

<<<<<<< HEAD
    public String getAuthorId() {
        return authorId;
    }

=======
>>>>>>> 1a5d5f2ffe2cdae9e10275d1c02c7aa8f3c4aa7d
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}