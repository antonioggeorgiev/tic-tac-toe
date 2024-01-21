import { GamePlayer } from '../models/game-models';
import GameHeader from './GameHeader';

const GameLabel = ({
	winner,
	currentPlayer,
	isDraw,
}: {
	currentTurn: number;
	winner: GamePlayer | null;
	currentPlayer: GamePlayer;
	isDraw: boolean;
}) => {
	let message;
	if (winner) {
		message = `Player ${winner} won!`;
	} else if (isDraw) {
		message = 'Draw!';
	} else {
		message = `Player ${currentPlayer}'s turn`;
	}
	return <GameHeader text={message} />;
};

export default GameLabel;
