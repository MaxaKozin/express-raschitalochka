
import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Loader } from '../../components'

const HomeDesktop = lazy(() => import("./Desktop"));
const HomeTablet = lazy(() => import("./Tablet"));
const HomeMobile = lazy(() => import("./Mobile"));


export default function Home({ children }) {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isMobile = useSelector((state) => state.isMobile);
  const isTablet = useSelector((state) => state.isTablet);
  return (

    <Suspense fallback={<h2>Loading...</h2>}>
      <>
        {isLoading ? (
          <Loader />
        ) : isMobile ? (
          <HomeMobile children={children} />
        ) : isTablet ? (
          <HomeTablet children={children} />
        ) : (
          <HomeDesktop children={children} />
        )}
      </>
    </Suspense>
  );
}
