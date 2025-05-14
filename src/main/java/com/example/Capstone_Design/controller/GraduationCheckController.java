package com.example.Capstone_Design.controller;


import com.example.Capstone_Design.Exception.UserNotFoundException;
import com.example.Capstone_Design.dto.GraduationCheckDTO;
import com.example.Capstone_Design.dto.UserDTO;
import com.example.Capstone_Design.entity.UserEntity;
import com.example.Capstone_Design.service.GraduationCheckService;
import com.example.Capstone_Design.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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


        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String studentNumber = user.getStudentNumber();

        int totalScore = graduationCheckService.totalSubjectScore(studentNumber);
        map.put("총 학점 ", totalScore);

        return ResponseEntity.ok(map);



    }

    @PostMapping("/subject-score")   //수강 과목별 학점 조회 (임시코드 수정 필요)
    public ResponseEntity<Map<String, Integer>> subjectScore(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String category) {
        Map<String, Integer> map = new HashMap<>();

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);


        String studentNumber = user.getStudentNumber();


        int subjectScore = graduationCheckService.subjectScore(studentNumber,category );
        map.put("총 학점", subjectScore);

        return ResponseEntity.ok(map);

    }


    //학생의 과의 전체 필수전공 리스트
    @PostMapping("/graduation-subject")
    public ResponseEntity<List<GraduationCheckDTO>> graduationSubject(@AuthenticationPrincipal UserDetails userDetails) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String major = user.getMajor();
        String majorCode = graduationCheckService.getMajorCode(major);

        List<GraduationCheckDTO> list = graduationCheckService.graduationSubject(majorCode);
        return ResponseEntity.ok(list);

    }


    //학생이 수강하고 있는 과목중에서 과에 맞는 필수전공 리스트

    @PostMapping("/graduation-check")
    public ResponseEntity<List<GraduationCheckDTO>> graduationCheck(@AuthenticationPrincipal UserDetails userDetails) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String majorCode = graduationCheckService.getMajorCode(user.getMajor());

        List<GraduationCheckDTO> list = graduationCheckService.graduationCheck(user.getStudentNumber(), majorCode);

        return ResponseEntity.ok(list);
    }


}
