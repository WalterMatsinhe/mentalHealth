import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const Footer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // slow motion
    }
  }, []);

  return (
  <footer className="relative py-12 px-4 border-t-2 border-primary mt-12 pt-8 flex flex-col items-center overflow-hidden ">
      {/* Background Video */}


      <video
        className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-60"
        src="/binarywaterfall.mp4"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient Overlay */}
  <div className="absolute inset-0  z-0 pointer-events-none" />

      {/* Footer Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-bold text-primary drop-shadow">WalterMatsinhe.co</span>
          <p className="text-md text-primary">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex gap-4 items-center">
          <a href="mailto:waltermatsinhe@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-primary"><Mail size={30} /></a>
          <a href="https://github.com/WalterMatsinhe" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-primary"><Github size={30} /></a>
          <a href="https://linkedin.com/in/waltermatsinhe" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-primary"><Linkedin size={30} /></a>
        </div>
        <a
          href="#hero"
          className="group p-2 rounded-full bg-primary/10 hover:bg-primary/30 text-primary transition-colors shadow-lg border border-primary/30 animate-bounce"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
