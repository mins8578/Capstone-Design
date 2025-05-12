package com.example.Capstone_Design.dto;

import java.time.LocalDateTime;

public class CommentDTO {
    private Long id;
    private String content;
    private String author;
    private LocalDateTime createdAt;

    public CommentDTO(Long id, String content, String author, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.author = author;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}