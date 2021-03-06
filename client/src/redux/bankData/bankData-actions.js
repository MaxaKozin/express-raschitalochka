import { createAction } from '@reduxjs/toolkit';

export const getBankDataRequest = createAction('bankData/getBankDataRequest');
export const getBankDataSuccess = createAction('bankData/getBankDataSuccess');
export const getBankDataError = createAction('bankData/getBankDataError');
