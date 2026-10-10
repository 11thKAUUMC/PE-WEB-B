package com.umc.Study.service;

import com.umc.Study.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<Map<String, Object>> getAllBooks() {
        return bookRepository.findAll();
    }
    public void createBook(Map<String, Object> body) {
        bookRepository.save(body);
    }

    public List<Map<String, Object>> getBooksByCategoryId(Long categoryId) {
        return bookRepository.findByCategoryId(categoryId);
    }

}
