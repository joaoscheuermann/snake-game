# Snake game

## Getting Started

Follow these instructions to set up and run a copy of the project on your local machine for development and testing.

### Prerequisites

Ensure you have Node.js and npm (or yarn/pnpm) installed.

### Installing

1.  Clone the repository

```sh
git clone https://github.com/joaoscheuermann/snake-game.git
```

2.  Install dependencies

```sh
npm install
```

### Running the project

To run the project in development mode, execute the following command:

```sh
npm run dev
```

This will start the development server, and you can view the application in your browser at `http://localhost:5173/`.

# Known problems

## Movement

### Keyboard Event Handling with `document.addEventListener`.

Since JavaScript is single-threaded, rapid key presses (or holding down a key) can cause the browser to block, halting game progression until the key is released. I've noticed this causes a slight jerkiness in the snake's movement across the board, but I won't delve deeper into this problem as my current implementation matches the provided specifications.

# Edge cases

## Snake fills the entire board

Given the amount of points, this scenario is not possible, but I've considered the possibility of the snake filling every cell on the board (thus winning the game). This could be fixed with a simple check.
