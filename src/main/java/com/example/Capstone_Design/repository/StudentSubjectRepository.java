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

    // 학과별 수강하는 과목 전체 총점
    @Query("SELECT SUM(ss.subjectEntity.score) " +
            "FROM StudentSubjectEntity ss " +
            "WHERE ss.studentSubjectId.studentNumber = :studentNumber " +
            "AND ss.subjectEntity.major =:major" )
    Integer totalSubjectScore(@Param("studentNumber") String studentNumber, @Param("major") String major);


    // 수강하고 있는 전공과목 카테고리 별 총점
    @Query("SELECT SUM(ss.subjectEntity.score) " +
            "FROM StudentSubjectEntity ss " +
            "WHERE ss.studentSubjectId.studentNumber = :studentNumber " +
            "AND ss.subjectEntity.category LIKE CONCAT('%', :category, '%')  ")
    Integer subjectScore(@Param("studentNumber") String studentNumber, @Param("category") String category);


    // 과 별로 필수전공 조회
    @Query("SELECT new com.example.Capstone_Design.dto.GraduationCheckDTO(se.subjectName, se.subjectCode, se.score) " +
            "FROM SubjectEntity se " +
            "WHERE se.majorCode LIKE CONCAT('%', :majorCode, '%')")
    List<GraduationCheckDTO> graduationSubject(@Param("majorCode")String majorCode);





    //학생이 수강하는 전공필수 과목 조회
    @Query("SELECT new com.example.Capstone_Design.dto.GraduationCheckDTO(se.subjectName, se.subjectCode, se.score) " +
            "FROM StudentSubjectEntity sse " +
            "JOIN sse.subjectEntity se " +
            "WHERE sse.studentSubjectId.studentNumber = :studentNumber " +
            "AND se.majorCode LIKE CONCAT('%', :majorCode, '%')")
    List<GraduationCheckDTO> graduationCheck(@Param("studentNumber") String studentNumber,
                                             @Param("majorCode") String majorCode);





}

