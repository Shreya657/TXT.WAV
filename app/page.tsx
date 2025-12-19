"use client";

import { useState, useEffect } from "react";
import { textToMorse, morseToText } from "./utils/morse";
import { textToBinary, binaryToText } from "./utils/binary";
import { asciiToText, textToAscii } from "./utils/ascii";
import { textToHex, hexToText } from "./utils/hex"; 
import { 
  CheckIcon, 
  ClipboardIcon, 
  XMarkIcon, 
  ArrowsUpDownIcon, 
  CodeBracketIcon 
} from "@heroicons/react/16/solid";

export default function Converter() {
  const [format, setFormat] = useState<"Binary" | "Morse" | "ASCII" | "Hex">("Binary");
  const [direction, setDirection] = useState<"English→Code" | "Code→English">("English→Code");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // real time conversion
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let result = "";
    const isEngToCode = direction === "English→Code";

    switch (format) {
      case "Morse":
        result = isEngToCode ? textToMorse(input) : morseToText(input);
        break;
      case "Binary":
        result = isEngToCode ? textToBinary(input) : binaryToText(input);
        break;
      case "ASCII":
        result = isEngToCode ? textToAscii(input) : asciiToText(input);
        break;
      case "Hex":
        result = isEngToCode ? textToHex(input) : hexToText(input);
        break;
    }
    setOutput(result);
  }, [input, format, direction]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSwap = () => {
    setDirection((prev) => (prev === "English→Code" ? "Code→English" : "English→Code"));
    setInput(output); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-600 to-black p-4 font-mono text-gray-200">
      
      <div className="w-full max-w-2xl bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
        
       
        <div className="p-6 border-b border-gray-700/50 bg-gray-800/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <CodeBracketIcon className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">TXT.WAV</h1>
          </div>

          <div className="relative group">
            <select
              className="appearance-none bg-gray-950 border border-gray-700 text-sm rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer hover:border-gray-600"
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
            >
              <option value="Binary">Binary</option>
              <option value="Morse">Morse</option>
              <option value="ASCII">ASCII</option>
              <option value="Hex">Hex</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-2">
          
          <div className="relative group">
            <div className="flex justify-between mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>{direction === "English→Code" ? "English Text" : `${format} Input`}</span>
              {input.length > 0 && <span>{input.length} chars</span>}
            </div>
            
            <textarea
              className="w-full p-4 bg-gray-950/50 border border-gray-700 rounded-xl resize-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600 h-32"
              placeholder={direction === "English→Code" ? "Type something..." : `Paste your ${format} code...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            
            {input && (
              <button
                onClick={() => setInput("")}
                className="absolute top-9 right-3 p-1 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative h-6 flex items-center justify-center">
             <div className="absolute inset-x-0 h-px bg-gray-700/50"></div>
             <button
               onClick={handleSwap}
               className="relative z-10 p-2 bg-gray-800 border border-gray-600 rounded-full text-gray-400 hover:text-white hover:border-blue-500 hover:bg-gray-700 transition shadow-lg group"
               title="Swap direction"
             >
               <ArrowsUpDownIcon className="w-5 h-5 transition-transform group-hover:rotate-180" />
             </button>
          </div>

          <div className="relative">
            <div className="flex justify-between mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>{direction === "English→Code" ? `${format} Output` : "English Result"}</span>
            </div>

            <textarea
              className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl resize-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all text-gray-300 h-32 font-mono text-sm leading-relaxed"
              readOnly
              placeholder="Translation appears here..."
              value={output}
            />

            {output && (
              <button
                onClick={handleCopy}
                className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-xs font-medium transition text-gray-300 hover:text-white"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}