package com.example.Capstone_Design.service;


import com.example.Capstone_Design.Exception.BadRequestException;
import com.example.Capstone_Design.Exception.MajorCodeNotFoundException;
import com.example.Capstone_Design.dto.GraduationCheckDTO;
import com.example.Capstone_Design.dto.GraduationCheckResponse;
import com.example.Capstone_Design.dto.MajorDTO;
import com.example.Capstone_Design.dto.StudentSubjectDTO;
import com.example.Capstone_Design.entity.MajorEntity;
import com.example.Capstone_Design.entity.StudentSubjectEntity;
import com.example.Capstone_Design.entity.StudentSubjectId;
import com.example.Capstone_Design.repository.MajorRepository;
import com.example.Capstone_Design.repository.StudentSubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GraduationCheckService {

    private final StudentSubjectRepository studentSubjectRepository;
    private final MajorRepository majorRepository;


    // 학과별 수강하는 과목 전체 총점
    public int totalSubjectScore(String studentNumber, String major) {
        Integer score = studentSubjectRepository.totalSubjectScore(studentNumber, major);
        int result = score == null ? 0 : score;

        return result;
    }

    /*
    // 수강하고 있는 전공과목 카테고리 별 총점
    public int subjectScore(String studentNumber, String category) {
        Integer score = studentSubjectRepository.subjectScore(studentNumber, category);
        int result = score == null ? 0 : score;

        return result;
    }

     */

    public List<GraduationCheckResponse> getSubjectCheckList(List<GraduationCheckDTO> allList, List<GraduationCheckDTO> checkList) {

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
                )).collect(Collectors.toList());

        return list;

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

    public boolean studentSubjectSave(String studentNumber, String subjectName) {

        try{
            StudentSubjectDTO dto = new StudentSubjectDTO();
            dto.setStudentNumber(studentNumber);
            dto.setSubjectName(subjectName);

            StudentSubjectEntity studentSubjectEntity = StudentSubjectEntity.toStudentSubjectEntity(dto);
            studentSubjectRepository.save(studentSubjectEntity);

            return true;
        }

        catch(Exception e){
            return false;
        }

    }


}
