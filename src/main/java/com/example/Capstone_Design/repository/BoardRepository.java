package com.example.Capstone_Design.repository;

import com.example.Capstone_Design.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    // 게시글 ID와 사용자 ID로 게시글 존재 여부 확인 (작성자 본인인지 확인용)
    boolean existsByIdAndUser_UserID(Long boardId, String userID);
}

// 📁 src/main/java/com/example/community/repository/CommentRepository.java
