const { createAction } = require('@reduxjs/toolkit');

// export const getError = createAction('finance/getError');

export const getFinanceRequest = createAction('finance/getFinanceRequest');
export const getFinanceSuccess = createAction('finance/getFinanceSuccess');

export const addCostRequest = createAction('auth/addCostRequest');
export const addCostSuccess = createAction('auth/addCostSuccess');

export const addIncomeRequest = createAction('finance/addIncomeRequest');
export const addIncomeSuccess = createAction('finance/addIncomeSuccess');

export const addTransactionRequest = createAction(
  'finance/addTransactionRequest',
);
export const addTransactionSuccess = createAction(
  'finance/addTransactionSuccess',
);

export const updateTransactionRequest = createAction(
  'finance/updateTransactionRequest',
);
export const updateTransactionSuccess = createAction(
  'finance/updateTransactionSuccess',
);

export const deleteTransactionRequest = createAction(
  'finance/deleteTransactionRequest',
);
export const deleteTransactionSuccess = createAction(
  'finance/deleteTransactionSuccess',
);
