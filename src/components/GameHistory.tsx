import GameHeader from './GameHeader';
import sharedStyle from '../styles/shared.module.css';
import { createArray } from '../utility/create-array.utility';
import classnames from 'classnames';
import style from '../styles/game-settings.module.css';

const GameHistory = ({
	turns,
	setCurrentTurn,
}: {
	turns: number;
	setCurrentTurn: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div
			className={classnames(
				sharedStyle['game-item-container'],
				style['game-history-container']
			)}
		>
			<GameHeader text="Game History" />
			<div className={style['game-turns-history-container']}>
				{createArray(turns).map((turn, index) => (
					<button
						className={classnames(
							sharedStyle['game-button'],
							style['game-turn-button']
						)}
						key={index}
						onClick={(e) => {
							e.preventDefault();
							setCurrentTurn(turn);
						}}
					>
						Go to turn {turn}
					</button>
				))}
			</div>
		</div>
	);
};

export default GameHistory;
