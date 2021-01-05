import { createReducer } from "@reduxjs/toolkit";
import { mobileResolution, tabletResolution } from "./resolution-actions";

export const isMobileReducer = createReducer(false, {
  [mobileResolution]: (_, { payload }) => payload,
});

export const isTabletReducer = createReducer(false, {
  [tabletResolution]: (_, { payload }) => payload,
});
