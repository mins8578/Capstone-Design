package com.example.Capstone_Design.token;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

import java.util.Base64;

@Component
@RequiredArgsConstructor
public class JwtProvider {
    private String secretKey = "CD jwt secret key";
    private final long tokenValidTime = 60 * 60 * 1000L; // 유효 시간 60분
    private final UserDetailsService userDetailsService;

    // 객체 초기화 시 secretKey를 Base64로 encoding
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT 생성
    public String createToken(String userID) { // List<String> roles
        Claims claims = Jwts.claims().setSubject(userID); // JWT payload에 저장되는 정보 단위
        // claims.put("roles", roles);
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserID(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
    // token에서 UserID 뽑기
    public String getUserID(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }
    // 토큰 유효성, 만료 일자 확인
    public boolean validateToken(String jwt) {
        try {
            if (!jwt.substring(0, "BEARER ".length()).equalsIgnoreCase("BEARER ")) {
                return false;
            } else {
                jwt = jwt.split(" ")[1].trim();
            }

            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt);
            return !claims.getBody().getExpiration().before(new Date());
        } catch(Exception e) {
            return false;
        }
    }
    // request의 header에서 token 가져오기
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }
}