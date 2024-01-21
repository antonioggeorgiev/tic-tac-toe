import { useEffect, useState } from 'react';
import GameGrid from './GameGrid';
import GameSettings from './GameSettings';
import { GamePlayer, GameStage } from '../models/game-models';
import { MAX_TURNS } from '../constants/game-constants';
import style from '../styles/shared.module.css';
const Game = () => {
	const [gameHistory, setGameHistory] = useState<GameStage[]>([
		Array(9).fill(undefined),
	]);
	const [currentTurn, setCurrentTurn] = useState(0);
	const [time, setTime] = useState(0);
	const isDraw = currentTurn === MAX_TURNS;
	const currentPlayer = currentTurn % 2 === 0 ? GamePlayer.X : GamePlayer.O;
	const calculateWinner = (squares: GameStage): GamePlayer | null => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			const squaresA = squares[a];
			const squaresB = squares[b];
			const squaresC = squares[c];
			if (squaresA && squaresA === squaresB && squaresA === squaresC) {
				return squaresA;
			}
		}
		return null;
	};

	const winner = calculateWinner(gameHistory[currentTurn]);
	const isGameRunning = gameHistory.length > 1 && !winner && !isDraw;
	console.log(isGameRunning, 33333333);
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
