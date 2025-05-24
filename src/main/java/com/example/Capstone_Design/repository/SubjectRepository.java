package com.example.Capstone_Design.repository;

import com.example.Capstone_Design.entity.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<SubjectEntity, String> {

    SubjectEntity findBySubjectName(String subjectName);

}

