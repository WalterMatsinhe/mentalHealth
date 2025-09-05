import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { AuroraText } from "@/components/magicui/aurora-text";


const NavBarLogged = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed w-full z-40 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-background/80 backdrop-blur-md shadow-xs'
          : 'py-5'
      )}
    >

      <div className='container flex items-center justify-between'>
        <a href='#hero' className='text-sm md:text-2xl font-bold -md:13 bg-bglogo border-2 rounded-sm px-1 md:px-2 shadow-sm shadow-primary'>
          <span className="mental-title">MENTAL</span><AuroraText colors={["hsl(var(--primary))", "hsl(var(--primary-foreground))"]}>HEALTH</AuroraText>
        </a>
      </div>
    </nav>
  );
};

export default NavBarLogged;