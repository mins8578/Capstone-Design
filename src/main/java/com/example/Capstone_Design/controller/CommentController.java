package com.example.Capstone_Design.controller;

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

    @GetMapping("/board/{boardId}")
    public List<CommentEntity> getComments(@PathVariable Long boardId) {
        return commentRepository.findByBoardId(boardId);
    }

    @PostMapping("/board/{boardId}")
    public CommentEntity createComment(@PathVariable Long boardId, @RequestBody CommentEntity comment, @AuthenticationPrincipal UserDetails userDetails) {
        BoardEntity board = boardRepository.findById(boardId).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        comment.setBoard(board);
        comment.setUser(user);
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable Long id, @RequestBody CommentEntity updated, @AuthenticationPrincipal UserDetails userDetails) {
        CommentEntity comment = commentRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        if (!comment.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 수정할 수 있습니다.");
        }
        comment.setContent(updated.getContent());
        return ResponseEntity.ok(commentRepository.save(comment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        CommentEntity comment = commentRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        if (!comment.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 삭제할 수 있습니다.");
        }
        commentRepository.delete(comment);
        return ResponseEntity.ok("삭제 완료");
    }
}



