import "./style.css";
import ChessPuzzleViewer from "chess-puzzle-viewer";
import { Chess, defaultSetup, parseUci } from "chessops";
import { makeFen } from "chessops/fen";
import { makeSan, parseSan } from "chessops/san";

async function getDailyPuzzle() {
  try {
    const response = await fetch("https://lichess.org/api/puzzle/daily");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    const data = jsonResponse as {
      game: { pgn: string };
      puzzle: { initialPly: number; solution: string[] };
    };

    return {
      initialPly: data.puzzle.initialPly,
      solution: data.puzzle.solution,
      pgn: data.game.pgn,
    };
  } catch (error) {
    throw new Error(`HTTP error! status: ${error}`);
  }
}

async function getDailyPuzzlePgn() {
  let pos = Chess.fromSetup(defaultSetup()).unwrap();

  const puzzle = await getDailyPuzzle();
  const pgn = puzzle.pgn.split(" ");

  // Play until initialPly
  for (let i = 0; i < puzzle.initialPly; i++) {
    const move = parseSan(pos, pgn[i]);
    if (move === undefined) {
      throw new Error(`Cannot parse move ${pgn[i]}`);
    }

    pos.play(move);
  }

  // This is the starting point of the puzzle
  const fen = makeFen(pos.toSetup());
  let solution: string[] = [];

  // The next move is the blunder, we need to add it to the pgn
  // so chess-puzzle-viewer knows about it and plays it automatically
  // at the start
  const blunderMove = parseSan(pos, pgn[puzzle.initialPly]);
  if (blunderMove === undefined) {
    throw new Error(`Cannot parse move ${pgn[puzzle.initialPly]}`);
  }

  solution.push(makeSan(pos, blunderMove));
  pos.play(blunderMove);

  // Then add the solution provided by lichess api
  for (let i = 0; i < puzzle.solution.length; i++) {
    const move = parseUci(puzzle.solution[i]);
    if (move === undefined) {
      throw new Error(`Can't parse puzzle solution ${puzzle.solution[i]}`);
    }

    solution.push(makeSan(pos, move));
    pos.play(move);
  }

  return `[FEN "${fen}"]\n\n${solution.join(" ")}`;
}

const dailyPuzzlePgn = await getDailyPuzzlePgn();
ChessPuzzleViewer(
  document.getElementById("puzzle") as HTMLElement,
  dailyPuzzlePgn,
  true,
);
