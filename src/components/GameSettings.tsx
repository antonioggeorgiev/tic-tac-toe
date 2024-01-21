import { GameStatus } from '../models/game-models';
import style from '../styles/game-settings.module.css';
import GameHistory from './GameHistory';
import GameTimer from './GameTimer';

const GameSettings = ({
	turns,
	setCurrentTurn,
	gameStatus,
}: {
	turns: number;
	setCurrentTurn: React.Dispatch<React.SetStateAction<number>>;
	gameStatus: GameStatus;
}) => {
	return (
		<div className={style['game-settings-container']}>
			<GameTimer gameStatus={gameStatus} />
			<GameHistory
				turns={turns}
				setCurrentTurn={setCurrentTurn}
				gameStatus={gameStatus}
			/>
		</div>
	);
};

export default GameSettings;
