package com.example.Capstone_Design.controller;

import com.example.Capstone_Design.dto.BoardDTO;
import com.example.Capstone_Design.entity.BoardEntity;
import com.example.Capstone_Design.entity.BoardLikeEntity;
import com.example.Capstone_Design.entity.UserEntity;
import com.example.Capstone_Design.repository.BoardLikeRepository;
import com.example.Capstone_Design.repository.BoardRepository;
import com.example.Capstone_Design.repository.CommentRepository;
import com.example.Capstone_Design.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BoardController {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final BoardLikeRepository boardLikeRepository;

    private static final ZoneId SEOUL_ZONE = ZoneId.of("Asia/Seoul");

    // ✅ 게시글 목록 조회
    @GetMapping
    public ResponseEntity<?> getAllBoards() {
        List<BoardDTO> result = boardRepository.findAll().stream().map(board -> {
            int commentCount = commentRepository.countByBoardId(board.getId());
            return new BoardDTO(
                    board.getId(),
                    board.getTitle(),
                    board.getContent(),
                    board.getLikeCount(),
                    commentCount,
                    board.getUser().getUserName(),
                    board.getUser().getUserID(),
                    board.getCreatedAt()
            );
        }).toList();

        return ResponseEntity.ok(result);
    }

    // ✅ 게시글 작성
    @PostMapping
    public ResponseEntity<?> createBoard(@RequestBody BoardEntity board,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        LocalDateTime now = LocalDateTime.now(SEOUL_ZONE);

        board.setUser(user);
        board.setLikeCount(0);
        board.setCreatedAt(now);
        board.setUpdatedAt(now);

        return ResponseEntity.ok(boardRepository.save(board));
    }

    // ✅ 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBoard(@PathVariable Long id,
                                         @RequestBody BoardEntity updatedBoard,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        BoardEntity board = boardRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();

        if (!board.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 수정할 수 있습니다.");
        }

        board.setTitle(updatedBoard.getTitle());
        board.setContent(updatedBoard.getContent());
        board.setUpdatedAt(LocalDateTime.now(SEOUL_ZONE));

        return ResponseEntity.ok(boardRepository.save(board));
    }

    // ✅ 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long id,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        BoardEntity board = boardRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();

        if (!board.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 삭제할 수 있습니다.");
        }

        boardRepository.delete(board);
        return ResponseEntity.ok("삭제 완료");
    }

    // ✅ 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getBoard(@PathVariable Long id) {
        BoardEntity board = boardRepository.findById(id).orElseThrow();

        BoardDTO dto = new BoardDTO(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getLikeCount(),
                commentRepository.countByBoardId(board.getId()),
                board.getUser().getUserName(),
                board.getUser().getUserID(),
                board.getCreatedAt()
        );

        return ResponseEntity.ok(dto);
    }

    // ✅ 게시글 좋아요 상태 확인
    @GetMapping("/{id}/like")
    public ResponseEntity<?> checkBoardLike(@PathVariable Long id,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        BoardEntity board = boardRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();

        boolean liked = boardLikeRepository.existsByBoardAndUser(board, user);
        return ResponseEntity.ok().body(
                java.util.Map.of("liked", liked)
        );
    }

    // ✅ 게시글 좋아요
    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeBoard(@PathVariable Long id,
                                       @AuthenticationPrincipal UserDetails userDetails) {
        BoardEntity board = boardRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();

        if (boardLikeRepository.existsByBoardAndUser(board, user)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 좋아요한 게시글입니다.");
        }

        // ✅ createdAt은 BoardLikeEntity의 @PrePersist로 자동 세팅됨
        BoardLikeEntity like = new BoardLikeEntity(board, user);
        boardLikeRepository.save(like);

        board.setLikeCount(board.getLikeCount() + 1);
        boardRepository.save(board);

        return ResponseEntity.ok("좋아요 성공");
    }

    // ✅ 게시글 좋아요 취소
    @DeleteMapping("/{id}/like")
    public ResponseEntity<?> unlikeBoard(@PathVariable Long id,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        BoardEntity board = boardRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();

        if (!boardLikeRepository.existsByBoardAndUser(board, user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("좋아요한 기록이 없습니다.");
        }

        boardLikeRepository.deleteByBoardAndUser(board, user);

        if (board.getLikeCount() > 0) {
            board.setLikeCount(board.getLikeCount() - 1);
            boardRepository.save(board);
        }

        return ResponseEntity.ok("좋아요 취소 완료");
    }
}