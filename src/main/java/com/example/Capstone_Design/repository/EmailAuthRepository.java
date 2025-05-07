package com.example.Capstone_Design.repository;


import com.example.Capstone_Design.entity.EmailAuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmailAuthRepository extends JpaRepository<EmailAuthEntity, Long> {
    //Optional<EmailAuth> findByEmail(String email);
    List<EmailAuthEntity> findAllByEmailOrderByCreatedAtDesc(String email);
}