export const stringUtils = {
  /**
   * Capitalize the first letter of a string
   * @param {string} str
   * @returns {string}
   */
  capitalize: (str = "") => str.charAt(0).toUpperCase() + str.slice(1),

  /**
   * Shorten a string to a specified length with ellipsis
   * @param {string} text
   * @param {number} maxLength
   * @returns {string}
   */
  truncate: (text = "", maxLength = 100) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text,
};

/**
 * Number / Price Utilities
 */
export const numberUtils = {
  /**
   * Format price with currency
   * @param {number} amount
   * @param {string} currency
   * @returns {string}
   */
  formatPrice: (amount = 0, currency = "BDT") => {
    if (isNaN(amount)) return `${currency}0`;
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  },
};

/**
 * Misc Utilities
 */
export const miscUtils = {
  /**
   * Simple delay function (useful for simulating API delay)
   * @param {number} ms
   * @returns {Promise<void>}
   */
  delay: (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Generate a random ID string
   * @param {number} length
   * @returns {string}
   */
  generateId: (length = 8) =>
    Math.random().toString(36).substring(2, 2 + length),

  /**
   * Scroll to top of the page smoothly
   */
  scrollToTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
};
