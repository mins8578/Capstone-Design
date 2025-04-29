package com.example.Capstone_Design.controller;


import com.example.Capstone_Design.service.GraduationCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GraduationCheckController {

    final GraduationCheckService graduationCheckService;
    

}
