package com.example.Capstone_Design.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@Table(name = "student_subject")
public class StudentSubjectEntity {


    @EmbeddedId
    StudentSubjectId studentSubjectId;


    // student_subject 테이블에 있는 subject_name 값을 기준으로
    // subject 테이블에서 subject_name이 같은 레코드를 찾아서
    // 그 전체 행을 subjectEntity 객체로 자동 매핑
    @ManyToOne
    @MapsId("subjectName")
    @JoinColumn(name = "subject_name", referencedColumnName = "subjectName", insertable = false, updatable = false)
    private SubjectEntity subjectEntity;




}
