export const textToBinary = (text: string) =>
{
 return  text
    .split("")
    .map(char => char.charCodeAt(0).toString(2))//charCodeAt gives ascii value and toString(2)=>convert to base 2(binary)
    .join(" ");

}

export const binaryToText = (binary: string) =>
{
  return binary
    .split(" ")
    .map(bin => String.fromCharCode(parseInt(bin, 2))) //parseInt(bin,2)=>convert base 2 to base 10 and then this->String.fromCharCode=>convert the decimal to english
    .join("");

}
