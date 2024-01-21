import { GamePlayer, GameStage } from '../models/game-models';
import GameCell from './GameCell';
import GameLabel from './GameLabel';
import sharedStyle from '../styles/shared.module.css';
import style from '../styles/game-grid.module.css';
import GameRestartButton from './GameRestart';
import classnames from 'classnames';

const GameGrid = ({
	gameStage,
	currentPlayer,
	currentTurn,
	onCellClick,
	winner,
	restartGame,
	isDraw,
}: {
	gameStage: GameStage;
	currentTurn: number;
	currentPlayer: GamePlayer;
	onCellClick: (cellIndex: number) => void;
	winner: GamePlayer | null;
	restartGame: () => void;
	isDraw: boolean;
}) => {
	return (
		<div
			className={classnames(
				sharedStyle['game-item-container'],
				style['game-grid-container']
			)}
		>
			<GameLabel
				currentPlayer={currentPlayer}
				currentTurn={currentTurn}
				winner={winner}
				isDraw={isDraw}
			/>
			<div className={style['game-grid']}>
				{gameStage.map((cell, index) => (
					<GameCell
						key={index}
						index={index}
						onCellClick={onCellClick}
						cell={cell}
						currentPlayer={currentPlayer}
						winner={winner}
					/>
				))}
			</div>
			{(winner || isDraw) && (
				<GameRestartButton restartGame={restartGame} />
			)}
		</div>
	);
};

export default GameGrid;
