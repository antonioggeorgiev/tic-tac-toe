import { useEffect } from 'react';
import sharedStyle from '../styles/shared.module.css';
import style from '../styles/game-settings.module.css';
import { parseTime } from '../utility/parse-time.utility';
import classnames from 'classnames';

const GameTimer = ({
	isGameRunning,
	setTime,
	time,
}: {
	isGameRunning: boolean;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	time: number;
}) => {
	useEffect(() => {
		let interval: NodeJS.Timer | undefined;
		if (isGameRunning) {
			setTime(0);
			interval = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isGameRunning, setTime]);

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
