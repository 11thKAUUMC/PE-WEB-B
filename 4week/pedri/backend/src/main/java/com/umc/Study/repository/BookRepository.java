package com.umc.Study.repository;

import com.umc.Study.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findAllByOrderByBookIdDesc();

    List<Book> findByCategory_CategoryId(Long categoryId);
}