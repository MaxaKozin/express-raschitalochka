import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
// import HomeDesktop from './Desktop';
// import HomeTablet from './Tablet';
// import HomeMobile from './Mobile';

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
          <div style={{ position: "absolute", top: 30, right: 30 }}>
            {" "}
            LOADING ...
          </div> // should be changed to loader-spinner
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
