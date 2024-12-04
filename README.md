# Lichess Daily Chess Puzzle Viewer

This project serves as an example on how to use the [chess-puzzle-viewer](https://github.com/dgalizzi/chess-puzzle-viewer) widget.

Visit https://dgalizzi.github.io/daily-chess-puzzle-viewer/ to see it deployed.

## Getting Started

This project uses [Vite](https://vite.dev/).

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

This will start a local development server. You should see the daily chess puzzle loaded and ready to be solved.

## How it works

It fetches the daily puzzle data from Lichess Puzzle API.
Then this data is transformed using [chessops](https://github.com/niklasf/chessops) to match the expected input by chess-puzzle-viewer.

## Acknowledgements

* Thanks to [Lichess](https://lichess.org/) for providing the Puzzle API.
