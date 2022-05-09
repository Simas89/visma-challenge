import { useMemo } from "react";
import { slice } from "state/reducers/address";
import { bindActionCreators } from "redux";
import { useStateDispatch } from "state";

const useActionsAddress = () => {
  const { actions } = slice;
  const dispatch = useStateDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );
};

export default useActionsAddress;
