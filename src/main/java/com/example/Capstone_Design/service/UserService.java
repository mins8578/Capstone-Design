package com.example.Capstone_Design.service;

import com.example.Capstone_Design.dto.UserDTO;
import com.example.Capstone_Design.entity.UserEntity;
import com.example.Capstone_Design.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository; // jpa, MySQL dependency 추가
    private final PasswordEncoder passwordEncoder; // ✅ 비밀번호 암호화용

    public boolean existsByUserID(String userID) {
        return userRepository.existsByUserID(userID);
    }

    public void save(UserDTO userDTO) {

        // ✅ 비밀번호 암호화
        String encodedPwd = passwordEncoder.encode(userDTO.getPwd());
        userDTO.setPwd(encodedPwd);

        // request -> DTO -> Entity -> Repository에서 save
        UserEntity userEntity = UserEntity.toUserEntity(userDTO);
        userRepository.save(userEntity);
        //Repository의 save메서드 호출 (조건. entity객체를 넘겨줘야 함)
    }

    public String login(String email, String rawPassword) {
        UserEntity user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("가입되지 않은 이메일입니다."));

        if (!passwordEncoder.matches(rawPassword, user.getPwd())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return "로그인 성공"; // 현재는 세션 X, 나중에 JWT 토큰 방식 쓸 예정
    }
}