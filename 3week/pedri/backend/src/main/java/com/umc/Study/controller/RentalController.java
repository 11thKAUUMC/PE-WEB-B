package com.umc.Study.controller;

import com.umc.Study.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/rentals")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> createRental(
            @RequestBody Map<String, Object> body) {
        rentalService.createRental(body);

        return Map.of("message", "대여 기록이 생성되었습니다!");
    }

    @PatchMapping("/{rentalId}/return")
    public Map<String, String> returnRental(
            @PathVariable("rentalId") Long rentalId) {
        rentalService.returnRental(rentalId);

        return Map.of("message", "반납 처리가 완료되었습니다!");
    }

}