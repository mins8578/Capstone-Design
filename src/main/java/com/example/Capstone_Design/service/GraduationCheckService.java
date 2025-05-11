package com.example.Capstone_Design.service;


import com.example.Capstone_Design.Exception.BadRequestException;
import com.example.Capstone_Design.Exception.MajorCodeNotFoundException;
import com.example.Capstone_Design.dto.GraduationCheckDTO;
import com.example.Capstone_Design.dto.MajorDTO;
import com.example.Capstone_Design.entity.MajorEntity;
import com.example.Capstone_Design.repository.MajorRepository;
import com.example.Capstone_Design.repository.StudentSubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GraduationCheckService {

    private final StudentSubjectRepository studentSubjectRepository;
    private final MajorRepository majorRepository;


    // 수강하고 있는 과목 전체 총점
    public int totalSubjectScore(String studentNumber) {
        Integer score = studentSubjectRepository.totalSubjectScore(studentNumber);
        int result = score == null ? 0 : score;

        return result;
    }

    // 수강하고 있는 과목 카테고리 별 총점
    public int subjectScore(String studentNumber, List<String> majorCodes) {
        Integer score = studentSubjectRepository.subjectScore(studentNumber, majorCodes);
        int result = score == null ? 0 : score;

        return result;
    }

    //각 과마다 졸업에 필요한 전공필수 과목
    public List<GraduationCheckDTO> graduationSubject(String majorCode) {
        List<GraduationCheckDTO> graduationCheckDTO = studentSubjectRepository.graduationSubject(majorCode);

        return graduationCheckDTO;
    }


    // 학생이 수강하는 전공필수 과목 조회
    public List<GraduationCheckDTO> graduationCheck(String studentNumber, String majorCode) {
        List<GraduationCheckDTO> graduationCheckDTO = studentSubjectRepository.graduationCheck(studentNumber, majorCode);

        return graduationCheckDTO;
    }


     //학과 코드 리턴
    public String getMajorCode(String major) {
        if(major == null || major.isBlank()) {
            throw new BadRequestException("프론트엔드에서 major가 정상적으로 넘어오지 않음.");
        }


        MajorEntity majorEntity = majorRepository.findByMajor(major).orElseThrow( ()-> new MajorCodeNotFoundException("입력하신 학과에 대한 학과코드가 존재하지 않습니다.") );

        MajorDTO majorDTO = new MajorDTO();
        majorDTO.setMajorCode(majorEntity.getMajorCode());

        return majorDTO.getMajorCode();
    }


}
