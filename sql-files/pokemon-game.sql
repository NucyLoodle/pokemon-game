CREATE DATABASE pokemon_game;
USE pokemon_game;

CREATE TABLE user_profile (
user_id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(50) NOT NULL UNIQUE,
user_name VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE passwords (
user_id INT NOT NULL UNIQUE,
password VARCHAR(8) NOT NULL,
CONSTRAINT fk_user_id_passwords
FOREIGN KEY (user_id)
  REFERENCES user_profile(user_id)
  ON DELETE CASCADE
  );