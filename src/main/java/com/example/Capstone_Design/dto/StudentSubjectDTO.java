package com.example.Capstone_Design.dto;


import com.example.Capstone_Design.entity.StudentSubjectEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StudentSubjectDTO {

    private String studentNumber;
    private String subjectName;


    public static StudentSubjectDTO toStudentSubjectDTO(StudentSubjectEntity studentSubject) {

        StudentSubjectDTO studentSubjectDTO = new StudentSubjectDTO();

        studentSubjectDTO.setStudentNumber(studentSubject.getStudentSubjectId().getStudentNumber());
        studentSubjectDTO.setSubjectName(studentSubject.getStudentSubjectId().getSubjectName());

        return studentSubjectDTO;
    }


}
