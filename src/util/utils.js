/**
 * Extracts the category from the provided location object's pathname.
 *
 * @param {object} location - The location object representing the current URL.
 * @returns {string|undefined} - The extracted category from the URL path, or undefined if not found.
 */
export const categoryFromLocation = location => {
  // Attempt to match the category in the URL path using regular expressions
  const matchResult = location?.pathname?.match(/\/(?:docs\/)?([^/]+)(\/|$)/);

  // Extract the category from the match result, or set it as undefined if not found
  const categoryFromUrlPath = matchResult ? matchResult[1] : undefined;

  // Return the extracted category
  return categoryFromUrlPath;
};

// Helper function.
// Transforms kebab-case to camelCase
// e.g. tutorial-branding => tutorialBranding
const camelize = str => {
  const arr = str.split('-');
  const capitalize = (item, index) =>
    index > 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item;

  return arr.map(capitalize).join('');
};
