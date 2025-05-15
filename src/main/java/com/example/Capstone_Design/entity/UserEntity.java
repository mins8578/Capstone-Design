package com.example.Capstone_Design.entity;

import com.example.Capstone_Design.dto.UserDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "user")
public class UserEntity {
    // @GeneratedValue(strategy = GenerationType.IDENTITY) 지금은 안 쓸 건데 자동으로 값 1씩 증가해주며, pk 속성을 가짐
    @Id // primary key
    @Column(name = "userid")
    private String userID;

    @Column(length = 255)
    private String pwd;

    @Column(length = 255)
    private String userName;

    @Column(length = 255)
//    private String userEmail;
    private String studentNumber;
    private String major;

    @Column(name = "role_id", nullable = false)
    private Integer roleId;

    @Column(name="scd_major")
    private String scdMajor;

    @Builder
    public static UserEntity toUserEntity(UserDTO userDto) {
        UserEntity userEntity = new UserEntity();

        userEntity.userID = userDto.getUserID();
        userEntity.pwd = userDto.getPwd();
        userEntity.userName = userDto.getUserName();
//        userEntity.userEmail = userDto.getUserEmail();
        userEntity.studentNumber = userDto.getStudentNumber();
        userEntity.major = userDto.getMajor();
        userEntity.scdMajor = userDto.getScdMajor();

        return userEntity;
    }
}