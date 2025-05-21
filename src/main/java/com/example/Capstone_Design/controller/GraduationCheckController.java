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
        Map<String, Integer> map = new HashMap<>();

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String studentNumber = user.getStudentNumber();

        String major = user.getMajor();
        String scdMajor = user.getScdMajor();


        int requiredScore = 33;

        int majorScore = graduationCheckService.totalSubjectScore(studentNumber, major);
        int scdMajorScore = graduationCheckService.totalSubjectScore(studentNumber, scdMajor);
        int score = graduationCheckService.totalSubjectScore(studentNumber, "공통전선");

        int remainMajor = requiredScore - majorScore;  // 주전공 부족 학점
        int remainScdMajor = requiredScore - scdMajorScore; // 복수전공 부족 학점


        //주전공부터
        if(remainMajor > 0 && score > 0) {
            int use = Math.min(remainMajor, score);
            majorScore += use;
            remainMajor -= use;
            score-=use;
        }

        //복수전공
        if(remainScdMajor > 0 && score > 0 ) {
            int use = Math.min(remainScdMajor, score);
            scdMajorScore += use;
            remainScdMajor -= use;
            score-=use;
        }

        if(score > 0) {
            majorScore+=score;
        }

        map.put("주전공 학점", majorScore);
        map.put("복수전공 학점", scdMajorScore);

        return ResponseEntity.ok(map);
    }


    /*
    //학생의 과의 전체 필수전공 리스트 (주전공)
    @PostMapping("/graduation-subject")
    public ResponseEntity<List<GraduationCheckDTO>> graduationSubject(@AuthenticationPrincipal UserDetails userDetails) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String major = user.getMajor();
        String majorCode = graduationCheckService.getMajorCode(major);

        List<GraduationCheckDTO> list = graduationCheckService.graduationSubject(majorCode);
        return ResponseEntity.ok(list);

    }
    */

    //학생이 수강하고 있는 과목중에서 과에 맞는 필수전공 리스트 (주전공)

    @PostMapping("/graduation-check")
    public ResponseEntity<List<GraduationCheckResponse>> graduationCheck(@AuthenticationPrincipal UserDetails userDetails) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String majorCode = graduationCheckService.getMajorCode(user.getMajor());


        List<GraduationCheckDTO> allList = graduationCheckService.graduationSubject(majorCode);
        List<GraduationCheckDTO> checkList = graduationCheckService.graduationCheck(user.getStudentNumber(), majorCode);

        List<GraduationCheckResponse> list = graduationCheckService.getSubjectCheckList(allList, checkList);

        /*
        Set<String> subjectCodes = new HashSet<>();

        for(GraduationCheckDTO dto : checkList) {
            subjectCodes.add(dto.getSubjectCode());
        }

        List<GraduationCheckResponse> list = allList.stream()
                .map(dto -> new GraduationCheckResponse(
                        dto.getSubjectName(),
                        dto.getSubjectCode(),
                        dto.getScore(),
                        subjectCodes.contains(dto.getSubjectCode())
                ))
                .collect(Collectors.toList());
*/

        return ResponseEntity.ok(list);
    }

/*

    //학생의 과의 전체 필수전공 리스트 (복수 전공) 임시코드
    @PostMapping("/graduation-subject02")
    public ResponseEntity<List<GraduationCheckDTO>> graduationSubject02(@AuthenticationPrincipal UserDetails userDetails) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String scdMajor = user.getScdMajor();
        String majorCode = graduationCheckService.getMajorCode(scdMajor);

        List<GraduationCheckDTO> list = graduationCheckService.graduationSubject(majorCode);
        return ResponseEntity.ok(list);

    }
    */

    //학생이 수강하고 있는 과목중에서 과에 맞는 필수전공 리스트 (복수 전공) 임시코드

    @PostMapping("/graduation-check02")
    public ResponseEntity<List<GraduationCheckResponse>> graduationCheck02(@AuthenticationPrincipal UserDetails userDetails) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String majorCode = graduationCheckService.getMajorCode(user.getScdMajor());

        List<GraduationCheckDTO> allList = graduationCheckService.graduationSubject(majorCode);
        List<GraduationCheckDTO> checkList = graduationCheckService.graduationCheck(user.getStudentNumber(), majorCode);

        List<GraduationCheckResponse> list = graduationCheckService.getSubjectCheckList(allList, checkList);

        /*
        Set<String> subjectCodes = new HashSet<>();
        for(GraduationCheckDTO dto : checkList) {
            subjectCodes.add(dto.getSubjectCode());
        }

        List<GraduationCheckResponse> list = allList.stream()
                .map(dto -> new GraduationCheckResponse(
                        dto.getSubjectName(),
                        dto.getSubjectCode(),
                        dto.getScore(),
                        subjectCodes.contains(dto.getSubjectCode())
                ))
                .collect(Collectors.toList());
*/
        return ResponseEntity.ok(list);
    }


    @PostMapping("/subjects")
    public ResponseEntity<?> subjectSave(@AuthenticationPrincipal UserDetails userDetails, @RequestBody SubjectListRequest request) {

        String userID = userDetails.getUsername();
        UserDTO user = userService.getUser(userID);

        String studentNumber = user.getStudentNumber();

        List<String> subjects = request.getSubjects();

        for(String subjectName : subjects) {

            boolean saveFlag = graduationCheckService.studentSubjectSave(studentNumber,subjectName);

            if(!saveFlag) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.ok().build();
    }




}
