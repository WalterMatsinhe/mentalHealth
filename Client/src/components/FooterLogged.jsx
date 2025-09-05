import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { WordRotate } from "@/components/magicui/word-rotate";

const Footer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // slow motion
    }
  }, []);

  return (
    <footer className="relative py-12 px-4 border-t-2 border-primary mt-12 pt-8 ">
      <div className="flex flex-col items-center z-10 w-full">
        <div className="grid grid-cols-4 gap-8 w-full h-20 items-center">
          <div className="flex items-center justify-center h-full">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="group p-2 rounded-full bg-primary/10 hover:bg-primary/30 text-primary transition-colors shadow-lg border border-primary/30 animate-bounce"
              aria-label="Go back to previous page"
            >
              <ArrowUp
                size={28}
                className="group-hover:scale-110 transition-transform -rotate-90"
              />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center h-full gap-1 text-center">
            <span className="text-lg font-bold text-primary drop-shadow truncate">
              WalterMatsinhe.co
            </span>
            <p className="text-md text-primary truncate">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex items-center justify-center h-full">
            <WordRotate
              words={["Connect", "With", "Us"]}
              speed={1}
              className="text-2xl md:text-3xl font-semibold text-primary truncate"
            />
          </div>
          <div className="flex gap-6 items-center justify-end h-full">
            <a
              href="mailto:waltermatsinhe@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors text-primary flex items-center h-full"
            >
              <Mail size={32} />
            </a>
            <a
              href="https://github.com/WalterMatsinhe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors text-primary flex items-center h-full"
            >
              <Github size={32} />
            </a>
            <a
              href="https://linkedin.com/in/waltermatsinhe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors text-primary flex items-center h-full"
            >
              <Linkedin size={32} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
