import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate, useLocation } from 'react-router-dom';
import routeConstants from '../navigation/RouteConstants.json';
import logo from '../assets/logo.webp';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location
  const currentPath = location.pathname; // Get the current path from the location

  const isHomePage = currentPath === routeConstants.homeScreenPath;
  const isAboutUsPage = currentPath === routeConstants.aboutUsScreenPath;
  const isProductsPage = currentPath === routeConstants.productsScreenPath;

  const activeNavButtonClassName = "text-black-alpha-50 text-xl font-medium border-bottom-3 border-green-500 border-none";
  const normalNavButtonClassName = "text-black-alpha-50 text-xl font-medium";

  return (
    <>
      {
        <div className="align-items-center fixed flex justify-content-between py-3 top-0 w-full z-5 px-8">
          <div className=''>
            <img alt='Logo' className='cursor-pointer h-4rem' src={logo} onClick={() => navigate(routeConstants.homeScreenPath)} />
          </div>
          <div className='align-items-center flex gap-5 justify-content-center'>
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
                label="About Us"
                onClick={() => navigate(routeConstants.aboutUsScreenPath)}
                text
                className={isAboutUsPage ? activeNavButtonClassName : normalNavButtonClassName}
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
          </div>
          <div className='flex flex-2 justify-content-end pr-8'>
          </div>
        </div>
      }
    </>
  );
};

export default Navbar;
