package com.example.Capstone_Design.controller;

import com.example.Capstone_Design.entity.EmailAuth;
import com.example.Capstone_Design.entity.UserEntity;
import com.example.Capstone_Design.repository.EmailAuthRepository;
import com.example.Capstone_Design.repository.UserRepository;
import com.example.Capstone_Design.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FindPasswordController {

    private final UserRepository userRepository;
    private final EmailAuthRepository emailAuthRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    /**
     * 비밀번호 재설정용 인증코드 이메일 전송
     */
    @PostMapping("/find-send-code")
    public ResponseEntity<Map<String, Object>> sendResetCode(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String email = request.get("email");

        Optional<UserEntity> userOpt = userRepository.findById(email);
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "가입되지 않은 이메일입니다.");
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
        response.put("message", "인증코드를 이메일로 보냈습니다.");
        return ResponseEntity.ok(response);
    }

    /**
     * 이메일로 받은 인증코드 검증
     */
    @PostMapping("/password-verify-code")
    public ResponseEntity<Map<String, Object>> verifyCode(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String email = request.get("email");
        String code = request.get("code");

        List<EmailAuth> authList = emailAuthRepository.findAllByEmailOrderByCreatedAtDesc(email);
        if (authList.isEmpty()) {
            response.put("success", false);
            response.put("message", "이메일 정보가 없습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        EmailAuth auth = authList.get(0);
        if (auth.isVerified()) {
            response.put("success", false);
            response.put("message", "이미 인증이 완료된 이메일입니다.");
            return ResponseEntity.badRequest().body(response);
        }

        if (!auth.getCode().equals(code)) {
            response.put("success", false);
            response.put("message", "인증코드가 일치하지 않습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        auth.setVerified(true);
        emailAuthRepository.save(auth);

        response.put("success", true);
        response.put("message", "인증이 완료되었습니다.");
        return ResponseEntity.ok(response);
    }

    /**
     * 인증 후 새로운 비밀번호 설정
     */
    @PostMapping("/reset")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        String confirmPassword = request.get("confirmPassword");

        // 비밀번호 일치 확인
        if (newPassword == null || confirmPassword == null || !newPassword.equals(confirmPassword)) {
            response.put("success", false);
            response.put("message", "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        // 인증 여부 확인
        List<EmailAuth> authList = emailAuthRepository.findAllByEmailOrderByCreatedAtDesc(email);
        if (authList.isEmpty() || !authList.get(0).isVerified()) {
            response.put("success", false);
            response.put("message", "이메일 인증이 완료되지 않았습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        // 비밀번호 변경
        Optional<UserEntity> userOpt = userRepository.findById(email);
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "가입된 사용자 정보를 찾을 수 없습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        UserEntity user = userOpt.get();
        String encryptedPwd = passwordEncoder.encode(newPassword);
        user.setPwd(encryptedPwd);
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "비밀번호가 성공적으로 변경되었습니다.");
        return ResponseEntity.ok(response);
    }
}