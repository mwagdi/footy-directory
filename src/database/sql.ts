export const NATIONS_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS nations
    (
        id
        SERIAL
        PRIMARY
        KEY,
        name
        TEXT,
        population
        INT,
        flag
        TEXT
    )
`;

export const CLUBS_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS clubs
    (
        id
        SERIAL
        PRIMARY
        KEY,
        name
        TEXT,
        nation_id
        INT
        REFERENCES
        nations
    (
        id
    ) ON DELETE SET NULL,
        logo TEXT
        )
`;

export const PLAYERS_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS players
    (
        id
        SERIAL
        PRIMARY
        KEY,
        name
        TEXT,
        birthdate
        DATE,
        position
        TEXT,
        avatar
        TEXT,
        club_id
        INT
        REFERENCES
        clubs
    (
        id
    ) ON DELETE SET NULL
        )
`;

export const PLAYER_NATIONS_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS player_nations
    (
        player_id
        INT
        REFERENCES
        players
    (
        id
    ) ON DELETE CASCADE,
        nation_id INT REFERENCES nations
    (
        id
    )
      ON DELETE CASCADE,
        PRIMARY KEY
    (
        player_id,
        nation_id
    ) -- Composite primary key
        )
`;

export const USERS_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS users
    (
        id
        SERIAL
        PRIMARY
        KEY,
        email
        VARCHAR
    (
        50
    ) UNIQUE,
        first_name TEXT,
        last_name TEXT,
        avatar TEXT,
        password
        TEXT
        )
`;