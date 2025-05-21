package com.example.Capstone_Design.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class GraduationCheckResponse {

    private String subjectName;
    private String subjectCode;
    private Integer score;
    private boolean completed;


}
