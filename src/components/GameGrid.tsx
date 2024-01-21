import { GamePlayer, GameStage, GameStatus } from '../models/game-models';
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
	gameStatus,
}: {
	gameStage: GameStage;
	currentTurn: number;
	currentPlayer: GamePlayer;
	onCellClick: (cellIndex: number) => void;
	winner: GamePlayer | null;
	restartGame: () => void;
	isDraw: boolean;
	gameStatus: GameStatus;
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
				gameStatus={gameStatus}
			/>
			<div className={style['game-grid']}>
				{gameStage.map((cell, index) => (
					<GameCell
						key={index}
						index={index}
						onCellClick={onCellClick}
						cell={cell}
						currentPlayer={currentPlayer}
						gameStatus={gameStatus}
					/>
				))}
			</div>
			{gameStatus === GameStatus.Finished && (
				<GameRestartButton restartGame={restartGame} />
			)}
		</div>
	);
};

export default GameGrid;
