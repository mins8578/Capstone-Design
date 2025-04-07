package com.example.Capstone_Design.controller;

import com.example.Capstone_Design.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class LoginController {

    private final UserService userService;

    @GetMapping("/login")
    public String loginForm() {
        return "login"; // templates/login.html 보여줌
    }

    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        Model model) {
        try {
            userService.login(email, password);
            return "redirect:/index"; // 로그인 성공 시 메인으로 이동
        } catch (RuntimeException e) {
            model.addAttribute("error", e.getMessage());
            return "login"; // 로그인 실패 시 다시 로그인 페이지로
        }
    }
}