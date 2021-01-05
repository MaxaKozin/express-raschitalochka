import { mobileResolution, tabletResolution } from "./resolution-actions";

export const setIsMobile = (bool) => (dispatch) => {
  dispatch(mobileResolution(bool));
  dispatch(tabletResolution(!bool));
};

export const setIsTablet = (bool) => (dispatch) => {
  dispatch(tabletResolution(bool));
  dispatch(mobileResolution(!bool));
};

export const setIsDesktop = () => (dispatch) => {
  dispatch(tabletResolution(false));
  dispatch(mobileResolution(false));
};
