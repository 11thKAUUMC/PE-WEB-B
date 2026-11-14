package com.umc.movie;

import com.umc.movie.controller.MemberController;
import com.umc.movie.controller.RatingController;
import com.umc.movie.dto.NicknameCheckResponse;
import com.umc.movie.repository.MemberRepository;
import com.umc.movie.repository.RatingRepository;
import com.umc.movie.service.MemberService;
import com.umc.movie.service.RatingService;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Pageable;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class OptionalMissionTests {
    @Test
    void invalidMemberInputReturns400BeforeServiceCall() throws Exception {
        var service = mock(MemberService.class);
        MockMvc mvc = MockMvcBuilders.standaloneSetup(new MemberController(service)).build();
        mvc.perform(get("/members/nickname/a")).andExpect(status().isBadRequest());
        mvc.perform(get("/members/nickname/abcdefghijklm")).andExpect(status().isBadRequest());
        mvc.perform(get("/members/email/not-an-email")).andExpect(status().isBadRequest());
        verifyNoInteractions(service);
    }

    @Test
    void validNicknameStillChecksAvailability() throws Exception {
        var service = mock(MemberService.class);
        when(service.checkNickname("수현")).thenReturn(new NicknameCheckResponse(false));
        MockMvcBuilders.standaloneSetup(new MemberController(service)).build()
                .perform(get("/members/nickname/{nickname}", "수현"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.available").value(false));
    }

    @Test
    void paginationRejectsInvalidBoundsAndPassesValidValues() throws Exception {
        var service = mock(RatingService.class);
        MockMvc mvc = MockMvcBuilders.standaloneSetup(new RatingController(service)).build();
        mvc.perform(get("/members/1/ratings?page=-1&size=10")).andExpect(status().isBadRequest());
        mvc.perform(get("/members/1/ratings?page=0&size=0")).andExpect(status().isBadRequest());
        mvc.perform(get("/members/1/ratings?page=0&size=101")).andExpect(status().isBadRequest());
        verifyNoInteractions(service);
        when(service.getRatingsByMember(1L, 1, 1)).thenReturn(List.of());
        mvc.perform(get("/members/1/ratings?page=1&size=1")).andExpect(status().isOk()).andExpect(content().json("[]"));
        verify(service).getRatingsByMember(1L, 1, 1);
    }

    @Test
    void paginationIsAppliedToDatabaseQuery() {
        var members = mock(MemberRepository.class);
        var ratings = mock(RatingRepository.class);
        when(members.existsById(1L)).thenReturn(true);
        when(ratings.findByMember_MemberIdOrderByRatingIdDesc(eq(1L), any(Pageable.class)))
                .thenAnswer(invocation -> {
                    Pageable page = invocation.getArgument(1);
                    assertEquals(1, page.getPageNumber());
                    assertEquals(1, page.getPageSize());
                    assertEquals(1L, page.getOffset());
                    return List.of();
                });
        assertEquals(List.of(), new RatingService(ratings, members).getRatingsByMember(1L, 1, 1));
        verify(ratings).findByMember_MemberIdOrderByRatingIdDesc(eq(1L), any(Pageable.class));
    }
}
