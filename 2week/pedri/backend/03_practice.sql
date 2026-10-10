USE umc_book_rental_week2;

SELECT book_id, title, description
FROM book
WHERE is_available = TRUE
ORDER BY book_id DESC;

SELECT book_id, title
FROM book
ORDER BY book_id DESC
LIMIT 2 OFFSET 0;

SELECT book_id, title
FROM book
ORDER BY book_id DESC
LIMIT 2 OFFSET 2;
