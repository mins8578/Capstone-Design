package com.example.Capstone_Design.controller;


import com.example.Capstone_Design.Exception.UserNotFoundException;
import com.example.Capstone_Design.dto.*;
import com.example.Capstone_Design.entity.StudentSubjectEntity;
import com.example.Capstone_Design.entity.UserEntity;
import com.example.Capstone_Design.repository.StudentSubjectRepository;
import com.example.Capstone_Design.service.GraduationCheckService;
import com.example.Capstone_Design.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GraduationCheckController {

    final GraduationCheckService graduationCheckService;
    final UserService userService;


    //주전공,복수전공 총학점 리턴
    @PostMapping("/total-score")
    public ResponseEntity<Map<String, Integer>> totalSubjectScore(@AuthenticationPrincipal UserDetails userDetails) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String studentNumber = user.getStudentNumber();

        int totalScore = graduationCheckService.totalSubjectScore(studentNumber);
        Map<String, Integer> map = graduationCheckService.getSubjectScore(totalScore);

        return ResponseEntity.ok(map);

    }


    //학생이 수강하고 있는 과목중에서 과에 맞는 필수전공 리스트 (주전공)
    @PostMapping("/graduation-check")
    public ResponseEntity<List<GraduationCheckResponse>> graduationCheck(@AuthenticationPrincipal UserDetails userDetails) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String majorCode = graduationCheckService.getMajorCode(user.getMajor());

        List<GraduationCheckDTO> allList = graduationCheckService.graduationSubject(majorCode);
        List<GraduationCheckDTO> checkList = graduationCheckService.graduationCheck(user.getStudentNumber(), majorCode);

        List<GraduationCheckResponse> list = graduationCheckService.getSubjectCheckList(allList, checkList);


        return ResponseEntity.ok(list);
    }


    //학생이 수강하고 있는 과목중에서 과에 맞는 필수전공 리스트 (복수 전공) 임시코드
    @PostMapping("/graduation-check02")
    public ResponseEntity<List<GraduationCheckResponse>> graduationCheck02(@AuthenticationPrincipal UserDetails userDetails) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String majorCode = graduationCheckService.getMajorCode(user.getScdMajor());

        List<GraduationCheckDTO> allList = graduationCheckService.graduationSubject(majorCode);
        List<GraduationCheckDTO> checkList = graduationCheckService.graduationCheck(user.getStudentNumber(), majorCode);

        List<GraduationCheckResponse> list = graduationCheckService.getSubjectCheckList(allList, checkList);

        return ResponseEntity.ok(list);
    }


    //현재 수강하고 있는 과목
    @GetMapping("/subjects")
    public ResponseEntity<?> getSubjects(@AuthenticationPrincipal UserDetails userDetails) {
        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String studentNumber = user.getStudentNumber();

        List<GraduationCheckDTO> list = graduationCheckService.getSubjects(studentNumber);
        //List<String> subjects = graduationCheckService.getGraduationSubjectList(list);

        // ✅ 과목명 문자열만 추출하고 trim(), null 제거, 중복 제거
        List<String> subjects = list.stream()
                .map(GraduationCheckDTO::getSubjectName)
                .filter(Objects::nonNull)
                .map(String::trim)                        // ← 공백 제거
                .filter(name -> !name.isEmpty())          // ← 빈 문자열 제거
                .distinct()                               // ← 중복 제거
                .collect(Collectors.toList());


        return ResponseEntity.ok(subjects);
    }

    //선택한 과목 저장
    @PostMapping("/subjects")
    public ResponseEntity<?> subjectSave(@AuthenticationPrincipal UserDetails userDetails, @RequestBody SubjectListRequest request) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String studentNumber = user.getStudentNumber();

        List<String> subjectNames = request.getSubjects();

        boolean saveFlag = graduationCheckService.studentSubjectSave(studentNumber, subjectNames);

        if(!saveFlag) {
            return ResponseEntity.badRequest().build();
        }
        else {
            return ResponseEntity.ok().build();
        }

        /*
        for(String subjectName : subjects) {
            boolean saveFlag = graduationCheckService.studentSubjectSave(studentNumber,subjectNames);

            if(!saveFlag) {
                return ResponseEntity.badRequest().build();
            }
        }

         */

    }

    //졸업 요건 리스트 충족 불충족 여부
    @PostMapping("/graduation-check-result")
    public ResponseEntity<?> graduationCheckResult(@AuthenticationPrincipal UserDetails userDetails) {
        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String studentNumber = user.getStudentNumber();
        String majorCode = graduationCheckService.getMajorCode(user.getMajor());
        String scdMajorCode = graduationCheckService.getMajorCode(user.getScdMajor());

        Map<String, String> list = graduationCheckService.getGraduationCheckResults(studentNumber, majorCode, scdMajorCode);

        return ResponseEntity.ok(list);
    }


}