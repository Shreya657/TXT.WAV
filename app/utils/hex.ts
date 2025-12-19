export const textToHex = (text: string): string => {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"))
    .join(" "); 
//1) convert to ascii 2) convert to base 16 
//padStart(2,"0")=>every code is at least 2 digits. if not suppose A then A->0A

};

export const hexToText = (hex: string): string => {
  return hex
    .trim()
    .split(" ")
    .map((h) => String.fromCharCode(parseInt(h, 16)))
    //hex is converted to ascii by parseInt(h,16) then string
    .join("");
};