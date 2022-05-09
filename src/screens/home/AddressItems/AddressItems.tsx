import styled from "styled-components";
import { ThemeColors } from "util/theme";
import { actionIconStyle } from "common/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useActionsAddress from "hooks/useActionsAddress";
import { useStateSelector } from "state";
import { ViewMode } from "state/reducers/address";
import { Item } from ".";
import { MotionContentBase } from "../MotionContentBase";
import { getLocalStorageItem } from "api/localStorage";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { useState } from "react";
import { AddressItem } from "api/types";

const AddIcon = styled(AddCircleOutlineIcon)`
  ${actionIconStyle(ThemeColors.STROKE)}
`;

const StyledMotionContentBase = styled(MotionContentBase)`
  display: grid;
  #contents-container {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(max(150px, 250px), 1fr));
  }
`;

interface IAddressItemsProps {}

const AddressItems: React.FC<IAddressItemsProps> = () => {
  const viewMode = useStateSelector(({ address }) => address.viewMode);
  const [items, setItems] = useState<AddressItem[]>([]);
  const { setViewMode, setEditItemId } = useActionsAddress();

  useIsomorphicLayoutEffect(() => {
    const storedItems = getLocalStorageItem();
    if (!!storedItems) {
      setItems(storedItems);
    }
  }, []);

  const variants = {
    initial: {
      opacity: 0,
      x: "-80vh",
      rotateY: -40,
    },
    anim: {
      opacity: 1,
      x: 0,
      rotateY: 0,
    },
  };

  return (
    <StyledMotionContentBase
      variants={variants}
      initial="initial"
      animate={viewMode === ViewMode.DATA ? "anim" : "initial"}
      exit="initial"
      transition={{
        type: "spring",
        restDelta: 0.01,
        stiffness: 150,
        damping: 32,
        mass: 3,
        delay: viewMode === ViewMode.DATA ? 0.3 : 0,
      }}
    >
      <div id="panel">
        <AddIcon
          data-cy="new-form-button"
          onClick={() => {
            setViewMode(ViewMode.FORM);
            setEditItemId(null);
          }}
        />
      </div>

      {!!items && (
        <div id="contents-container">
          {items.map((el) => (
            <Item key={el.id} item={el} />
          ))}
        </div>
      )}
    </StyledMotionContentBase>
  );
};

export default AddressItems;
