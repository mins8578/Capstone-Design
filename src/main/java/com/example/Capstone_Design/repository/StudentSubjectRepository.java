package com.example.Capstone_Design.repository;

import com.example.Capstone_Design.entity.StudentSubjectEntity;
import com.example.Capstone_Design.entity.StudentSubjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentSubjectRepository extends JpaRepository<StudentSubjectEntity, StudentSubjectId> {

    //수강하고 있는 과목의 총 학점
    @Query("SELECT SUM(ss.subjectEntity.score) " +
            "FROM StudentSubjectEntity ss " +
            "WHERE ss.studentSubjectId.studentNumber = :studentNumber ")
    Integer totalSubjectScore(@Param("studentNumber") String studentNumber);


    //수강과목의 과목코드
    @Query("SELECT SUM(ss.subjectEntity.score) " +
            "FROM StudentSubjectEntity ss " +
            "WHERE ss.studentSubjectId.studentNumber = :studentNumber " +
            "AND ss.subjectEntity.majorCode IN :majorCode")
    Integer subjectScore(@Param("studentNumber") String studentNumber, @Param("majorCode") List<String> majorCode);
}
