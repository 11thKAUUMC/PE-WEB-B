package com.umc.movie.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 캡처 후 환경 변수를 제거하면 localhost:5173만 허용하는 기본 설정으로 복원됩니다.
    @Value("${app.cors.enabled:true}")
    private boolean corsEnabled;

    @Value("${app.cors.allowed-origins:http://localhost:5173}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if (!corsEnabled) return;

        registry.addMapping("/**") // 모든 경로에 대해
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PATCH", "DELETE")
                .allowedHeaders("*");
    }
}