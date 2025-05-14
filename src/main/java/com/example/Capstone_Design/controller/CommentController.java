package com.example.Capstone_Design.controller;

import com.example.Capstone_Design.dto.CommentDTO;
import com.example.Capstone_Design.entity.BoardEntity;
import com.example.Capstone_Design.entity.CommentEntity;
import com.example.Capstone_Design.entity.UserEntity;
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
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    // ✅ 댓글 목록 (DTO로 변환)
    @GetMapping("/board/{boardId}")
    public ResponseEntity<?> getComments(@PathVariable Long boardId) {
        List<CommentDTO> result = commentRepository.findByBoardId(boardId).stream()
                .map(comment -> new CommentDTO(
                        comment.getId(),
                        comment.getContent(),
                        comment.getUser().getUserName(), // author로 전달
                        comment.getCreatedAt()
                ))
                .toList();

        return ResponseEntity.ok(result);
    }

    // ✅ 댓글 작성
    @PostMapping("/board/{boardId}")
    public ResponseEntity<?> createComment(@PathVariable Long boardId,
                                           @RequestBody CommentEntity comment,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        BoardEntity board = boardRepository.findById(boardId).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();

        comment.setBoard(board);
        comment.setUser(user);
        comment.setCreatedAt(LocalDateTime.now());

        CommentEntity saved = commentRepository.save(comment);
        CommentDTO result = new CommentDTO(saved.getId(), saved.getContent(), user.getUserName(), saved.getCreatedAt());

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // ✅ 댓글 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable Long id,
                                           @RequestBody CommentEntity updated,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        CommentEntity comment = commentRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();

        if (!comment.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 수정할 수 있습니다.");
        }

        comment.setContent(updated.getContent());
        CommentEntity saved = commentRepository.save(comment);
        CommentDTO result = new CommentDTO(saved.getId(), saved.getContent(), user.getUserName(), saved.getCreatedAt());

        return ResponseEntity.ok(result);
    }

    // ✅ 댓글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        CommentEntity comment = commentRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();

        if (!comment.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 삭제할 수 있습니다.");
        }

        commentRepository.delete(comment);
        return ResponseEntity.ok("삭제 완료");
    }
}