import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate, useLocation } from 'react-router-dom';
import routeConstants from '../navigation/RouteConstants.json';
import logo from '../assets/logo.webp';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = currentPath === routeConstants.homeScreenPath;
  const isAboutUsPage = currentPath === routeConstants.aboutUsScreenPath;
  const isProductsPage = currentPath === routeConstants.productsScreenPath;

  const activeNavButtonClassName = "text-black-alpha-50 text-base font-medium border-bottom-3 border-green-500 border-none";
  const normalNavButtonClassName = "text-black-alpha-50 text-base font-medium";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClassName = `align-items-center fixed flex justify-content-between py-3 top-0 w-full z-5 px-8 transition-all duration-300 ease-in-out ${
    isScrolled ? 'bg-white' : ''
  }`;

  const logoClassName = `cursor-pointer transition-all duration-300 ease-in-out ${isScrolled ? 'h-4rem' : 'h-5rem'}`;
  const numberButtonClassName = `app-background-linear border-round-3xl font-semibold px-4 py-3 text-white-alpha-90 border-none transition-all duration-300 ease-in-out ${
    isScrolled ? 'text-sm' : 'text-lg'
  }`;

  return (
    <>
      {
        <div className={navbarClassName}>
          <div className='pl-7'>
            <img alt='Logo' className={logoClassName} src={logo} onClick={() => navigate(routeConstants.homeScreenPath)} />
          </div>
          <div className='align-items-center flex flex-grow-1 gap-5 pl-6'>
            <div className=''>
              <Button
                label="Home"
                onClick={() => navigate(routeConstants.homeScreenPath)}
                text
                className={isHomePage ? activeNavButtonClassName : normalNavButtonClassName}
                style={{ transition: 'all 0.2s ease-in-out' }}
              />
            </div>
            <div className=''>
              <Button
                label="Products"
                onClick={() => navigate(routeConstants.productsScreenPath)}
                text
                className={isProductsPage ? activeNavButtonClassName : normalNavButtonClassName}
                style={{ transition: 'all 0.2s ease-in-out' }}
              />
            </div>
            <div className=''>
              <Button
                label="About Us"
                onClick={() => navigate(routeConstants.aboutUsScreenPath)}
                text
                className={isAboutUsPage ? activeNavButtonClassName : normalNavButtonClassName}
                style={{ transition: 'all 0.2s ease-in-out' }}
              />
            </div>
          </div>
          <div className='flex flex-2 justify-content-end pr-8'>
            <Button label="+91 84060 11111" text icon="pi pi-phone" className={numberButtonClassName} />
          </div>
        </div>
      }
    </>
  );
};

export default Navbar;