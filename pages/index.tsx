import styled from "styled-components";
import { flexCenter } from "common/css";
import AddressItems from "screens/home/AddressItems/AddressItems";
import AddressForm from "screens/home/AddressForm";
import { AnimatePresence } from "framer-motion";
import { useStateSelector } from "state";
import { ViewMode } from "state/reducers/address";
import { Background } from "screens/home";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { getLocalStorageItem, setLocalStorageItem } from "api/localStorage";
import { populateData } from "config/db";
import { motion } from "framer-motion";

const Div = styled.div`
  position: relative;
  overflow: hidden;

  #body {
    position: relative;
    z-index: 1;
    perspective: 2000px;
    height: 100vh;
    ${flexCenter()};
  }
`;

const Home = () => {
  const viewMode = useStateSelector(({ address }) => address.viewMode);

  useIsomorphicLayoutEffect(() => {
    const items = getLocalStorageItem();

    if (!items) {
      setLocalStorageItem(populateData);
      window.location.reload();
    }
  }, []);

  return (
    <Div>
      <Background />
      <motion.div
        id="body"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 5 }}
      >
        <AnimatePresence>
          {viewMode === ViewMode.DATA && <AddressItems />}
        </AnimatePresence>
        <AnimatePresence>
          {viewMode === ViewMode.FORM && <AddressForm />}
        </AnimatePresence>
      </motion.div>
    </Div>
  );
};

export default Home;
