package com.example.Capstone_Design.dto;


import com.example.Capstone_Design.entity.SubjectEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SubjectDTO {

    private String subjectCode;
    private String subjectName;
    private String majorCode;
    private String major;
    private int score;
    private String category;


    public static SubjectDTO toSubjectDTO(SubjectEntity subject) {
        return SubjectDTO.builder().subjectCode(subject.getSubjectCode()).subjectName(subject.getSubjectName())
                .majorCode(subject.getMajorCode()).major(subject.getMajor()).score(subject.getScore())
                .category(subject.getCategory()).build();

    }

}
