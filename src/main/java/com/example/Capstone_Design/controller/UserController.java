package com.example.Capstone_Design.controller;

import com.example.Capstone_Design.dto.UserDTO;
import com.example.Capstone_Design.entity.EmailAuth;
import com.example.Capstone_Design.repository.EmailAuthRepository;
import com.example.Capstone_Design.service.MailService;
import com.example.Capstone_Design.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.beans.Transient;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final MailService mailService;
    private final EmailAuthRepository emailAuthRepository; // ✅ 인증 DB 접근용



    // 회원가입 페이지 출력 요청 - GetMapping으로 출력 요청 -> PostMapping에서 form에 대한 action 수행
    @GetMapping("/save")
    public String saveForm() {
        return "save";
    }

    @PostMapping("/save")
    public String join(@ModelAttribute UserDTO userDTO, Model model) {
        if (!userDTO.getPwd().equals(userDTO.getPasswordCheck())) {
            model.addAttribute("error", "비밀번호가 일치하지 않습니다.");
            return "save";

        }

        // 아이디와 이메일을 동일하게 처리
        String email = userDTO.getUserID();  // 아이디 = 이메일

        //Optional<EmailAuth> emailAuthOptional = emailAuthRepository.findByEmail(email);
        List<EmailAuth> authList = emailAuthRepository.findAllByEmailOrderByCreatedAtDesc(email);


        if (authList.isEmpty() || !authList.get(0).isVerified()) {
            model.addAttribute("error", "이메일 인증이 완료되지 않았습니다.");
            return "email-confirm";  // 인증 페이지로 리다이렉트
        }

        // 랜덤 인증 코드 생성 (6자리)
       // String authCode = UUID.randomUUID().toString().substring(0, 6);

        // 이메일 전송
       // mailService.sendVerificationEmail(userDTO.getUserID(), authCode);

//        EmailAuth auth = EmailAuth.builder()
//                .email(email)
//                .code(authCode)
//                .createdAt(LocalDateTime.now())
//                .verified(false)
//                .build();
//
//        emailAuthRepository.save(auth);

        System.out.println("UserController.save");
        System.out.println("userDTO = " + userDTO);
        userService.save(userDTO);

        return "index";
    }


    @PostMapping("/send-email-code")
    @ResponseBody
    public String sendAuthCode(@RequestParam String email) {

        if (userService.existsByUserID(email)) {
            return "이미 가입된 이메일입니다. 로그인해주세요.";
        }

        String authCode = UUID.randomUUID().toString().substring(0, 6);

        // ✅ 메일 전송
        mailService.sendVerificationEmail(email, authCode);

        // ✅ 인증 코드 DB 저장
        EmailAuth auth = EmailAuth.builder()
                .email(email)
                .code(authCode)
                .createdAt(LocalDateTime.now())
                .verified(false)
                .build();

        emailAuthRepository.save(auth);

        return "인증 메일이 발송되었습니다.";
    }

    @PostMapping("/verify")
    @ResponseBody
    public String verifyEmailCode(@RequestParam String email, @RequestParam String code) {
        List<EmailAuth> authList = emailAuthRepository.findAllByEmailOrderByCreatedAtDesc(email);
        if (authList.isEmpty()) {
            return "이메일 정보가 없습니다.";
        }

        EmailAuth auth = authList.get(0);

        //EmailAuth auth = optional.get();
        if (auth.isVerified()) {
            return "이미 인증된 사용자입니다.";
        }
        if (!auth.getCode().equals(code)) {
            return "인증 코드가 일치하지 않습니다.";
        }
        auth.setVerified(true);

        emailAuthRepository.save(auth);
        System.out.println("이메일 인증 코드가 DB에 저장되었습니다.");
        return "이메일 인증이 완료되었습니다!";
    }

}


