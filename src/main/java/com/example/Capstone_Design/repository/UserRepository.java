package com.example.Capstone_Design.repository;

import com.example.Capstone_Design.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // <객체 type, pk type>
public interface UserRepository extends JpaRepository<UserEntity, String> {
    boolean existsByUserID(String userID);  // 이메일 = userID
    Optional<UserEntity> findByUserID(String userID);

    Optional<UserEntity> findByUserName(String userName);
}