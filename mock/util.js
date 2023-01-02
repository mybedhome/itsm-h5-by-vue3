module.exports = {
  delay: (timeout = 3000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  },
};
