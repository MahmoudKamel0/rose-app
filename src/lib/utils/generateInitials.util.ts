/**
 * Generates initials from a string by taking the first character of each word
 * @function generateInitials
 *
 * Converts a space-separated string into initials by extracting the first
 * character from each word and combining them into a single uppercase string.
 * Useful for generating avatar initials or user display names.
 *
 * @param {string} string - The input string to generate initials from
 * @returns {string} The generated initials (concatenated first characters of each word)
 *
 * @example
 * ```typescript
 * generateInitials("John Doe") //=> Returns "J"
 * ```
 */
export const generateInitials = (string: string): string => {
    return string.charAt(0).toUpperCase();
};
