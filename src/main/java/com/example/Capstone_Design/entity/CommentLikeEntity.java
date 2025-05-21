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
        private CommentEntity comment;

    @ManyToOne
    private UserEntity user;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public void setComment(CommentEntity comment) {
        this.comment = comment;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    // 필요하면 getter도 추가
    public CommentEntity getComment() {
        return comment;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setCreatedAt(LocalDateTime now) {

    }
}
