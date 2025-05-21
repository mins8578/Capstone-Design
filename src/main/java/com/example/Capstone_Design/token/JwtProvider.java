package com.example.Capstone_Design.token;

import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import javax.crypto.SecretKey;
import io.jsonwebtoken.*;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private static final String RAW_SECRET = "cd_jwt_secret_key_should_be_long_enough_123456";
    private final long tokenValidTime = 60 * 60 * 1000L; // 60분

    private SecretKey secretKey;

    private final UserDetailsService userDetailsService;

    @PostConstruct
    protected void init() {
        // ✅ 문자열을 byte[]로 바꾸고 Key 객체로 생성
        this.secretKey = Keys.hmacShaKeyFor(RAW_SECRET.getBytes(StandardCharsets.UTF_8));

        //log.info("🔐 SecretKey 초기화 완료 (HS256)");
    }

    // JWT 생성
    public String createToken(String userID) {
        Claims claims = Jwts.claims().setSubject(userID);
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)  // ✅ Key 객체로 서명
                .compact();
    }

    // 인증 정보 조회
    public Authentication getAuthentication(String token) {
        String pureToken = parsePureToken(token); // ✅ Bearer 제거
        UserDetails userDetails = userDetailsService.loadUserByUsername(getUserID(pureToken));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // JWT에서 userID 추출
    public String getUserID(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 토큰 유효성 검증
    public boolean validateToken(String token) {
        try {
            String pureToken = parsePureToken(token);
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(pureToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            //log.warn("❌ JWT 검증 실패: {}", e.getMessage());
            return false;
        }
    }

    // Header에서 Token 추출
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    // "Bearer " 접두사 제거
    private String parsePureToken(String token) {
        if (token != null && token.toLowerCase().startsWith("bearer ")) {
            return token.substring(7).trim();
        }
        return token;
    }
}