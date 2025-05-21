package com.example.Capstone_Design.dto;

import com.example.Capstone_Design.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class MyPageResponse {

    private String userID;
    private String studentNumber;
    private String major;
    private String scdMajor;



    public static MyPageResponse toMyPageResponse(UserEntity userEntity) {
        MyPageResponse myPageResponse = new MyPageResponse();

        myPageResponse.setUserID(userEntity.getUserID());
        myPageResponse.setStudentNumber(userEntity.getStudentNumber());
        myPageResponse.setMajor(userEntity.getMajor());
        myPageResponse.setScdMajor(userEntity.getScdMajor());

        return myPageResponse;
    }

}
