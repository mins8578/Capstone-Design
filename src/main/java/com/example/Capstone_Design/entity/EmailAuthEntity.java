package com.example.Capstone_Design.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "email_auth")
public class EmailAuthEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String code;

    private LocalDateTime createdAt;

    private boolean verified; // 인증 여부

    // Builder 패턴을 위한 생성자
    @Builder
    public EmailAuthEntity(String email, String code, LocalDateTime createdAt, boolean verified) {
        this.email = email;
        this.code = code;
        this.createdAt = createdAt;
        this.verified = verified;
    }
}