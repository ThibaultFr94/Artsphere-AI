DROP DATABASE IF EXISTS artsphereai;
CREATE DATABASE artsphereai;


-- Table User
CREATE TABLE artsphereai.User (
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL
);

-- Table ArtType
CREATE TABLE artsphereai.ArtType (
    id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL UNIQUE,
    type VARCHAR(5) NOT NULL
);

-- Table UserFavoriteType (Table intermédiaire pour la relation many to many)
CREATE TABLE artsphereai.UserFavoriteType (
    user_id TINYINT UNSIGNED,
    arttype_id TINYINT(1) UNSIGNED,
    PRIMARY KEY (user_id, arttype_id),
    FOREIGN KEY (user_id) REFERENCES artsphereai.User(id),
    FOREIGN KEY (arttype_id) REFERENCES artsphereai.ArtType(id)
);

-- Table Art
CREATE TABLE artsphereai.Art (
    id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    user_id TINYINT UNSIGNED,
    arttype_id TINYINT(1) UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES artsphereai.User(id),
    FOREIGN KEY (arttype_id) REFERENCES artsphereai.ArtType(id)
);
