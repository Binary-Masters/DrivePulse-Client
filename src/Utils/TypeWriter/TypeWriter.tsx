"use client";
import { Typewriter, useTypewriter, Cursor } from "react-simple-typewriter";

const TypeWriter = () => {
  const [text] = useTypewriter({
    words: [
      " Welcome To Our File Sharing Website",
      "You Can Share Your File",
      "You Can Store Your File",
      "This Website Will Be Helpfull",
    ],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 70,
  });
  return (
    <h1 className="mb-5 text-5xl font-bold">
      <span>{text}</span>
      <span>
            <Cursor/>
          </span>
    </h1>
  );
};

export default TypeWriter;
