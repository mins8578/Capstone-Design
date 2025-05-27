package com.example.Capstone_Design;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import java.util.TimeZone;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class CapstoneDesignApplication {

	// 앱 실행 시 JVM의 기본 시간대를 "Asia/Seoul"로 설정
	@PostConstruct
	public void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}

	public static void main(String[] args) {
		SpringApplication.run(CapstoneDesignApplication.class, args);
	}
}
