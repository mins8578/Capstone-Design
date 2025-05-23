package com.example.Capstone_Design.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "comment_like")
public class CommentLikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private CommentEntity comment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Setter
    public void setComment(CommentEntity comment) {
        this.comment = comment;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public void setCreatedAt(LocalDateTime now) {
        this.createdAt = now;
    }

    // Getter
    public CommentEntity getComment() {
        return comment;
    }

    public UserEntity getUser() {
        return user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}