/**
 *
 * @template T
 * @param {Array<T>} array An array of elements based on the generic type T
 * @returns {T}
 */
export function getRandomElement(array) {
	const randomIndex = Math.floor(Math.random() * array.length)
	return array[randomIndex]
}
