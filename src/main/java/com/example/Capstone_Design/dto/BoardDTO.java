package com.example.Capstone_Design.dto;

import java.time.LocalDateTime;

public class BoardDTO {

    private Long id;
    private String title;
    private String content;
    private int likeCount;
    private int commentCount;
    private String author;    // 작성자 이름 (userName)
    private String authorId;  // 작성자 ID (userID)
    private LocalDateTime createdAt;

    // 생성자
    public BoardDTO(Long id, String title, String content, int likeCount, int commentCount,
                    String author, String authorId, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.author = author;
        this.authorId = authorId;
        this.createdAt = createdAt;
    }

    // Getter
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public int getLikeCount() { return likeCount; }
    public int getCommentCount() { return commentCount; }
    public String getAuthor() { return author; }
    public String getAuthorId() { return authorId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
