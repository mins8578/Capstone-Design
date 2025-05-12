package com.example.Capstone_Design.service;

import com.example.Capstone_Design.Exception.BadRequestException;
import com.example.Capstone_Design.Exception.UserNotFoundException;
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
        // ✅ 기본 권한 USER (role_id = 1)
        userEntity.setRoleId(1);
        userRepository.save(userEntity);
        //Repository의 save메서드 호출 (조건. entity객체를 넘겨줘야 함)
    }

    public UserEntity login(String userID, String rawPassword) {
        UserEntity user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("가입되지 않은 이메일입니다."));

        if (!passwordEncoder.matches(rawPassword, user.getPwd())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return user; // 현재는 세션 X, 나중에 JWT 토큰 방식 쓸 예정
    }

    public UserDTO findByUserName(String userName) {

        if(userName == null || userName.isBlank()) {
            throw new BadRequestException("프론트엔드에서 userName이 정상적으로 넘어오지 않음.");
        }

        UserEntity user = userRepository.findByUserName(userName).orElseThrow(() -> new UserNotFoundException("입력하신 회원이 존재하지 않습니다."));

        return UserDTO.toUserDTO(user);
    }

}