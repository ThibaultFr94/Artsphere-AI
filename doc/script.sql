DROP DATABASE IF EXISTS artsphereai;
CREATE DATABASE artsphereai;

CREATE TABLE artsphereai.user (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    gpt_version VARCHAR(60) NULL DEFAULT 'gpt-3'
);

CREATE TABLE artsphereai.type (
    id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE artsphereai.user_type (
    user_id TINYINT UNSIGNED,
    type_id TINYINT(1) UNSIGNED,
    PRIMARY KEY (user_id, type_id),
    FOREIGN KEY (user_id) REFERENCES artsphereai.user(id),
    FOREIGN KEY (type_id) REFERENCES artsphereai.type(id)
);

CREATE TABLE artsphereai.art (
    id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    user_id TINYINT UNSIGNED,
    type_id TINYINT(1) UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES artsphereai.user(id),
    FOREIGN KEY (type_id) REFERENCES artsphereai.type(id)
);

INSERT INTO artsphereai.type
VALUES
    ( NULL, 'Graff'),
    ( NULL, 'Art'),
    ( NULL, 'Pixel art')
;

INSERT INTO artsphereai.user
(id, email, password)
VALUES
    ( NULL, 'user@user.com', '$argon2i$v=19$m=16,t=2,p=1$VkRNcFdkeVczWWwzZHowVw$gcvMtAROIyiloQgPje2E4Q'),
    ( NULL, 'guest@guest.com', '')
;

INSERT INTO artsphereai.user_type
VALUES
    ( 1, 1 ),
    ( 1, 2 )
;
