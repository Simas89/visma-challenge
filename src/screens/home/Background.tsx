import styled from "styled-components";
import { motion } from "framer-motion";
import { ThemeColors } from "util/theme";
import { useStateSelector } from "state";
import { ViewMode } from "state/reducers/address";
import { useEffect, useState } from "react";
import { Nunito } from "common/typography";
import { flexCenter } from "common/css";

const Absolute = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const AbsoluteWrapper = styled(Absolute)`
  #intro-text {
    ${flexCenter()}
  }
  #gradient {
    background: radial-gradient(
      ${({ theme }) => theme.palette.primary.light},
      ${({ theme }) => theme.palette.primary.dark}
    );
  }

  #stripe-a {
    background-color: white;
    height: 120vh;
    top: -10vh;
  }

  #stripe-b {
    background-color: ${ThemeColors.SECONDARY};
    height: 120vh;
    top: -10vh;
    z-index: 1;
  }

  #stripe-c {
    background-color: white;
    height: 120vh;
    top: -10vh;
  }
`;

const MotionAbsolute = motion(Absolute);

export const Background = () => {
  const [isVirgin, setIsVirgin] = useState(true);
  const viewMode = useStateSelector(({ address }) => address.viewMode);

  const isForm = viewMode === ViewMode.FORM;

  useEffect(() => {
    if (viewMode === ViewMode.FORM) {
      setIsVirgin(false);
    }
  }, [viewMode]);

  return (
    <AbsoluteWrapper>
      <MotionAbsolute
        id="intro-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 1, 1, 0] }}
        transition={{ duration: 5 }}
      >
        <Nunito variant="h4" customcolor="white" weight="200">
          Visma challenge
        </Nunito>
      </MotionAbsolute>
      <MotionAbsolute
        id="gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 6 }}
      />
      <MotionAbsolute
        id="stripe-a"
        initial={{ x: "80vw", rotateZ: 20, width: 0 }}
        animate={{
          x: isForm ? "80vw" : "-2vw",
          rotateZ: 20,
          width: isVirgin ? 0 : "2vw",
        }}
        transition={{
          delay: isForm ? 0 : 1,
          type: "spring",
          stiffness: 20,
          damping: 10,
          restDelta: 0.001,
          restSpeed: 0.001,
        }}
      />
      <MotionAbsolute
        id="stripe-b"
        initial={{ x: "85vw", rotateZ: 20, width: 0 }}
        animate={{
          x: isForm ? "85vw" : "3vw",
          rotateZ: 20,
          width: isVirgin ? 0 : "4vw",
        }}
        transition={{
          delay: isForm ? 0.3 : 0.6,
          type: "spring",
          stiffness: 20,
          damping: 10,
          restDelta: 0.001,
          restSpeed: 0.001,
        }}
      />

      <MotionAbsolute
        id="stripe-c"
        initial={{ x: "95vw", rotateZ: 20, width: 0 }}
        animate={{
          x: isForm ? "95vw" : "13vw",
          rotateZ: 20,
          width: isVirgin ? 0 : "8vw",
        }}
        transition={{
          delay: isForm ? 0.6 : 0.3,
          type: "spring",
          stiffness: 20,
          damping: 10,
          restDelta: 0.001,
          restSpeed: 0.001,
        }}
      />
    </AbsoluteWrapper>
  );
};
