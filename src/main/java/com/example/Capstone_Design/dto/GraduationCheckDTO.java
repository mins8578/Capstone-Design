package com.example.Capstone_Design.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class GraduationCheckDTO {

    private String subjectName;
    private String subjectCode;
    private Integer score;
}
