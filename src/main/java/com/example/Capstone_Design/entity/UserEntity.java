package com.example.Capstone_Design.entity;

import com.example.Capstone_Design.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 👈 Hibernate 프록시 직렬화 방지
public class UserEntity {

    @Id
    @Column(name = "userid")
    private String userID;

    @Column(length = 255)
    private String pwd;

    @Column(length = 255)
    private String userName;

    @Column(length = 255)
    private String studentNumber;

    @Column(length = 255)
    private String major;

    @Column(name = "role_id", nullable = false)
    private Integer roleId;

    @Column(name = "scd_major")
    private String scdMajor;

    public static UserEntity toUserEntity(UserDTO userDto) {
        return UserEntity.builder()
                .userID(userDto.getUserID())
                .pwd(userDto.getPwd())
                .userName(userDto.getUserName())
                .studentNumber(userDto.getStudentNumber())
                .major(userDto.getMajor())
                .scdMajor(userDto.getScdMajor())
                .build();
    }
}