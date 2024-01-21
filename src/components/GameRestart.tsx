import classnames from 'classnames';
import sharedStyle from '../styles/shared.module.css';
import style from '../styles/game-grid.module.css';
const GameRestartButton = ({ restartGame }: { restartGame: () => void }) => {
	return (
		<button
			className={classnames(
				sharedStyle['game-button'],
				style['game-restart-button']
			)}
			onClick={() => restartGame()}
		>
			Restart
		</button>
	);
};

export default GameRestartButton;
