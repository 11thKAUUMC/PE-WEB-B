package com.umc.movie;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthFlowTests {

    private static final String PASSWORD = "MovieFan1!";

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper json;

    @Test
    void tokenIdentifiesMemberAndOnlyRatingOwnerCanWrite() throws Exception {
        String nickname = UUID.randomUUID().toString().substring(0, 8);
        String email = nickname + "a@example.com";
        String tokenA = registerAndLogin(email, nickname + "A");
        String tokenB = registerAndLogin(nickname + "b@example.com", nickname + "B");

        mvc.perform(get("/members/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH401_2"));

        String[] tokenParts = tokenA.substring("Bearer ".length()).split("\\.");
        String payload = (tokenParts[1].startsWith("a") ? "b" : "a") + tokenParts[1].substring(1);
        String tamperedToken = "Bearer " + tokenParts[0] + "." + payload + "." + tokenParts[2];
        mvc.perform(get("/members/me").header("Authorization", tamperedToken))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH401_3"));

        mvc.perform(get("/members/me").header("Authorization", tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.email").value(email));
        mvc.perform(patch("/members/me").header("Authorization", tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(Map.of("nickname", nickname + "C"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.nickname").value(nickname + "C"));

        String rating = json.writeValueAsString(Map.of("movieId", 42, "score", 4));
        String created = mvc.perform(post("/ratings").header("Authorization", tokenA)
                        .contentType(MediaType.APPLICATION_JSON).content(rating))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.result.ratingId").isNumber())
                .andReturn().getResponse().getContentAsString();
        long ratingId = json.readTree(created).at("/result/ratingId").asLong();

        mvc.perform(post("/ratings").header("Authorization", tokenA)
                        .contentType(MediaType.APPLICATION_JSON).content(rating))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("RATING409_1"));

        String update = json.writeValueAsString(Map.of("score", 5));
        mvc.perform(patch("/ratings/{id}", ratingId).header("Authorization", tokenB)
                        .contentType(MediaType.APPLICATION_JSON).content(update))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value("RATING403_1"));
        mvc.perform(patch("/ratings/{id}", ratingId).header("Authorization", tokenA)
                        .contentType(MediaType.APPLICATION_JSON).content(update))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.score").value(5));

        mvc.perform(delete("/ratings/{id}", ratingId).header("Authorization", tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("COMMON200"));
        mvc.perform(delete("/ratings/{id}", ratingId).header("Authorization", tokenA))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("RATING404_1"));
    }

    private String registerAndLogin(String email, String nickname) throws Exception {
        mvc.perform(post("/members").contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(Map.of(
                                "email", email, "nickname", nickname, "password", PASSWORD))))
                .andExpect(status().isCreated());
        String response = mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(Map.of("email", email, "password", PASSWORD))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.accessToken").isString())
                .andReturn().getResponse().getContentAsString();
        return "Bearer " + json.readTree(response).at("/result/accessToken").asText();
    }
}
