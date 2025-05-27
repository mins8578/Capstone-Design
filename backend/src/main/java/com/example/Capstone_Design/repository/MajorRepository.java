package com.example.Capstone_Design.repository;


import com.example.Capstone_Design.entity.MajorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface MajorRepository extends JpaRepository<MajorEntity, String> {

    Optional<MajorEntity> findByMajor(String major);
}
