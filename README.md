# woodpecker

TODO: 

1. connect to lichess
-> oauth lichess

2. server generates problems from your games (close to your chess level)
-> POST woodpecker/detnop
-> GET lichess/games/detnop

curl  https://lichess.org/api/games/user/detnop\?perfType\=$perf\&rated\=true\&analysed\=true\&clocks=false\&evals\=true

-> Generates Puzzles

3. train between 20 and 100 pb
-> get duplicate puzzles
-> play puzzle at your level

4. get a score

5. train again 

6. add more puzzles from your games to the pool

7. compare to studyopenings to see where you went wrong
-> import multiple PGN
-> compare PGN to avoid transposition or different moves