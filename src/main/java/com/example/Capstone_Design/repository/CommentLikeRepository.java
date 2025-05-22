package com.example.Capstone_Design.repository;

import com.example.Capstone_Design.entity.CommentEntity;
import com.example.Capstone_Design.entity.CommentLikeEntity;
import com.example.Capstone_Design.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLikeEntity, Long> {
    boolean existsByCommentAndUser(CommentEntity comment, UserEntity user);
    void deleteByCommentAndUser(CommentEntity comment, UserEntity user);
    long countByComment(CommentEntity comment);
}