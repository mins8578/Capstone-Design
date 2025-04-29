package com.example.Capstone_Design.service;


import com.example.Capstone_Design.repository.StudentSubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GraduationCheckService {

    private final StudentSubjectRepository studentSubjectRepository;

}
