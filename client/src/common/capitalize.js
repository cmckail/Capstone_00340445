/**
 * helper method to capitalize string.
 * Unforuntately didnt get to implement it across the board
 * @param {*} str 
 * @returns 
 */
export function capitalize(str) {
    if (typeof str !== "string") {
        return str
    }
    let [first, ...rest] = str
    return first.toUpperCase() + rest.join('').toLowerCase();
}