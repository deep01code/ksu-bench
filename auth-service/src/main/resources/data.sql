
create table if not exists oauth_access_token (
  token_id VARCHAR(255),
  token BYTEA,
  authentication_id VARCHAR(255) PRIMARY KEY,
  user_name VARCHAR(255),
  client_id VARCHAR(255),
  authentication BYTEA,
  refresh_token VARCHAR(255)
);


create table if not exists oauth_refresh_token (
  token_id VARCHAR(255),
  token BYTEA,
  authentication BYTEA
);
/*

create table if not exists oauth_access_token (
  token_id VARCHAR(255),
  token BYTEA,
  authentication_id VARCHAR(255) PRIMARY KEY,
  user_name VARCHAR(255),
  client_id VARCHAR(255),
  authentication BYTEA,
  refresh_token VARCHAR(255)
);


create table if not exists oauth_refresh_token (
  token_id VARCHAR(255),
  token BYTEA,
  authentication BYTEA
);



GRANT ALL PRIVILEGES ON TABLE oauth_refresh_token TO mustajal;
GRANT ALL PRIVILEGES ON TABLE oauth_access_token TO mustajal;

drop table oauth_refresh_token;
drop table oauth_access_token;
*/


