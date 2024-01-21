export const createArray = (length: number) => {
	const array = [];
	for (let i = 1; i <= length; i++) {
		array.push(i);
	}
	return array;
};
