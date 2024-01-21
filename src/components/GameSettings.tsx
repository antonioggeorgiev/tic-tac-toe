import style from '../styles/game-settings.module.css';
import GameHistory from './GameHistory';
import GameTimer from './GameTimer';

const GameSettings = ({
	turns,
	setCurrentTurn,
	isGameRunning,
	time,
	setTime,
}: {
	turns: number;
	setCurrentTurn: React.Dispatch<React.SetStateAction<number>>;
	isGameRunning: boolean;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	time: number;
}) => {
	return (
		<div className={style['game-settings-container']}>
			<GameTimer
				isGameRunning={isGameRunning}
				time={time}
				setTime={setTime}
			/>
			<GameHistory turns={turns} setCurrentTurn={setCurrentTurn} />
		</div>
	);
};

export default GameSettings;
