export enum GamePlayer {
	'X' = 'X',
	'O' = 'O',
}

export enum GameStatus {
	NotStarted,
	Running,
	Finished,
}

export type GameStage = (GamePlayer | undefined)[];
