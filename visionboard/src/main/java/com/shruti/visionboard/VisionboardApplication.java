package com.shruti.visionboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.shruti.visionboard.repo")
public class VisionboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(VisionboardApplication.class, args);
	}

}

