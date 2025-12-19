export const morseMap: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..",
  E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  " ": "/"
}; // morse code doesnt distinguish bw small/capital letter 

const reverseMorseMap = Object.fromEntries(
  Object.entries(morseMap).map(([k, v]) => [v, k])
);

export const textToMorse = (text: string) =>
{
  return text
    .toUpperCase()
    .split("")
    .map(char => morseMap[char] || "")
    .join(" ");

}

export const morseToText = (morse: string) =>
{
  return morse
    .split(" ")
    .map(code => reverseMorseMap[code] || "")
    .join("");

}
