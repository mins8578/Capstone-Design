package com.example.Capstone_Design.controller;

import com.example.Capstone_Design.entity.Post;
import com.example.Capstone_Design.entity.UserEntity;
import com.example.Capstone_Design.repository.PostRepository;
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
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setViewCount(post.getViewCount() + 1);
        return postRepository.save(post);
    }

    @PostMapping
    public Post createPost(@RequestBody Post post, @AuthenticationPrincipal UserDetails userDetails) {
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        post.setUser(user);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post updatedPost, @AuthenticationPrincipal UserDetails userDetails) {
        Post post = postRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        if (!post.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 수정할 수 있습니다.");
        }
        post.setTitle(updatedPost.getTitle());
        post.setContent(updatedPost.getContent());
        post.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(postRepository.save(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Post post = postRepository.findById(id).orElseThrow();
        UserEntity user = userRepository.findByUserID(userDetails.getUsername()).orElseThrow();
        if (!post.getUser().getUserID().equals(user.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 삭제할 수 있습니다.");
        }
        postRepository.delete(post);
        return ResponseEntity.ok("삭제 완료");
    }
}