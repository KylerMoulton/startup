# Startup
Startup application for BYU CS260

## Notes
[click here](notes.md)

## Description Deliverable
### Elevator Pitch
You know that game that your grandparents had that you always hated playing because you couldn't spell to save your life? Well good news, now you'll be able to play it online. Boggle is an extremely fun yet sometimes challenging game where 16 dice consisting of different letters on each face are rolled and arranged in a 4x4 grid. The goal of the game is to create the most words with the letters you have available with the next letter in the word having to either be to the top, bottom, left, right, or diagnal from the current letter you are on. Each word length is worth a different amount of points. Points are stored in a learderboard with your name along with a personal highscore section. Scores are displayed to each player that is currently playing once someone finsihes a game along with their longest word. So, how many points can you get?
### Design
![startupdesign](https://github.com/KylerMoulton/startup/assets/51665872/a54733ef-61ee-4980-8b04-46c444f6893e)

### Key Features
* Secure Login over HTTPS
* Fully Interactive Boggle Board
* Highschore System that includes personal and global categories
* Highschores include the score and the longest word that was spelled
* Live game and score updates from all players currently playing a game
### Technologies
* **HTML** - Uses 4 HTML pages. For logging in, playing, and viewing both of the highscore pages
* **CSS** - Uses to make a clean page that adjusts for different screen sizes and looks good on different systems
* **JavaScript** - Allows login, dice shuffling, displays other users game scores and longest words, backend endpoint calls
* **Service** - Back end service with endpoints for
  * login
  * retrieving scores and longest words
* **DB/Login** - Stores users, scores, and longest words in database. Logs in and registers users. Can't view or save scores unless authenticated.
* **WebSocket** - When a user starts a game it is broadcasted to all players. When a user ends a game their final score and longest word are broadcasted to all players.
* **React** - Application modified to use React
