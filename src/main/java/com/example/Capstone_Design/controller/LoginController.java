package com.example.Capstone_Design.controller;

import com.example.Capstone_Design.dto.LoginDTO;
import com.example.Capstone_Design.entity.UserEntity;
import com.example.Capstone_Design.service.UserService;
import com.example.Capstone_Design.token.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;



@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            UserEntity user = userService.login(loginDTO.getUserID(), loginDTO.getPwd());
            String token = jwtProvider.createToken(user.getUserID());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getUserName());

            //return ResponseEntity.ok(Collections.singletonMap("token", token));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}