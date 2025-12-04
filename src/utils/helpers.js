export const stringUtils = {
  
  capitalize: (str = "") => str.charAt(0).toUpperCase() + str.slice(1),

 
  truncate: (text = "", maxLength = 100) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text,
};

const numberUtils = {
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

export const miscUtils = {
  delay: (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms)),

  generateId: (length = 8) =>
    Math.random().toString(36).substring(2, 2 + length),

  scrollToTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
};
