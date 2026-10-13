package com.umc.Study.service;

import com.umc.Study.dto.BookResponse;
import com.umc.Study.dto.CreateBookRequest;
import com.umc.Study.entity.Book;
import com.umc.Study.entity.Category;
import com.umc.Study.repository.BookRepository;
import com.umc.Study.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<BookResponse> getAllBooks() {
        return bookRepository.findAllByOrderByBookIdDesc().stream()
                .map(BookResponse::from)
                .toList();
    }

    @Transactional
    public BookResponse createBook(CreateBookRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "존재하지 않는 카테고리입니다."
                ));

        Book book = new Book(
                category,
                request.title(),
                request.description()
        );

        return BookResponse.from(bookRepository.save(book));
    }

    @Transactional(readOnly = true)
    public List<BookResponse> getBooksByCategoryId(Long categoryId) {
        return bookRepository.findByCategory_CategoryId(categoryId).stream()
                .map(BookResponse::from)
                .toList();
    }

}
