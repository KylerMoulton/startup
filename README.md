# Boggle Startup
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

## HTML Deliverable
* HTML pages - 3 HTML pages that allow you to play the game, see personal and global scores, and see the rules. Pop up HTML page with login and register capability.
* Links - All 3 pages have links to each other along with a button that lets them either login or register.
* Text - There is a page that list the rules as well as headings and markers for different sections on each page
* Images - Added an image of a physical boggle game for users to see what my game is based off of.
* DB/Login - Pop up window that allows the user to login/register. Also a scoreboard that will toggle between the users highscores and the top highscores of every registered player that has reached a top score. The best word associated with the score is also displayed.
* WebSocket - Everytime a user starts/ends a game it is displayed to every user  currently logged in. Along with the end game notification the score and longest word are also displayed.

## CSS deliverable
* Header, footer, and main content body**
* Navigation elements** - I dropped the underline and changed the font and styles along with adding animations that change the size and color
* Responsive to window resizing** - My app looks kind of great until I hit a certain size which I plan on fixing
* Application elements** - I tried to use a variety of colors that coresponded with boggle and also looked decent together
* Application text content** - Consistent fonts
* Application images** - I made the image the background for the rules tab and made the rules transparent slightly so that you can see the ful thing.
