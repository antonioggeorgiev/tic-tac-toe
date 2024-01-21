export const parseTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const paddedMinutes = String(minutes).padStart(2, '0');
	const paddedSeconds = String(seconds).padStart(2, '0');

	return `${paddedMinutes}:${paddedSeconds}`;
};
