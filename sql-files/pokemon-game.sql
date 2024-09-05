DROP DATABASE pokemon_game;

CREATE DATABASE pokemon_game;
USE pokemon_game;

CREATE TABLE user_profile (user_id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50) NOT NULL UNIQUE, user_name VARCHAR(15) NOT NULL UNIQUE, first_battle boolean NOT NULL);

CREATE TABLE passwords (user_id INT NOT NULL UNIQUE, password VARCHAR(40) NOT NULL, CONSTRAINT fk_user_id_passwords FOREIGN KEY (user_id) REFERENCES user_profile(user_id) ON DELETE CASCADE);
  
CREATE TABLE pokemon (user_id INT NOT NULL, pokemon_db_id INT AUTO_INCREMENT PRIMARY KEY, pokemon_id INT NOT NULL, pokemon_name VARCHAR(20) NOT NULL, CONSTRAINT fk_user_id_pokemon FOREIGN KEY (user_id) REFERENCES user_profile(user_id) ON DELETE CASCADE);

CREATE TABLE pokemon_stats (pokemon_db_id INT NOT NULL UNIQUE, pokemon_type VARCHAR(20) NOT NULL, hp INT NOT NULL, level INT NOT NULL, exp INT NOT NULL, weight INT NOT NULL, CONSTRAINT fk_pokemon_id_pokemon_stats FOREIGN KEY (pokemon_db_id) REFERENCES pokemon(pokemon_db_id) ON DELETE CASCADE);

CREATE TABLE pokemon_sprites(pokemon_db_id INT NOT NULL UNIQUE, pokemon_sprite VARCHAR(150), CONSTRAINT fk_pokemon_id_pokemon_sprites FOREIGN KEY (pokemon_db_id) REFERENCES pokemon(pokemon_db_id) ON DELETE CASCADE);

CREATE TABLE pokemon_moves (pokemon_db_id INT NOT NULL UNIQUE, move_1 VARCHAR(15), move_2 VARCHAR(15), move_3 VARCHAR(15), move_4 VARCHAR(15), CONSTRAINT fk_pokemon_id_pokemon_moves FOREIGN KEY (pokemon_db_id) REFERENCES pokemon(pokemon_db_id) ON DELETE CASCADE);

       