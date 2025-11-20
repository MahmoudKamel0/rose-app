/**
 * Generates a simple consistent unique color based on a provided string.
 * Useful for avatars/user color badges.
 * @param {string} str - Input string (e.g. username)
 * @returns {string} Hex color string
 */
/**
 * Generates a consistent hexadecimal color code based on a given string.
 * The output color is deterministic: the same string always produces the same color.
 *
 * @param {string} input - The input string (e.g., username)
 * @returns {string} Hex color string (e.g., "#a1b2c3")
 */
export const generateUniqueColor = (input: string): string => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colorNumber = Math.abs(hash) % 0xffffff;
    const hexColor = colorNumber.toString(16).padStart(6, "0");
    return `#${hexColor}`;
};
