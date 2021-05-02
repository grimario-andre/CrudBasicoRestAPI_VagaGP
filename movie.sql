DROP DATABASE IF EXISTS mock;
CREATE DATABASE mock;

CREATE SEQUENCE public.movie_id_seq;

ALTER SEQUENCE public.movie_id_seq
    OWNER TO postgres;

CREATE TABLE public.movie
(
    id bigint NOT NULL DEFAULT nextval('movie_id_seq'::regclass),    
    name character varying(255) COLLATE pg_catalog."default",
    public_domain character varying(255) COLLATE pg_catalog."default",
    release_date character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT movie_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.movie
    OWNER to postgres;

INSERT INTO movie (name) VALUES ('Angel and the Badman');
INSERT INTO movie (name) VALUES ('Metropolis');
INSERT INTO movie (name) VALUES ('The 39 steps');
INSERT INTO movie (name) VALUES ('Plan 9 from outer space');
INSERT INTO movie (name) VALUES ('The vagabond');
INSERT INTO movie (name) VALUES ('Gulliver''s Travels');
INSERT INTO movie (name) VALUES ('Beat the Devil');
INSERT INTO movie (name) VALUES ('Vengeance Valley');
INSERT INTO movie (name) VALUES ('Detour');
INSERT INTO movie (name) VALUES ('The Devil Dodger');
INSERT INTO movie (name) VALUES ('Algiers');
INSERT INTO movie (name) VALUES ('Of Human Bondage');
INSERT INTO movie (name) VALUES ('McLintock!');
INSERT INTO movie (name) VALUES ('My Favorite Brunette ');

