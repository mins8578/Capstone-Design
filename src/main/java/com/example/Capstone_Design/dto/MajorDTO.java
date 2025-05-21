package com.example.Capstone_Design.dto;

import com.example.Capstone_Design.entity.MajorEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class MajorDTO {

    private String majorCode;
    private String major;


    public static MajorDTO toMajorDTO(MajorEntity major) {
        MajorDTO dto = new MajorDTO();

        dto.setMajorCode(major.getMajorCode());
        dto.setMajor(major.getMajor());

        return dto;
    }

}
