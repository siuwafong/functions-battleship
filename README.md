An online version of this app can be found [here](https://functions-battleship.netlify.app/)

![gif]()

# Functions Battleship

This is a variation of the classic board game Battleship that involves plotting mathematical functions. Players plot their ships on a 10 x 10 Cartesian plane. Then, they take turns plotting graphs of functions. If the graph of a function comes within 0.1 (for both the x- and y-values) of a point where a ship lies, then that ship will be "hit". Once all the points of a ship are "hit" then it will be "sunk". When all ships are "sunk", then the other player wins.

# Libraries/Frameworks

This webapp was created using vanilla JavaScript. Bootstrap was used for styling. JavaScript libraries used include the Desmos API for the graphing calculator and mathJS for simplifying math expressions.

# Instructions

* Install all project dependencies with `npm install`
* Simply run the app by opening the `index.html` file

# How to Play

 Each player first sets up their battleships. In each input, type the first x-value of where you want to place the ship, then the y-value, and lastly "v" or "h", depending on whether you want to place the ship vertically or horizontally.

These values must be separated by a comma, with no spaces in between. Examples: if you type `2,-4,h` for the small ship, then its coordinates will be `(2,-4)`, `(3,-4)` and `(4,-4)`.  If you type `5,0,v` for the submarine, then the coordinates will be `(5,0)`, `(5,1)`, `(5,2)` and `(5,3)`.

Next, players will take turns graphing functions.  The type of function and one of the parameters will be given. You can complete the remaining parameter(s) by inputting an integer value between -20 and 20 (in the case of "a" it also cannot be 0). If the x- and y-values of any of the graph's points are within 0.1 of a ship's point, then that ship will be hit.
