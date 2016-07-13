


====================
Authors:
====================
Charles Jonathan Bimm (100972986)
Arzaan Irani (100826631)
====================
Files Included:
app.js
broadcast.js
assignment2.html
README.pdf
README.txt



Tic Tac Toe Game
====================
The program was developed on Windows using the Chrome Browser Environment.
The program can be run by using 'node app.js' command in the terminal, 
where the current directory in the terminal is the directory where the 
files are located. The server runs on 'http://127.0.0.1:3000/assignment2.html'. 

This is a Tic Tac Toe game. This game is based on regular Tic Tac Toe where there are two players. 
Player 1 uses the Xs and one Player 2 uses the Os. Player 1 can not 
use the Os and vice versa. The rules are not enforced on our version 
of the game, so players must navigate based on the own intuition (each 
player should identify when they win, and what are the appropriate positions 
to place an X or O). 
To start the game, player one and player two must each enter their names 
in the appropriate text boxes. The boxes are labelled 'enter Player 1 name' 
and 'enter Player 2 name' accordingly. After entering your name, press enter 
to save the name in the system. Once the names are saved, Player 1 will control 
the Xs and Player 2 will control the Os. At any point, refreshing the windows 
will interrupt and restart the game.
=================
Bugs
=================
There is one known bug in the code (it was discovered last min). The bug seems
 to activate when the size of the window containing the canvas changes. If the
 size of this window gets too small, then the clicking and grabbing of the Xs 
or Os does not properly work. In this case, the grabbing only works considerably
 above the desired X or O, or the grabbing does not work at all. This error also 
appears in some cases when a different environment is used to run the game (ex. 
Using a Mac to run the game in a Safari Browser Environment).
