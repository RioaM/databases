CREATE DATABASE chat;

USE chat;



/* Create other tables and define schemas for them here! */
CREATE TABLE USERS (
  username VARCHAR(25) PRIMARY KEY,
  font VARCHAR(25),
  fontcolor VARCHAR(25),
  tagline VARCHAR(25),
);

CREATE TABLE rooms (
  roomname varchar(25) PRIMARY KEY
);

CREATE TABLE messages (
  username VARCHAR(25) NOT NULL,
  text VARCHAR(255),
  roomname VARCHAR(25) NOT NULL, 
  createdAt timestamp NOT NULL,
  FOREIGN KEY (username) REFERENCES USERS(username),
  FOREIGN KEY (roomname) REFERENCES ROOMS(roomname)
);

CREATE TABLE friends (
  username VARCHAR(25) FORIGEN KEY REFERENCES USERS(username),
  friend VARCHAR(25) FORIGEN KEY REFERENCES USERS(username)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

