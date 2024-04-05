# Boggle Startup
Startup application for BYU CS260

## Notes
[click here](public/notes.md)

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
* Application images** - I made the image the background for the rules tab and made the rules transparent slightly so that you can see the full thing.

## JavaScript deliverable

- **login** - You can login or register and it checks to validate the uniquness of the username
- **database** - stores game data like username, score, and longest word in local storage to display in the scoreboard
- **WebSocket** - I used the setInterval function to periodically display a random score someone got. This will be replaced with WebSocket messages later.
- **application logic** - You can press the start button in order to start clicking boxs, you can only click on boxes next to the last box that you selected. You can reset or submit your selection. When you submit it makes an api call that sees if its a valid word longer than 2 letters and will update the score based on boggle scoring.

## Service deliverable

For this deliverable I added backend endpoints that receives votes and returns the voting totals.

- **Node.js/Express HTTP service** - done!
- **Static middleware for frontend** - done!
- **Calls to third party endpoints** - I make a call to a third party dictionary to check if the user spells a valid word.
- **Backend service endpoints** - Placeholders for login that stores the current user on the server.
- **Frontend calls service endpoints** - I did this using the fetch function.

## DB/Login deliverable

For this deliverable I associat the scores with the user in the database and store each user

- **MongoDB Atlas database created** - done!
- **Stores data in MongoDB** - done!
- **User registration** - Creates a new account in the database.
- **existing user** - Allows them to see all the scores and the longest word associated with their username
- **Use MongoDB to store credentials** - Stores both user and their scores/longest word.
- **Restricts functionality** - You can't see any scores unless you are logged in, it also wont save a score until you log in

## WebSocket deliverable

For this deliverable I used webSocket to update the other users when another play starts a game and when they end a game which will 
contain the score and the longest word that that user spelled.

- **Backend listens for WebSocket connection** - done!
- **Frontend makes WebSocket connection** - done!
- **Data sent over WebSocket connection** - done!
- **WebSocket data displayed** - User can see when players start and finish a game and other users are notified when they do the same
