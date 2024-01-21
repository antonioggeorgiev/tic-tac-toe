import { useEffect, useState } from 'react';
import sharedStyle from '../styles/shared.module.css';
import style from '../styles/game-settings.module.css';
import { parseTime } from '../utility/parse-time.utility';
import classnames from 'classnames';
import { GameStatus } from '../models/game-models';

const GameTimer = ({ gameStatus }: { gameStatus: GameStatus }) => {
	const [time, setTime] = useState(0);

	useEffect(() => {
		let interval: NodeJS.Timer | undefined;
		if (gameStatus === GameStatus.NotStarted) {
			setTime(0);
		} else if (gameStatus === GameStatus.Running) {
			interval = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [gameStatus, setTime]);

	return (
		<div
			className={classnames(
				sharedStyle['game-item-container'],
				style['game-timer-container']
			)}
		>
			{parseTime(time)}
		</div>
	);
};

export default GameTimer;
