CREATE TABLE `member_food_preference` (
                                          `id`	BIGINT	NOT NULL	COMMENT '음식 선호 ID',
                                          `member_id`	BIGINT	NOT NULL,
                                          `food_category_id`	BIGINT	NOT NULL,
                                          `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `food_category` (
                                 `id`	BIGINT	NOT NULL	COMMENT '음식 카테고리 ID',
                                 `name`	VARCHAR(30)	NOT NULL	COMMENT '한식, 일식, 중식 등'
);

CREATE TABLE `terms` (
                         `id`	BIGINT	NOT NULL	COMMENT '약관 버전 ID',
                         `code`	VARCHAR(50)	NOT NULL	COMMENT 'AGE_14, SERVICE, PRIVACY, LOCATION, MARKETING 등',
                         `version`	VARCHAR(30)	NOT NULL	COMMENT '약관 버전',
                         `title`	VARCHAR(100)	NOT NULL,
                         `content`	TEXT	NOT NULL,
                         `is_required`	BOOLEAN	NOT NULL	DEFAULT TRUE	COMMENT '필수 동의 여부',
                         `effective_at`	DATETIME	NOT NULL	COMMENT '시행 시각',
                         `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `store` (
                         `id`	BIGINT	NOT NULL	COMMENT '가게 ID',
                         `region_id`	BIGINT	NOT NULL,
                         `food_category_id`	BIGINT	NOT NULL	COMMENT '가게의 대표 음식 카테고리 하나',
                         `name`	VARCHAR(100)	NOT NULL,
                         `description`	TEXT	NULL,
                         `address`	VARCHAR(255)	NOT NULL,
                         `address_detail`	VARCHAR(100)	NULL,
                         `phone_number`	VARCHAR(20)	NULL,
                         `business_status`	ENUM('OPEN', 'CLOSED', 'TEMPORARILY_CLOSED', 'PERMANENTLY_CLOSED')	NOT NULL	DEFAULT 'CLOSED'	COMMENT '영업 상태, 자동 시간 계산은 구현 범위 밖',
                         `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                         `updated_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                         `deleted_at`	DATETIME	NULL
);

CREATE TABLE `mission` (
                           `id`	BIGINT	NOT NULL	COMMENT '미션 ID',
                           `store_id`	BIGINT	NOT NULL,
                           `title`	VARCHAR(100)	NOT NULL,
                           `description`	TEXT	NOT NULL	COMMENT '미션 수행 조건 설명',
                           `minimum_spend`	INT	NOT NULL	COMMENT '최소 식사 금액, 원',
                           `reward_type`	ENUM('FIXED', 'PERCENTAGE')	NOT NULL	DEFAULT 'FIXED',
                           `reward_points`	INT	NULL	COMMENT '정액 보상일 때 포인트, 예: 500',
                           `reward_rate`	DECIMAL(5, 2)	NULL	COMMENT '비율 보상일 때 퍼센트, 예: 5.00',
                           `starts_at`	DATETIME	NOT NULL	COMMENT '미션 시작 시각',
                           `ends_at`	DATETIME	NOT NULL	COMMENT '미션 종료 시각, D-day 계산 기준',
                           `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                           `updated_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                           `deleted_at`	DATETIME	NULL
);

CREATE TABLE `member_mission` (
                                  `id`	BIGINT	NOT NULL	COMMENT '회원 미션 수행 ID',
                                  `member_id`	BIGINT	NOT NULL,
                                  `mission_id`	BIGINT	NOT NULL,
                                  `status`	ENUM('IN_PROGRESS', 'PENDING_VERIFICATION', 'COMPLETED', 'CANCELED', 'EXPIRED')	NOT NULL	DEFAULT 'IN_PROGRESS',
                                  `started_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                                  `requested_at`	DATETIME	NULL	COMMENT '성공 확인 요청 시각',
                                  `completed_at`	DATETIME	NULL	COMMENT '완료 시각',
                                  `canceled_at`	DATETIME	NULL	COMMENT '취소 시각',
                                  `spent_amount`	INT	NULL	COMMENT '완료 시 확인한 실제 식사 금액',
                                  `earned_points`	INT	NULL	COMMENT '완료 시 확정한 보상, 미완료면 NULL',
                                  `verification_code`	VARCHAR(16)	NULL	COMMENT '사장님에게 보여주는 일회용 수행 구분 번호',
                                  `verification_expires_at`	DATETIME	NULL	COMMENT '구분 번호 만료 시각',
                                  `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                                  `updated_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `store_image` (
                               `id`	BIGINT	NOT NULL	COMMENT '가게 이미지 ID',
                               `store_id`	BIGINT	NOT NULL,
                               `image_url`	VARCHAR(1000)	NOT NULL,
                               `sort_order`	INT	NOT NULL	COMMENT '0부터 시작, 첫 이미지가 대표 이미지',
                               `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `inquiry` (
                           `id`	BIGINT	NOT NULL	COMMENT '문의 ID',
                           `member_id`	BIGINT	NOT NULL,
                           `type`	VARCHAR(30)	NOT NULL	COMMENT '문의 유형, 구체적인 종류는 운영 정책으로 결정',
                           `title`	VARCHAR(150)	NOT NULL,
                           `content`	TEXT	NOT NULL,
                           `status`	ENUM('WAITING', 'ANSWERED')	NOT NULL	DEFAULT 'WAITING',
                           `answer_content`	TEXT	NULL	COMMENT '문의당 하나의 답변으로 가정',
                           `answered_at`	DATETIME	NULL,
                           `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                           `updated_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                           `deleted_at`	DATETIME	NULL
);

CREATE TABLE `member` (
                          `id`	BIGINT	NOT NULL	COMMENT '회원 ID',
                          `region_id`	BIGINT	NULL	COMMENT '거주 지역',
                          `name`	VARCHAR(50)	NOT NULL	COMMENT '이름',
                          `nickname`	VARCHAR(30)	NOT NULL	COMMENT '닉네임',
                          `email`	VARCHAR(254)	NULL	COMMENT '연락용 이메일, 로그인 식별자로 사용하지 않음',
                          `phone_number`	VARCHAR(20)	NULL	COMMENT '휴대전화 번호',
                          `phone_verified_at`	DATETIME	NULL	COMMENT '현재 휴대전화 번호 인증 시각',
                          `gender`	ENUM('MALE', 'FEMALE', 'UNSPECIFIED')	NOT NULL	DEFAULT 'UNSPECIFIED',
                          `birth_date`	DATE	NOT NULL	COMMENT '생년월일',
                          `address`	VARCHAR(255)	NULL	COMMENT '도로명 또는 지번 주소',
                          `address_detail`	VARCHAR(100)	NULL	COMMENT '상세 주소',
                          `profile_image_url`	VARCHAR(1000)	NULL	COMMENT '프로필 이미지 URL',
                          `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                          `updated_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                          `deleted_at`	DATETIME	NULL	COMMENT '탈퇴 시각, NULL이면 활성 회원'
);

CREATE TABLE `member_agreement` (
                                    `id`	BIGINT	NOT NULL	COMMENT '회원 약관 동의 ID',
                                    `member_id`	BIGINT	NOT NULL,
                                    `terms_id`	BIGINT	NOT NULL,
                                    `is_agreed`	BOOLEAN	NOT NULL	DEFAULT FALSE	COMMENT '현재 동의 여부',
                                    `agreed_at`	DATETIME	NULL	COMMENT '마지막 동의 시각',
                                    `withdrawn_at`	DATETIME	NULL	COMMENT '동의 철회 시각',
                                    `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                                    `updated_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `member_social_account` (
                                         `id`	BIGINT	NOT NULL	COMMENT '소셜 계정 ID',
                                         `member_id`	BIGINT	NOT NULL,
                                         `provider`	ENUM('KAKAO', 'NAVER', 'APPLE', 'GOOGLE')	NOT NULL,
                                         `provider_user_id`	VARCHAR(255)	NOT NULL	COMMENT '소셜 제공자의 회원 식별값',
                                         `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `review_image` (
                                `id`	BIGINT	NOT NULL	COMMENT '리뷰 이미지 ID',
                                `review_id`	BIGINT	NOT NULL,
                                `image_url`	VARCHAR(1000)	NOT NULL,
                                `sort_order`	INT	NOT NULL	COMMENT '0~2, 리뷰당 최대 3장, 애플리케이션에서 검증',
                                `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `review` (
                          `id`	BIGINT	NOT NULL	COMMENT '리뷰 ID',
                          `member_mission_id`	BIGINT	NOT NULL	COMMENT '완료한 미션 수행 내역, 작성자와 가게는 조인으로 조회',
                          `rating`	DECIMAL(2, 1)	NOT NULL	COMMENT '0.5~5.0, 0.5 단위, 애플리케이션에서 검증',
                          `content`	TEXT	NOT NULL,
                          `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                          `updated_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
                          `deleted_at`	DATETIME	NULL
);

CREATE TABLE `region` (
                          `id`	BIGINT	NOT NULL	COMMENT '지역 ID',
                          `city`	VARCHAR(50)	NOT NULL	COMMENT '시 또는 도',
                          `district`	VARCHAR(50)	NOT NULL	COMMENT '시군구',
                          `neighborhood`	VARCHAR(50)	NOT NULL	COMMENT '동 또는 읍면'
);

CREATE TABLE `inquiry_image` (
                                 `id`	BIGINT	NOT NULL	COMMENT '문의 이미지 ID',
                                 `inquiry_id`	BIGINT	NOT NULL,
                                 `image_url`	VARCHAR(1000)	NOT NULL,
                                 `sort_order`	INT	NOT NULL	COMMENT '0부터 시작하는 표시 순서',
                                 `created_at`	DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `member_food_preference` ADD CONSTRAINT `PK_MEMBER_FOOD_PREFERENCE` PRIMARY KEY (
                                                                                             `id`
    );

ALTER TABLE `food_category` ADD CONSTRAINT `PK_FOOD_CATEGORY` PRIMARY KEY (
                                                                           `id`
    );

ALTER TABLE `terms` ADD CONSTRAINT `PK_TERMS` PRIMARY KEY (
                                                           `id`
    );

ALTER TABLE `store` ADD CONSTRAINT `PK_STORE` PRIMARY KEY (
                                                           `id`
    );

ALTER TABLE `mission` ADD CONSTRAINT `PK_MISSION` PRIMARY KEY (
                                                               `id`
    );

ALTER TABLE `member_mission` ADD CONSTRAINT `PK_MEMBER_MISSION` PRIMARY KEY (
                                                                             `id`
    );

ALTER TABLE `store_image` ADD CONSTRAINT `PK_STORE_IMAGE` PRIMARY KEY (
                                                                       `id`
    );

ALTER TABLE `inquiry` ADD CONSTRAINT `PK_INQUIRY` PRIMARY KEY (
                                                               `id`
    );

ALTER TABLE `member` ADD CONSTRAINT `PK_MEMBER` PRIMARY KEY (
                                                             `id`
    );

ALTER TABLE `member_agreement` ADD CONSTRAINT `PK_MEMBER_AGREEMENT` PRIMARY KEY (
                                                                                 `id`
    );

ALTER TABLE `member_social_account` ADD CONSTRAINT `PK_MEMBER_SOCIAL_ACCOUNT` PRIMARY KEY (
                                                                                           `id`
    );

ALTER TABLE `review_image` ADD CONSTRAINT `PK_REVIEW_IMAGE` PRIMARY KEY (
                                                                         `id`
    );

ALTER TABLE `review` ADD CONSTRAINT `PK_REVIEW` PRIMARY KEY (
                                                             `id`
    );

ALTER TABLE `region` ADD CONSTRAINT `PK_REGION` PRIMARY KEY (
                                                             `id`
    );

ALTER TABLE `inquiry_image` ADD CONSTRAINT `PK_INQUIRY_IMAGE` PRIMARY KEY (
                                                                           `id`
    );

