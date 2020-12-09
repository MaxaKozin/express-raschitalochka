import React from 'react';
import { useSelector } from 'react-redux';
import HomeDesktop from './Desktop';
import HomeTablet from './Tablet';

export default function Home({ children }) {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isMobile = useSelector(state => state.isMobile);
  const isTablet = useSelector(state => state.isTablet);
  const isDesktop = !isMobile && !isTablet
  return (
    <>
      {isLoading ? (
        <div style={{ position: "absolute", top: 30, right: 30 }}>
          {" "}
          LOADING ...
        </div> // should be changed to loader-spinner
      ) : (isMobile ? (<h1>MOBILE</h1>)
        : (isTablet ? (<HomeTablet children={children} />)
          : (<HomeDesktop children={children} />)))
      }
    </>
  )
}
