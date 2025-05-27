package com.example.Capstone_Design.repository;

import com.example.Capstone_Design.entity.BoardLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardLikeRepository extends JpaRepository<BoardLikeEntity, Long> {

    boolean existsByBoard_IdAndUser_UserID(Long boardId, String userID); // ✅ 필드명 기반

    void deleteByBoard_IdAndUser_UserID(Long boardId, String userID);    // ✅ 필드명 기반

    Optional<BoardLikeEntity> findByBoard_IdAndUser_UserID(Long boardId, String userID); // ✅ 필드명 기반
}