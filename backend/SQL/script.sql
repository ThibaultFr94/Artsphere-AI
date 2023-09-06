DROP DATABASE IF EXISTS artsphereai;
CREATE DATABASE artsphereai;


-- Table User
CREATE TABLE artsphereai.user (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL
);

-- Table ArtType
CREATE TABLE artsphereai.type (
    id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL UNIQUE
);

-- Table UserFavoriteType (Table intermédiaire pour la relation many to many)
CREATE TABLE artsphereai.user_type (
    user_id TINYINT UNSIGNED,
    type_id TINYINT(1) UNSIGNED,
    PRIMARY KEY (user_id, type_id),
    FOREIGN KEY (user_id) REFERENCES artsphereai.user(id),
    FOREIGN KEY (type_id) REFERENCES artsphereai.type(id)
);

-- Table Art
CREATE TABLE artsphereai.art (
    id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    user_id TINYINT UNSIGNED,
    type_id TINYINT(1) UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES artsphereai.user(id),
    FOREIGN KEY (type_id) REFERENCES artsphereai.type(id)
);

-- insertion des types
INSERT INTO artsphereai.type
VALUES
    ( NULL, 'Graff'),
    ( NULL, 'Art'),
    ( NULL, 'Pixel art')
;