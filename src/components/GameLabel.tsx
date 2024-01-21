import { GamePlayer, GameStatus } from '../models/game-models';
import GameHeader from './GameHeader';

const GameLabel = ({
	winner,
	currentPlayer,
	isDraw,
	gameStatus,
}: {
	currentTurn: number;
	winner: GamePlayer | null;
	currentPlayer: GamePlayer;
	isDraw: boolean;
	gameStatus: GameStatus;
}) => {
	let message;
	if (gameStatus === GameStatus.NotStarted) {
		message = `Player ${currentPlayer} starts the game`;
	} else if (gameStatus === GameStatus.Finished) {
		if (isDraw) message = 'Draw!';
		else message = `Player ${winner} won!`;
	} else {
		message = `Player ${currentPlayer}'s turn`;
	}
	return <GameHeader text={message} />;
};

export default GameLabel;
