package com.example.Capstone_Design.entity;





import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@EqualsAndHashCode
public class StudentSubjectId implements Serializable {


    private String studentNumber;
    private String subjectName;



}
