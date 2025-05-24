package com.example.Capstone_Design.entity;

import com.example.Capstone_Design.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
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

    private String major;

    @Column(name = "role_id", nullable = false)
    private Integer roleId;

    @Column(name = "scd_major")
    private String scdMajor;

    // ✅ DTO → Entity 변환용 정적 메서드
    public static UserEntity toUserEntity(UserDTO userDto) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUserID(userDto.getUserID());
        userEntity.setPwd(userDto.getPwd());
        userEntity.setUserName(userDto.getUserName());
        userEntity.setStudentNumber(userDto.getStudentNumber());
        userEntity.setMajor(userDto.getMajor());
        userEntity.setScdMajor(userDto.getScdMajor());
        return userEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserEntity that)) return false;
        return Objects.equals(userID, that.userID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID);
    }
}