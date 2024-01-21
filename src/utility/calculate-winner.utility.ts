import { GamePlayer, GameStage } from '../models/game-models';

export const calculateWinner = (squares: GameStage): GamePlayer | null => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		const squaresA = squares[a];
		const squaresB = squares[b];
		const squaresC = squares[c];
		if (squaresA && squaresA === squaresB && squaresA === squaresC) {
			return squaresA;
		}
	}
	return null;
};
