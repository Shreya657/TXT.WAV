
export const textToAscii = (text: string) => {
  return Array.from(text) //Array.from() properly handles surrogate pairs
    .map((char) => char.codePointAt(0))  //codePointAt for all the unicode including emojis
    .join(" ");
};


export const asciiToText = (ascii: string) => {
  return ascii
    .split(" ")
    .map((num) => String.fromCodePoint(Number(num)))
    .join("");
};
