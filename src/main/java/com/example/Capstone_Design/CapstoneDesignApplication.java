package com.example.Capstone_Design;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class CapstoneDesignApplication {

	public static void main(String[] args) {
		SpringApplication.run(CapstoneDesignApplication.class, args);
	}

}
