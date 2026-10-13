USE umc_book_rental_week2;

SELECT b.title, b.description, c.name AS category_name
FROM book AS b
JOIN category AS c ON b.category_id = c.category_id
WHERE c.name = '문학'
  AND b.is_available = TRUE
ORDER BY b.book_id DESC
LIMIT 10 OFFSET 0;

SELECT b.title, r.rented_at, r.due_at
FROM rental AS r
JOIN book AS b ON r.book_id = b.book_id
WHERE r.user_id = 1
  AND r.returned_at IS NULL
ORDER BY r.due_at ASC, r.rental_id ASC;

SELECT b.title, t.name AS tag_name,
       (bl.user_id IS NOT NULL) AS is_liked
FROM book AS b
LEFT JOIN book_tag AS bt ON b.book_id = bt.book_id
LEFT JOIN tag AS t ON bt.tag_id = t.tag_id
LEFT JOIN book_like AS bl ON b.book_id = bl.book_id AND bl.user_id = 1
WHERE b.book_id = 1
ORDER BY t.tag_id ASC;
