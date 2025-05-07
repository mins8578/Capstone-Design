package com.example.Capstone_Design.repository;

import com.example.Capstone_Design.dto.GraduationCheckDTO;
import com.example.Capstone_Design.entity.StudentSubjectEntity;
import com.example.Capstone_Design.entity.StudentSubjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentSubjectRepository extends JpaRepository<StudentSubjectEntity, StudentSubjectId> {

    // 수강하고 있는 과목의 총 학점
    @Query("SELECT SUM(ss.subjectEntity.score) " +
            "FROM StudentSubjectEntity ss " +
            "WHERE ss.studentSubjectId.studentNumber = :studentNumber ")
    Integer totalSubjectScore(@Param("studentNumber") String studentNumber);


    // 수강하고 있는 과목 카테고리 별 총점
    @Query("SELECT SUM(ss.subjectEntity.score) " +
            "FROM StudentSubjectEntity ss " +
            "WHERE ss.studentSubjectId.studentNumber = :studentNumber " +
            "AND ss.subjectEntity.majorCode IN :majorCodes")
    Integer subjectScore(@Param("studentNumber") String studentNumber, @Param("majorCodes") List<String> majorCodes);


    // 과 별로 필수전공 조회
    @Query("SELECT new com.example.Capstone_Design.dto.GraduationCheckDTO(se.subjectCode, se.subjectName, se.score) " +
            "FROM SubjectEntity se " +
            "WHERE se.majorCode LIKE CONCAT('%', :majorCode, '%')")
    List<GraduationCheckDTO> graduationSubject(@Param("majorCode")String majorCode);




    // 졸업 자가진단 각 과마다 필수전공 수강 여부 체크
    @Query("SELECT new com.example.Capstone_Design.dto.GraduationCheckDTO(s.subjectCode, s.subjectName, s.score) " +
            "FROM StudentSubjectEntity ss " +
            "JOIN ss.subjectEntity s " +
            "WHERE ss.studentSubjectId.studentNumber = :studentNumber " +
            "AND ss.studentSubjectId.subjectName = :subjectNames")
    List<GraduationCheckDTO> graduationCheck(@Param("studentNumber") String studentNumber, @Param("subjectNames") List<String> subjectNames);
}
