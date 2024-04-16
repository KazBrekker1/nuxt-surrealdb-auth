-- ------------------------------
-- OPTION
-- ------------------------------

OPTION IMPORT;

-- ------------------------------
-- SCOPES
-- ------------------------------

DEFINE SCOPE user SESSION 1d SIGNUP (CREATE user CONTENT { email: $email, name: $name, password: crypto::argon2::generate($password) }) SIGNIN (SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(password, $password));
DEFINE SCOPE google_user SESSION 1d SIGNUP (CREATE user CONTENT { email: $email, name: $name, google_id: $google_id }) SIGNIN (SELECT * FROM user WHERE email = $email);

-- ------------------------------
-- TABLE: user
-- ------------------------------

DEFINE TABLE user TYPE ANY SCHEMAFULL PERMISSIONS FOR select, update, delete WHERE id = $auth.id, FOR create FULL;

DEFINE FIELD email ON user TYPE string ASSERT string::is::email($value) PERMISSIONS FULL;
DEFINE FIELD name ON user TYPE string PERMISSIONS FULL;
DEFINE FIELD password ON user TYPE option<string> PERMISSIONS FULL;
DEFINE FIELD google_id ON user TYPE option<string> PERMISSIONS FULL;

DEFINE INDEX email ON user FIELDS email UNIQUE;


-- ------------------------------
-- TABLE: thoughts
-- ------------------------------

DEFINE TABLE thoughts TYPE ANY SCHEMAFULL PERMISSIONS FOR select, update, delete WHERE id = $auth.id, FOR create FULL;

DEFINE FIELD title ON thoughts TYPE string PERMISSIONS FULL;
DEFINE FIELD content ON thoughts TYPE string PERMISSIONS FULL;
DEFINE FIELD user ON thoughts TYPE record<user> DEFAULT $auth.id PERMISSIONS FULL;
DEFINE FIELD created_at ON TABLE thoughts TYPE datetime DEFAULT time::now() PERMISSIONS FULL;
DEFINE FIELD updated_at ON TABLE thoughts TYPE datetime DEFAULT time::now() VALUE time::now() PERMISSIONS FULL;

DEFINE INDEX user ON thoughts FIELDS user;


-- ------------------------------
-- TRANSACTION
-- ------------------------------

BEGIN TRANSACTION;

-- ------------------------------
-- TABLE DATA: user
-- ------------------------------


-- ------------------------------
-- TRANSACTION
-- ------------------------------

COMMIT TRANSACTION;

