import styled from "styled-components";
import { motion } from "framer-motion";
import { ThemeColors } from "util/theme";

const ContentBase = styled.div`
  position: absolute;
  margin: 0 10px;
  z-index: 2;

  #panel {
    display: flex;
    padding: 6px 10px;
    background: rgba(0, 0, 0, 0.6);
    filter: drop-shadow(0px 0px 37px rgba(7, 46, 91, 0.8));
  }

  #contents-container {
    max-height: 80vh;
    max-width: 1100px;
    padding: 20px;

    overflow-y: auto;
    z-index: 1;

    border: 1px solid rgba(0, 0, 0, 0.3);
    backdrop-filter: grayscale(0.3) contrast(1) blur(40px) opacity(0.8);

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: ${ThemeColors.PRUSSIAN_BLUE};
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.primary.light};
    }
  }
`;

export const MotionContentBase = motion(ContentBase);
