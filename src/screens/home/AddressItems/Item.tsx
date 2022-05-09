import { Nunito } from "common/typography";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import { actionIconStyle } from "common/styles";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ThemeColors } from "util/theme";
import useActionsAddress from "hooks/useActionsAddress";
import { ViewMode } from "state/reducers/address";
import { AddressItem } from "api/types";

import { elipsis, flexCenter } from "common/css";
import { ValidationStatus } from "../ValidationStatus";
import { Spacer } from "common/comps";

const StyledEditIcon = styled(EditIcon)`
  ${actionIconStyle(ThemeColors.STROKE)};
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 300px;
  overflow: hidden;
  padding: 20px;
  background: ${({ theme }) => theme.palette.primary.dark};

  .MuiSvgIcon-root {
    color: white;
    margin-right: 8px;
  }

  .value-field {
    display: flex;

    .elipsis-1 {
      ${elipsis()}
    }
    .elipsis-2 {
      ${elipsis(2)}
    }
  }

  #flex {
    ${flexCenter()}
    flex: 1;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: -25px;
  right: -20px;
`;

const MotionIconContainer = motion(IconContainer);

interface IItemProps {
  item: AddressItem;
}

export const Item: React.FC<IItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { setViewMode, setEditItemId } = useActionsAddress();
  return (
    <Div
      data-cy="item"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="value-field">
        <PersonIcon />
        <Nunito className="elipsis-1" customcolor="white" fontSize={16}>
          {item.name}
        </Nunito>
      </div>
      <Spacer xs={8} />
      <div className="value-field">
        <EmailIcon />
        <Nunito className="elipsis-1" customcolor="white" fontSize={16}>
          {item.email}
        </Nunito>
      </div>
      <Spacer xs={8} />
      <div className="value-field">
        <MapIcon />
        <Nunito className="elipsis-2" customcolor="white" fontSize={16}>
          {item.street} {item.houseNumber}, {item.city}, {item.zip}
        </Nunito>
      </div>
      <div id="flex">
        <ValidationStatus status={item.status} />
      </div>

      {item.geo && (
        <>
          <Nunito className="elipsis-1" customcolor="white">
            Lng: {item.geo.longitude}
          </Nunito>
          <Nunito className="elipsis-1" customcolor="white">
            Lat: {item.geo.latitude}
          </Nunito>
        </>
      )}

      <AnimatePresence>
        {isHovered && (
          <MotionIconContainer
            exit={{ opacity: 0, x: 0, y: 0 }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: -25,
              y: -25,
            }}
          >
            <StyledEditIcon
              data-cy="edit-form-button"
              onClick={() => {
                setViewMode(ViewMode.FORM);
                setEditItemId(item.id);
              }}
            />
          </MotionIconContainer>
        )}
      </AnimatePresence>
    </Div>
  );
};
