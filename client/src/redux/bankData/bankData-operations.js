import axios_bank_instance from '../../services/axios_bank_instance';
import { getBankDataRequest, getBankDataSuccess } from './bankData-actions';

const getBankData = () => async dispatch => {
  dispatch(getBankDataRequest());
  try {
    const { data } = await axios_bank_instance.get();
    if (typeof data === 'string') {
      dispatch(getBankDataSuccess(null));
      return;
    }
    dispatch(getBankDataSuccess(data));
  } catch (error) {
    console.error(error);
  }
};

export { getBankData };
