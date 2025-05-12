package com.example.Capstone_Design.controller;

import com.example.Capstone_Design.dto.UserDTO;
import com.example.Capstone_Design.entity.EmailAuth;
import com.example.Capstone_Design.repository.EmailAuthRepository;
import com.example.Capstone_Design.service.MailService;
import com.example.Capstone_Design.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.beans.Transient;
import java.time.LocalDateTime;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final MailService mailService;
    private final EmailAuthRepository emailAuthRepository; // ✅ 인증 DB 접근용



    // 회원가입 페이지 출력 요청 - GetMapping으로 출력 요청 -> PostMapping에서 form에 대한 action 수행
//    @GetMapping("/save")
//    public String saveForm() {
//        return "save";
//    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        System.out.println("✅ 받은 비밀번호: " + userDTO.getPwd());
        String email = userDTO.getUserID();  // 아이디 = 이메일

        if (userDTO.getPwd() == null || !userDTO.getPwd().equals(userDTO.getPasswordCheck())) {
            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
        }

        if (userService.existsByUserID(userDTO.getUserID())) {
            return ResponseEntity.badRequest().body("이미 가입된 이메일입니다.");
        }

        //Optional<EmailAuth> emailAuthOptional = emailAuthRepository.findByEmail(email);
        List<EmailAuth> authList = emailAuthRepository.findAllByEmailOrderByCreatedAtDesc(userDTO.getUserID());
        if (authList.isEmpty() || !authList.get(0).isVerified()) {
            return ResponseEntity.badRequest().body("이메일 인증이 완료되지 않았습니다.");
        }

        userService.save(userDTO);
        return ResponseEntity.ok("회원가입 성공");
    }


    @PostMapping("/send-code")
    public ResponseEntity<Map<String, Object>> sendEmailCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        Map<String, Object> response = new HashMap<>();

        if (userService.existsByUserID(email)) {
            response.put("success", false);
            response.put("message", "이미 가입된 이메일입니다.");
            return ResponseEntity.badRequest().body(response);
        }

        String code = UUID.randomUUID().toString().substring(0, 6);
        mailService.sendVerificationEmail(email, code);

        EmailAuth auth = EmailAuth.builder()
                .email(email)
                .code(code)
                .createdAt(LocalDateTime.now())
                .verified(false)
                .build();
        emailAuthRepository.save(auth);
        response.put("success", true);
        response.put("message", "인증 메일이 발송되었습니다.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<Map<String, Object>> verifyEmailCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        Map<String, Object> response = new HashMap<>();

        List<EmailAuth> authList = emailAuthRepository.findAllByEmailOrderByCreatedAtDesc(email);
        if (authList.isEmpty()) {
            response.put("verified", false);
            response.put("message", "이메일 정보가 없습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        EmailAuth auth = authList.get(0);
        if (auth.isVerified()) {
            response.put("verified", false);
            response.put("message", "이미 인증된 사용자입니다.");
            return ResponseEntity.badRequest().body(response);
        }

        if (!auth.getCode().equals(code)) {
            response.put("verified", false);
            response.put("message", "인증 코드가 일치하지 않습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        auth.setVerified(true);
        emailAuthRepository.save(auth);

        response.put("verified", true);
        response.put("message", "이메일 인증이 완료되었습니다!");
        return ResponseEntity.ok(response);
    }

}


