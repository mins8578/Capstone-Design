package com.example.Capstone_Design.service;


import com.example.Capstone_Design.dto.GraduationCheckDTO;
import com.example.Capstone_Design.repository.StudentSubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GraduationCheckService {

    private final StudentSubjectRepository studentSubjectRepository;


    // 수강하고 있는 과목 전체 총점
    public int totalSubjectScore(String studentNumber) {
        Integer score = studentSubjectRepository.totalSubjectScore(studentNumber);
        int result = score == null ? 0 : score;

        return result;
    }

    // 수강하고 있는 과목 카테고리 별 총점
    public int subjectScore(String studentNumber, List<String> majorCode) {
        Integer score = studentSubjectRepository.subjectScore(studentNumber, majorCode);
        int result = score == null ? 0 : score;

        return result;
    }


    public List<GraduationCheckDTO> graduationSubject(List<String> majorCodes) {
        List<GraduationCheckDTO> graduationCheckDTO = studentSubjectRepository.graduationSubject(majorCodes);

        return graduationCheckDTO;
    }



    /*
    // 졸업 자가진단 각 과마다 필수전공 수강 여부 체크
    public Map<String, GraduationCheckDTO> graduationCheck(String studentNumber, List<GraduationCheckDTO> graduationCheckDTO) {




    }
    */



}
