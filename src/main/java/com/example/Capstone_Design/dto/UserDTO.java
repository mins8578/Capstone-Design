package com.example.Capstone_Design.dto;

import com.example.Capstone_Design.entity.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDTO {
    private String userID;
    //@JsonIgnore // 서버 내부에서는 pwd 필드를 그대로 사용 가능, 클라이언트로 응답 보낼 때에는 비밀번호 정보가 노출되지 않음.

    private String pwd;
    //@JsonIgnore

    private String passwordCheck;
    private String userName;
    //    private String userEmail;
    private String studentNumber;
    private String major;


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
