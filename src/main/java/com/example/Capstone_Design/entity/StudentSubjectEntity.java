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

    @ManyToOne
    @JoinColumn(name = "subject_name", referencedColumnName = "subject_name", insertable = false, updatable = false)
    private SubjectEntity subjectEntity;




}
