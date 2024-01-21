import style from '../styles/game-header.module.css';

const GameHeader = ({ text }: { text: string }) => {
	return (
		<div className={style['game-header-row']}>
			<p>{text}</p>
		</div>
	);
};

export default GameHeader;
