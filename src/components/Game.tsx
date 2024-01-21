import { useEffect, useState } from 'react';
import GameGrid from './GameGrid';
import GameSettings from './GameSettings';
import { GamePlayer, GameStage } from '../models/game-models';
import { MAX_TURNS } from '../constants/game-constants';
import style from '../styles/shared.module.css';
import { calculateWinner } from '../utility/calculate-winner.utility';
const Game = () => {
	const [gameHistory, setGameHistory] = useState<GameStage[]>([
		Array(9).fill(undefined),
	]);
	const [currentTurn, setCurrentTurn] = useState(0);
	const [time, setTime] = useState(0);
	const isDraw = currentTurn === MAX_TURNS;
	const currentPlayer = currentTurn % 2 === 0 ? GamePlayer.X : GamePlayer.O;

	const winner = calculateWinner(gameHistory[currentTurn]);
	const isGameRunning = gameHistory.length > 1 && !winner && !isDraw;

	const onCellClick = (cellIndex: number) => {
		const currentGameStage = gameHistory[currentTurn];
		if (currentGameStage[cellIndex] || winner) return;
		setGameHistory((prev) => {
			const newGameStage = [
				...prev[currentTurn].slice(0, cellIndex),
				currentPlayer,
				...prev[currentTurn].slice(cellIndex + 1),
			];
			return [...prev.slice(0, currentTurn + 1), newGameStage];
		});
	};

	const restartGame = () => {
		setGameHistory([Array(9).fill(undefined)]);
		setCurrentTurn(0);
		setTime(0);
	};

	useEffect(() => {
		setCurrentTurn(gameHistory.length - 1);
	}, [gameHistory]);

	return (
		<div className={style['game-container']}>
			<GameGrid
				isDraw={isDraw}
				gameStage={gameHistory[currentTurn]}
				currentPlayer={currentPlayer}
				currentTurn={currentTurn}
				onCellClick={onCellClick}
				winner={winner}
				restartGame={restartGame}
			/>
			<GameSettings
				turns={gameHistory.length - 1}
				setCurrentTurn={setCurrentTurn}
				isGameRunning={isGameRunning}
				setTime={setTime}
				time={time}
			/>
		</div>
	);
};

export default Game;
