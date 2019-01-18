
# Online Animation Game
## Installation
The game is available at [https://ovn0605.github.io/AnimationGame/](https://ovn0605.github.io/AnimationGame/).
You can click on the link or type the URL address in your web browser you will get the game loaded. 
You can also click [here](Animation.zip) to download a zippped version, which you can decompress and play locally. In this case, you should type the path of the index.html file in your browser.
However, in both cases, you should ensure that Javascript is enabled in your browser.

## Playing The Game
The game consists of 6 rows of rectangles. The bottom two rows represent grass. The next 3 rows represent pavement while the topmost row represent water. When the game is loaded, a player starts on the upper of the two grass rows. Bugs are generated from the leftmost retangles on the pavement rows and they move towards the right. The user plays the game by moving the player left, right, top or bottom, by using the arrow keys.
If the player is hit by a bug, he moves down to the starting position. If he can climb the rows and reach the water row without being hit by a bug, the game is won. A message is displayed and the user has the option to restart the game.

## Failures and Timer
Each time the player is hit by a bug and has to restart, it is considered a failure. The count of failures is displayed. Also, a timer is started when the game starts. It counts and displays the number of minutes and seconds elapsed since the game started. When a game is won, the time required to win the game is displayed, as well as the total number of failures that occured.

## The Reset Button
A Reset button allows the user to restart the game at any time. for example, if after a few moves, the user wants to restart the game, he/she can simply click on the Reset button. The timer and failure count will be reinitialized and the player will also move to the starting position.
