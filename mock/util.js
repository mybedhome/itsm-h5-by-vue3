module.exports = {
  delay: (timeout = 3000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  },
  getRandom: (len) => {
    const letters = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const arrs = letters.concat(nums);
    let str = '';
    for (let i = 0; i < len; i++) {
      str += arrs[parseInt(Math.random() * arrs.length)];
    }
    return str;
  },
};
