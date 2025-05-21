package com.example.Capstone_Design.repository;


import com.example.Capstone_Design.entity.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long> {
    //Optional<EmailAuth> findByEmail(String email);
    List<EmailAuth> findAllByEmailOrderByCreatedAtDesc(String email);
}