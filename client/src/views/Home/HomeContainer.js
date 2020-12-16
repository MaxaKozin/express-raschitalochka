import React from 'react';
import { useSelector } from 'react-redux';
import HomeDesktop from './Desktop';
import HomeTablet from './Tablet';
import HomeMobile from './Mobile';
import { Loader } from '../../components'

export default function Home({ children }) {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isMobile = useSelector(state => state.isMobile);
  const isTablet = useSelector(state => state.isTablet);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (isMobile ? (<HomeMobile children={children} />)
        : (isTablet ? (<HomeTablet children={children} />)
          : (<HomeDesktop children={children} />)))
      }
    </>
  )
}
