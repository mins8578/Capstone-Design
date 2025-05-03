package com.example.Capstone_Design.controller;


import com.example.Capstone_Design.entity.UserEntity;
import com.example.Capstone_Design.service.GraduationCheckService;
import com.example.Capstone_Design.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GraduationCheckController {

    final GraduationCheckService graduationCheckService;
    final UserService userService;

    @PostMapping("/total-score")
    public ResponseEntity<Map<String, Integer>> totalSubjectScore(@AuthenticationPrincipal UserDetails userDetails) {
        Map<String, Integer> map = new HashMap<>();

        try {
            String username = userDetails.getUsername();
            UserEntity user = userService.findByUserName(username);

            String studentNumber = user.getStudentNumber();

            int totalScore = graduationCheckService.totalSubjectScore(studentNumber);
            map.put("총 학점 ", totalScore);

            return ResponseEntity.ok(map);
        }

        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("Error", -1));
        }

    }

    @PostMapping("/subject-score")
    public ResponseEntity<Map<String, Integer>> subjectScore(@AuthenticationPrincipal UserDetails userDetails, @RequestParam List<String> majorCodes) {
        Map<String, Integer> map = new HashMap<>();

        try {
            String username = userDetails.getUsername();
            UserEntity user = userService.findByUserName(username);
            String studentNumber = user.getStudentNumber();

            int subjectScore = graduationCheckService.subjectScore(studentNumber, majorCodes);
            map.put("총 학점", subjectScore);

            return ResponseEntity.ok(map);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("Error", -1));
        }
    }

/*
    //학생의 과의 전체 필수전공 리스트
    @PostMapping("/graduation-subject")
    public ResponseEntity<List<GraduationCheckDTO>> graduationSubject(@AuthenticationPrincipal UserDetails userDetails) {


    }
*/

    //학생이 수강하고 있는 과목중에서 과에 맞는 필수전공 리스트
/*
    @PostMapping("/graduation-check")
    public ResponseEntity<List<GraduationCheckDTO>> graduationCheck(@AuthenticationPrincipal UserDetails userDetails) {


    }
*/

}
