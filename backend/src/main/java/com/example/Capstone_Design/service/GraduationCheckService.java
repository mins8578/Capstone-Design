package com.example.Capstone_Design.service;


import com.example.Capstone_Design.Exception.BadRequestException;
import com.example.Capstone_Design.Exception.MajorCodeNotFoundException;
import com.example.Capstone_Design.dto.GraduationCheckDTO;
import com.example.Capstone_Design.dto.GraduationCheckResponse;
import com.example.Capstone_Design.dto.MajorDTO;
import com.example.Capstone_Design.dto.StudentSubjectDTO;
import com.example.Capstone_Design.entity.MajorEntity;
import com.example.Capstone_Design.entity.StudentSubjectEntity;
import com.example.Capstone_Design.entity.SubjectEntity;
import com.example.Capstone_Design.repository.MajorRepository;
import com.example.Capstone_Design.repository.StudentSubjectRepository;
import com.example.Capstone_Design.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GraduationCheckService {

    private final StudentSubjectRepository studentSubjectRepository;
    private final MajorRepository majorRepository;
    private final SubjectRepository subjectRepository;


    // 학과별 수강하는 과목 전체 총점
    public int totalSubjectScore(String studentNumber) {
        Integer score = studentSubjectRepository.totalSubjectScore(studentNumber);
        int result = score == null ? 0 : score;

        return result;
    }

    //복수전공 주전공 학점 map에 담아 리턴
    public Map<String, Integer> getSubjectScore(int totalScore) {
        Map<String, Integer> map = new HashMap<>();
        int requiredScore = 33;
        int majorScore = Math.min(requiredScore, totalScore);
        totalScore -= majorScore;

        int doubleMajorScore = Math.min(requiredScore, totalScore);
        totalScore -= doubleMajorScore;

        majorScore += totalScore;

        map.put("주전공 학점", majorScore);
        map.put("복수전공 학점", doubleMajorScore);

        return map;
    }


    //필수과목 자가진단
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

    @Transactional
    //과목 저장
    public boolean studentSubjectSave(String studentNumber, List<String> subjectNames) {
        try {
            //프론트에서 받아온 저장하기 위한 과목
            List<SubjectEntity> subjectEntities = subjectRepository.findAllBySubjectNameIn(subjectNames);

            //현재 db에 저장되어 있는 수강과목
            List<String> subjectCheckList = studentSubjectRepository.getSubjects(studentNumber).stream()
                    .map(GraduationCheckDTO::getSubjectName)
                    .collect(Collectors.toList());


            //삭제하려고 하는 과목
            List<String> subjectDelete = subjectCheckList.stream()
                    .filter(subject -> !subjectNames.contains(subject))
                    .collect(Collectors.toList());


            if (!subjectDelete.isEmpty()) {
                studentSubjectRepository.deleteSubject(studentNumber, subjectDelete);
            }

            //프론트에는 있는데 db에는 없는 과목 (추가하려고 하는 과목)
            List<String> subjectList = subjectNames.stream()
                    .filter(subject -> !subjectCheckList.contains(subject))
                    .collect(Collectors.toList());


            Map<String, SubjectEntity> subjectMap = subjectEntities.stream()
                    .collect(Collectors.toMap(SubjectEntity::getSubjectName, Function.identity()));

            List<StudentSubjectEntity> saveList = new ArrayList<>();

            for (String subjectName : subjectList) {
                SubjectEntity subjectEntity = subjectMap.get(subjectName);

                if (subjectEntity == null) {
                    return false;
                }
                StudentSubjectDTO studentSubjectDTO = new StudentSubjectDTO();
                studentSubjectDTO.setSubjectName(subjectName);
                studentSubjectDTO.setStudentNumber(studentNumber);


                StudentSubjectEntity studentSubjectEntity = StudentSubjectEntity.toStudentSubjectEntity(studentSubjectDTO);
                studentSubjectEntity.setSubjectEntity(subjectEntity);
                saveList.add(studentSubjectEntity);

            }

            studentSubjectRepository.saveAll(saveList);
            return true;

        }
        catch (Exception e) {
            return false;
        }

    }

    //수강하고 있는 과목 조회
    public List<String> getGraduationSubjectList(List<GraduationCheckDTO> list) {

        // ✅ 과목명 문자열만 추출하고 trim(), null 제거, 중복 제거
        List<String> subjects = list.stream()
                .map(GraduationCheckDTO::getSubjectName)
                .filter(Objects::nonNull)
                .map(String::trim)                        // ← 공백 제거
                .filter(name -> !name.isEmpty())          // ← 빈 문자열 제거
                .distinct()                               // ← 중복 제거
                .collect(Collectors.toList());


        return subjects;
    }


    //학생이 수강하는 과목 전체 조회
    public List<GraduationCheckDTO> getSubjects(String studentNumber) {
        List<GraduationCheckDTO> list = studentSubjectRepository.getSubjects(studentNumber);

        return list;
    }

    //필수전공 충족 불충족 요건
    public Map<String, String> getGraduationCheckResults(String studentNumber, String majorCode, String scdMajorCode) {
        List<GraduationCheckDTO> list = studentSubjectRepository.graduationCheck(studentNumber, majorCode);
        List<GraduationCheckDTO> list2 = studentSubjectRepository.graduationCheck(studentNumber, scdMajorCode);

        Map<String, String> map = new HashMap<>();

        boolean capstone = false;
        boolean major = false;
        boolean scdMajor = false;

        for(GraduationCheckDTO dto : list) {
            if(dto.getSubjectName() != null) {
                if(dto.getSubjectName().trim().equals("소프트웨어캡스톤디자인")) {
                    capstone = true;
                }
                else {
                    major = true;
                }

                if(capstone && major) {
                    break;
                }
            }
        }

        if(capstone && major) {
            map.put("주전공 필수","충족");
        }
        else {
            map.put("주전공 필수","불충족");
        }

        if(capstone) {
            for(GraduationCheckDTO dto : list2) {
                if(dto.getSubjectName() != null) {
                    if(!dto.getSubjectName().trim().equals("소프트웨어캡스톤디자인")) {
                        scdMajor = true;
                        break;
                    }
                }
            }
        }

        if(capstone && scdMajor) {
            map.put("복수전공 필수","충족");
        }
        else {
            map.put("복수전공 필수","불충족");
        }


        return map;
    }





}
