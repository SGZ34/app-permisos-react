import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setError, setSuccess, setWarning } from "../store";
export const useMessage = () => {
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const setSuccessMessage = (text) => {
    dispatch(setSuccess(text));
  };

  const setWarningMessage = (text) => {
    dispatch(setWarning(text));
  };

  const setErrorMessage = (text) => {
    dispatch(setError(text));
  };

  const clearAllMessage = () => {
    dispatch(clearMessage());
  };

  return {
    ...message,
    setSuccessMessage,
    setWarningMessage,
    setErrorMessage,
    clearAllMessage,
  };
};
