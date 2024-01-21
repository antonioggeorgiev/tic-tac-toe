import { useState } from 'react';
import { GamePlayer, GameStatus } from '../models/game-models';
import classnames from 'classnames';
import style from '../styles/game-grid.module.css';

const GameCell = ({
	index,
	onCellClick,
	cell,
	currentPlayer,
	gameStatus,
}: {
	index: number;
	onCellClick: (cellIndex: number) => void;
	cell: GamePlayer | undefined;
	currentPlayer: GamePlayer;
	gameStatus: GameStatus;
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const shouldHaveHoverEffect =
		!cell && gameStatus !== GameStatus.Finished && isHovered;
	return (
		<button
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={(e) => {
				e.preventDefault();
				onCellClick(index);
			}}
			className={classnames(style['game-cell'], {
				[style['game-cell-active']]: shouldHaveHoverEffect,
			})}
		>
			{shouldHaveHoverEffect ? currentPlayer : cell}
		</button>
	);
};

export default GameCell;
