package com.example.Capstone_Design.dto;

import com.example.Capstone_Design.entity.UserEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDTO {
    private String userID;
    private String pwd;
    private String userName;
//    private String userEmail;
    private String studentNumber;
    private String major;
    private String passwordCheck;

    public static UserDTO toUserDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();

        userDTO.setUserID(userEntity.getUserID());
        userDTO.setPwd(userEntity.getPwd());
        userDTO.setUserName(userEntity.getUserName());
//        userDTO.setUserEmail(userEntity.getUserEmail());
        userDTO.setStudentNumber(userEntity.getStudentNumber());
        userDTO.setMajor(userEntity.getMajor());

        return userDTO;
    }
}
