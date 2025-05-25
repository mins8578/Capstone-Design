package com.example.Capstone_Design.repository;

import com.example.Capstone_Design.dto.MyPageResponse;
import com.example.Capstone_Design.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository // <객체 type, pk type>
public interface UserRepository extends JpaRepository<UserEntity, String> {
    boolean existsByUserID(String userID);  // 이메일 = userID
    Optional<UserEntity> findByUserID(String userID);


    //내 정보 리턴
    @Query("SELECT new com.example.Capstone_Design.dto.MyPageResponse(u.userID, u.userName,u.studentNumber, u.major, u.scdMajor) FROM UserEntity u " +
            "WHERE u.studentNumber = :studentNumber")
    List<MyPageResponse> getUserList(@Param("studentNumber") String studentNumber);



}