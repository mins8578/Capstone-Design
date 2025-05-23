package com.example.Capstone_Design.repository;

import com.example.Capstone_Design.entity.BoardEntity;
import com.example.Capstone_Design.entity.BoardLikeEntity;
import com.example.Capstone_Design.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardLikeRepository extends JpaRepository<BoardLikeEntity, Long> {

    // 게시글과 사용자 조합으로 좋아요 여부 확인
    boolean existsByBoardAndUser(BoardEntity board, UserEntity user);

    // 좋아요 취소 시 사용
    void deleteByBoardAndUser(BoardEntity board, UserEntity user);
}