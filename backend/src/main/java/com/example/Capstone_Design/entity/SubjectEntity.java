package com.example.Capstone_Design.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "subject")
public class SubjectEntity {

    @Id
    private String subjectName;

    @Column(unique = true)
    private String subjectCode;

    private String majorCode;
    private String major;
    private int score;
    private String category;

}
