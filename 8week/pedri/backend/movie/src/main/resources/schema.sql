CREATE TABLE IF NOT EXISTS member (
    member_id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(254) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (member_id)
);

CREATE TABLE IF NOT EXISTS rating (
    rating_id BIGINT NOT NULL AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    score TINYINT NOT NULL,
    comment TEXT,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (rating_id),
    UNIQUE (member_id, movie_id),
    CONSTRAINT fk_rating_member FOREIGN KEY (member_id) REFERENCES member (member_id)
);

CREATE TABLE IF NOT EXISTS favorite (
    favorite_id BIGINT NOT NULL AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (favorite_id),
    UNIQUE (member_id, movie_id),
    CONSTRAINT fk_favorite_member FOREIGN KEY (member_id) REFERENCES member (member_id)
);

-- Upgrade the earlier 8-week schema while preserving favorite relationships.
SET @favorite_migration = IF(
    EXISTS(SELECT 1 FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = 'favorite' AND column_name = 'favorite_id'),
    'SELECT 1',
    'ALTER TABLE favorite ADD UNIQUE (member_id, movie_id), DROP PRIMARY KEY, ADD favorite_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, ADD created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ADD updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)'
);
PREPARE favorite_migration_stmt FROM @favorite_migration;
EXECUTE favorite_migration_stmt;
DEALLOCATE PREPARE favorite_migration_stmt;
