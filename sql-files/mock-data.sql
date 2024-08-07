USE pokemon_game;

Insert Into user_profile (user_id, email, user_name) Values (1, 'Leonard_Schumm@gmail.com', 'Maxwell12');  
Insert Into user_profile (user_id, email, user_name) Values (2, 'Ed34@hotmail.com', 'Pink.Schuppe74');  
Insert Into user_profile (user_id, email, user_name) Values (3, 'Laurie.Hettinger75@gmail.com', 'Tia_Bergnaum');  



Insert Into passwords (user_id, password) Values (1, 'YdUPLT9mdqHpKSi');  
Insert Into passwords (user_id, password) Values (2, 'zIJkFevkCyeqbVh');  
Insert Into passwords (user_id, password) Values (3, '3HxySL33VItVzWd');  
 

INSERT INTO pokemon (user_id, pokemon_id, pokemon_name, pokemon_type)
VALUES (1, 1, "bulbasaur", "grass");

INSERT INTO pokemon_moves (pokemon_id, move_1, move_2, move_3, move_4)
VALUES (1, "body-slam", "headbutt", null, null);