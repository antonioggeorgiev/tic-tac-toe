import { useState } from 'react';
import { GamePlayer } from '../models/game-models';
import classnames from 'classnames';
import style from '../styles/game-grid.module.css';

const GameCell = ({
	index,
	onCellClick,
	cell,
	currentPlayer,
	winner,
}: {
	index: number;
	onCellClick: (cellIndex: number) => void;
	cell: GamePlayer | undefined;
	currentPlayer: GamePlayer;
	winner: GamePlayer | null;
}) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<button
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={(e) => {
				e.preventDefault();
				onCellClick(index);
			}}
			className={classnames(style['game-cell'], {
				[style['game-cell-active']]: !cell && !winner && isHovered,
			})}
		>
			{cell || (isHovered && !winner && currentPlayer)}
		</button>
	);
};

export default GameCell;
