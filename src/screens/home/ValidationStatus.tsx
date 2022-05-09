import { flexCenter } from "common/css";
import { Nunito } from "common/typography";
import styled from "styled-components";
import { ThemeColors } from "util/theme";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { AddressStatus } from "api/types";

const Div = styled.div`
  ${flexCenter()};

  .container {
    ${flexCenter("column")};

    .MuiSvgIcon-root {
      font-size: 40px;
    }
  }

  .valid {
    * {
      color: white !important;
    }
  }

  .not-validated {
    * {
      color: orange !important;
    }
  }

  .invalid {
    * {
      color: ${ThemeColors.ERROR} !important;
    }
  }
`;

interface IValidationStatusProps {
  status: AddressStatus;
}
export const ValidationStatus: React.FC<IValidationStatusProps> = ({
  status,
}) => {
  const contents = {
    [AddressStatus.VALID]: (
      <div data-cy="status-valid" className="container valid">
        <ThumbUpIcon />
        <Nunito>Address is valid!</Nunito>
      </div>
    ),
    [AddressStatus.NOT_VALIDATED]: (
      <div className="container not-validated">
        <QuestionMarkIcon />
        <Nunito>Address not validated</Nunito>
      </div>
    ),
    [AddressStatus.INVALID]: (
      <div className="container invalid">
        <PriorityHighIcon />
        <Nunito weight="bold">Address not found</Nunito>
      </div>
    ),
  };
  return <Div>{contents[status]}</Div>;
};
