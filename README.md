# TODO: woodpecker 

### 1. connect to app via lichess
-> user logs in using oauth lichess

### 2. server generates problems from your games (close to your chess level)
-> Retrieve user games using liches API : GET lichess/games/detnop\
-> Save games in DB (check if game id already exist)\
-> Generate puzzles from games in DB\
-> Save puzzles to DB

### 3. train between 20 and 100 pb
-> Play puzzles at your level\
-> Get a score\
-> Train again\
-> Add more puzzles from your games to the pool

### 4. Practice your openings
-> Import opening studies PGN\
-> Parse PGN, avoid transpositions, allow only one move fo each position (FEN)\
-> Save to DB\
-> Compare to studyopenings to see where you went wrong

## Modules 🙏 : 

Chess logic : https://github.com/shaack/cm-chess\
PGN to Puzzles : https://github.com/vitogit/pgn-tactics-generator