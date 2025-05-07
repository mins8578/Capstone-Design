package com.example.Capstone_Design.controller;

import com.example.Capstone_Design.entity.BoardEntity;
import com.example.Capstone_Design.entity.UserEntity;
import com.example.Capstone_Design.repository.BoardRepository;
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
@RequestMapping("/api/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BoardController {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<BoardEntity> getAllBoards() {
        return boardRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBoard(@PathVariable Long id) {
        BoardEntity board = boardRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(board);
    }

    @PostMapping
    public ResponseEntity<?> createBoard(@RequestBody BoardEntity board, @AuthenticationPrincipal UserDetails userDetails) {
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        board.setUser(user);
        board.setLikeCount(0);
        board.setCreatedAt(LocalDateTime.now());
        board.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(boardRepository.save(board));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBoard(@PathVariable Long id, @RequestBody BoardEntity updatedBoard, @AuthenticationPrincipal UserDetails userDetails) {
        BoardEntity board = boardRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        if (!board.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 수정할 수 있습니다.");
        }
        board.setContent(updatedBoard.getContent());
        board.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(boardRepository.save(board));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        BoardEntity board = boardRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        if (!board.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 삭제할 수 있습니다.");
        }
        boardRepository.delete(board);
        return ResponseEntity.ok("삭제 완료");
    }
}
