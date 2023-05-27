CREATE database spark;
USE spark;
CREATE TABLE users (
    id int AUTO_INCREMENT PRIMARY KEY,
    account varchar(80),
    category int,
    password varchar(80),
    UNIQUE (account)
);
INSERT INTO users (account, category, password) VALUES ('root', 0, SHA2('root', 256));
INSERT INTO users (account, category, password) VALUES ('test', 1, SHA2('test', 256));
