package com.example.Capstone_Design.config;

import com.example.Capstone_Design.token.JwtAuthenticationFilter;
import com.example.Capstone_Design.token.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtProvider jwtProvider;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
//    @Bean  // DB가 아닌 메모리에 임시로 등록한 사용자만 인증 대상 -> DB 조회 로직 무시
//    public static UserDetailsService userDetailsService() {
//        return new InMemoryUserDetailsManager(); // 또는 직접 구현한 CustomUserDetailsService
//    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .cors(Customizer.withDefaults())
//                .csrf(AbstractHttpConfigurer::disable) // token을 사용하므로 csrf disable
//                .sessionManagement((sessionManagement) -> // Spring Security가 Session을 아예 배재(생성, 사용 X)
//                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // ✅ OPTIONS 허용
                        .requestMatchers(HttpMethod.GET, "/api/board/**", "/api/comments/**").permitAll() // ✅ 게시글/댓글 조회는 공개
                        .requestMatchers("/api/login",
                                "/api/register",
                                "/api/send-code",
                                "/api/verify-code",
                                "/api/find-send-code",
                                "/api/password-verify-code",
                                "/api/reset").permitAll().anyRequest().authenticated()                    // ✅ 로그인, 회원가입, 이메일 인증, 비밀번호 변경 외에 요청은 인증 필요
            )
            .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
}

/*
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://13.124.105.231")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .exposedHeaders("Authorization") // 프론트가 토큰 읽을 수 있게
                        .allowCredentials(true);
            }
        };
    }*/
}
