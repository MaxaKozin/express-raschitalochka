import axios_bank_instance from '../../services/axios_bank_instance';
import { getBankDataRequest, getBankDataSuccess, getBankDataError } from './bankData-actions';
import { toast } from "react-toastify";

const getBankData = () => async dispatch => {
  dispatch(getBankDataRequest());
  try {
    const { data } = await axios_bank_instance.get();
    if (typeof data === 'string') {
      dispatch(getBankDataSuccess(null));
      return;
    }
    dispatch(getBankDataSuccess(data));
    toast.success('currency exchange rates loaded')
  } catch (error) {
    dispatch(getBankDataError())
    toast.error('Bank is not responded, currency exchange rates not loaded')
  }
};

export { getBankData };
