import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { AuroraText } from "@/components/magicui/aurora-text";

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact'} 
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        <div className='hidden md:flex space-x-14 flex-1 justify-center -ml-18 '>
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className='text-xl text-foreground/80 text-glow hover:text-primary transition-colors duration-300 hover:scale-115'
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Login/Register Buttons (Desktop) */}
        <div className='hidden md:flex space-x-4'>
          <Link to='/login' className='px-4 py-2 rounded border border-primary text-primary hover:bg-primary hover:text-background transition-colors duration-200'>
            Login
          </Link>
          <Link to='/register' className='px-4 py-2 rounded bg-primary text-background hover:bg-primary/80 transition-colors duration-200'>
            Register
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className='md:hidden p-2 text-foreground z-50'
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            'fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center',
            'transition-all duration-300 text-glow',
            isMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          )}
        >
          <div className='flex flex-col space-y-6 text-xl'>
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className='text-foreground/80 hover:text-primary transition-colors duration-300  '
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;