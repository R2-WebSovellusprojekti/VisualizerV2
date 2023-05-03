CREATE TABLE IF NOT EXISTS users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE OR REPLACE PROCEDURE public.create_user(
	IN username character varying,
	IN password character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    INSERT INTO users (username, password)
    VALUES (username, password);
END;
$BODY$;
 ALTER PROCEDURE public.create_user(character varying, character varying)
    OWNER TO postgres;

--
CREATE OR REPLACE PROCEDURE public.delete_user(
	IN username character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    DELETE FROM users
    WHERE users.username = delete_user.username;
END;
$BODY$;
 ALTER PROCEDURE public.delete_user(character varying)
    OWNER TO postgres;

SELECT * FROM users;