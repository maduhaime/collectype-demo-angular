/**
 * Capitalizes the first letter of a string while keeping the rest unchanged
 * @param str - The string to capitalize
 * @returns A new string with the first character uppercased
 *
 * @example
 * capitalize('hello') // 'Hello'
 * capitalize('WORLD') // 'WORLD'
 * capitalize('javaScript') // 'JavaScript'
 * capitalize('') // ''
 * capitalize('a') // 'A'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Adds padding to the left of a value that can be converted to string
 * Uses the native padStart() method for optimal performance
 * @param value - Any value that has a toString() method
 * @param char - The character to use for padding
 * @param length - The total length the string should have after padding
 * @returns The padded string
 *
 * @example
 * padLeft(5, '0', 3) // '005'
 * padLeft('hello', ' ', 10) // '     hello'
 * padLeft(123, '0', 5) // '00123'
 * padLeft(true, '-', 6) // '--true'
 */
export function padLeft<T extends { toString(): string }>(value: T, char: string, length: number): string {
  return value.toString().padStart(length, char);
}
