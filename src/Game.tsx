import { useEffect, useState } from 'react';
import style from './game.module.css';
import classnames from 'classnames';

function createArray(length: number) {
	const array = [];
	for (let i = 1; i <= length; i++) {
		array.push(i);
	}
	return array;
}

const MAX_TURNS = 9;
enum GamePlayer {
	'X' = 'X',
	'O' = 'O',
}
type GameStage = (GamePlayer | undefined)[];

const GameHeader = ({ text }: { text: string }) => {
	return (
		<div className={style['game-header-row']}>
			<p>{text}</p>
		</div>
	);
};

const GameLabel = ({
	winner,
	currentPlayer,
	isDraw,
}: {
	currentTurn: number;
	winner: GamePlayer | null;
	currentPlayer: GamePlayer;
	isDraw: boolean;
}) => {
	let message;
	if (winner) {
		message = `Player ${winner} won!`;
	} else if (isDraw) {
		message = 'Draw!';
	} else {
		message = `Player ${currentPlayer}'s turn`;
	}
	return <GameHeader text={message} />;
};

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
		<div className={style['game-grid-container']}>
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
				<button
					className={style['game-restart-button']}
					onClick={() => restartGame()}
				>
					Restart
				</button>
			)}
		</div>
	);
};

const GameHistory = ({
	turns,
	setCurrentTurn,
}: {
	turns: number;
	setCurrentTurn: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className={style['game-history-container']}>
			<GameHeader text="Game History" />
			<div className={style['game-turns-history-container']}>
				{createArray(turns).map((turn, index) => (
					<button
						className={style['game-turn-button']}
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

const parseTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const paddedMinutes = String(minutes).padStart(2, '0');
	const paddedSeconds = String(seconds).padStart(2, '0');

	return `${paddedMinutes}:${paddedSeconds}`;
};

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
		<div className={style['game-timer-container']}>{parseTime(time)}</div>
	);
};

const GameSettings = ({
	turns,
	setCurrentTurn,
	isGameRunning,
	time,
	setTime,
}: {
	turns: number;
	setCurrentTurn: React.Dispatch<React.SetStateAction<number>>;
	isGameRunning: boolean;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	time: number;
}) => {
	return (
		<div className={style['game-settings-container']}>
			<GameTimer
				isGameRunning={isGameRunning}
				time={time}
				setTime={setTime}
			/>
			<GameHistory turns={turns} setCurrentTurn={setCurrentTurn} />
		</div>
	);
};
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
