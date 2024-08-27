USE pokemon_game;
Insert Into user_profile (user_id, email, user_name) Values (1, 'test@gmail.com', 'test'); 
Insert Into passwords (user_id, password) Values (1, '384f60fba8904f09fa3fd0340dc2b381e3549717'); 

INSERT INTO pokemon (user_id, pokemon_db_id, pokemon_id, pokemon_name, pokemon_type) VALUES (1, 1, 1, 'bulbasaur', 'grass');
INSERT INTO pokemon (user_id, pokemon_db_id, pokemon_id, pokemon_name, pokemon_type) VALUES (1, 2, 1, 'bulbasaur', 'grass');