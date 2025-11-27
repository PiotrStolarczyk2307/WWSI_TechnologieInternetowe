DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved INTEGER DEFAULT 0
);

INSERT INTO posts (title, body) VALUES
('Pierwszy post', 'To jest treść pierwszego posta.'),
('Drugi post', 'To jest treść drugiego posta.');

INSERT INTO comments (post_id, body, author, approved) VALUES
(1, 'Świetny post!', 'Anna', 1),
(1, 'Czekam na więcej.', 'Bartek', 0),
(2, 'Zgadzam się z treścią.', 'Celina', 1),
(2, 'Nie jestem przekonany.', 'Darek', 0);
