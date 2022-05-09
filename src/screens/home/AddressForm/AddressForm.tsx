import { useState } from "react";
import styled from "styled-components";
import { ThemeColors } from "util/theme";
import { actionIconStyle } from "common/styles";
import useActionsAddress from "hooks/useActionsAddress";
import { useStateSelector } from "state";
import { ViewMode } from "state/reducers/address";
import { MotionContentBase } from "../MotionContentBase";
import { MuiButton, MuiTextField } from "common/comps/form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spacer } from "common/comps";
import { ValidationStatus } from "../ValidationStatus";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { getGeoLoc } from "api/serverSide";
import { Nunito } from "common/typography";
import { GeoType, AddressStatus, AddressItem } from "api/types";
import { idGen } from "util/idGen";
import { getLocalStorageItem, setLocalStorageItem } from "api/localStorage";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";

const CancelIcon = styled(HighlightOffIcon)`
  ${actionIconStyle(ThemeColors.STROKE)};
`;

const BinIcon = styled(DeleteIcon)`
  ${actionIconStyle(ThemeColors.SECONDARY)};
`;

const StyledMotionContentBase = styled(MotionContentBase)`
  position: relative;
  flex: 1;
  max-width: 450px;

  form {
    display: flex;
    flex-direction: column;

    .double-input {
      display: flex;
    }

    ${({ theme }) => theme.breakpoints.down("sm")} {
      .double-input {
        flex-direction: column;
      }
    }
  }
`;

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[aA-žŽ\s]+$/, "Only alphabets are allowed")
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  city: Yup.string().required("Required"),
  street: Yup.string().required("Required"),
  houseNumber: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
});

interface IAddressFormProps {}

const AddressForm: React.FC<IAddressFormProps> = ({}) => {
  const editItemId = useStateSelector(({ address }) => address.editItemId);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [status, setStatus] = useState<AddressStatus>(
    AddressStatus.NOT_VALIDATED
  );
  const [isValidating, setIsValidating] = useState(false);
  const [validationErr, setValidationErr] = useState("");
  const [geo, setGeo] = useState<GeoType | null>(null);
  const { setViewMode } = useActionsAddress();
  const viewMode = useStateSelector(({ address }) => address.viewMode);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (val) => {
      const updatedStatus = dirty ? AddressStatus.NOT_VALIDATED : status;
      const updatedGeo = dirty ? null : geo;
      const item = {
        ...val,
        status: updatedStatus,
        geo: updatedGeo,
        id: editItemId || idGen(),
      };

      const items = getLocalStorageItem();

      if (!!items) {
        if (editItemId) {
          const idx = items.findIndex((el) => el.id === editItemId);
          items.splice(idx, 1, item);
          setLocalStorageItem(items);
        } else {
          items.push(item);
          setLocalStorageItem(items);
        }
      } else {
        setLocalStorageItem([item]);
      }

      setViewMode(ViewMode.DATA);
    },
    validateOnMount: true,
    enableReinitialize: true,
  });

  useIsomorphicLayoutEffect(() => {
    const items = getLocalStorageItem();
    if (editItemId && !!items) {
      const item = items.find((el: AddressItem) => el.id === editItemId);

      if (item) {
        setStatus(item.status);
        setGeo(item.geo);

        setInitialValues({
          name: item.name,
          email: item.email,
          city: item.city,
          street: item.street,
          houseNumber: item.houseNumber,
          zip: item.zip,
        });
      }
    }
  }, [editItemId, setInitialValues, setStatus, setGeo]);

  const variants = {
    initial: {
      opacity: 0,
      x: "80vh",
      rotateY: 40,
    },
    anim: {
      opacity: 1,
      x: 0,
      rotateY: 0,
    },
  };

  const handleValidate = () => {
    setIsValidating(true);
    const address = `${values.city}, ${values.street} ${values.houseNumber}, ${values.zip}`;

    getGeoLoc(address)
      .then((res) => {
        console.log("res", res);

        if (res.length == 1) {
          setStatus(AddressStatus.VALID);
          setGeo({ latitude: res[0].latitude, longitude: res[0].longitude });
        } else {
          setStatus(AddressStatus.INVALID);
          setGeo(null);
        }

        setInitialValues(values);
        setValidationErr("");
      })
      .catch((err) => {
        setValidationErr(err.message);
      })
      .finally(() => setIsValidating(false));
  };

  const handleDelete = () => {
    const items = getLocalStorageItem();
    if (!!items) {
      const idx = items.findIndex((el) => el.id === editItemId);

      items.splice(idx, 1);
      setLocalStorageItem(items);

      setViewMode(ViewMode.DATA);
    }
  };

  return (
    <StyledMotionContentBase
      variants={variants}
      initial="initial"
      animate={viewMode === ViewMode.FORM ? "anim" : "initial"}
      exit="initial"
      transition={{
        type: "spring",
        restDelta: 0.01,
        stiffness: 150,
        damping: 32,
        mass: 3,
        delay: viewMode === ViewMode.FORM ? 0.3 : 0,
      }}
    >
      <div id="panel">
        <CancelIcon onClick={() => setViewMode(ViewMode.DATA)} />
        {editItemId && (
          <>
            <Spacer xs={8} horizontal />
            <BinIcon data-cy="delete-item-button" onClick={handleDelete} />
          </>
        )}
      </div>

      <div id="contents-container">
        <form onSubmit={handleSubmit}>
          <MuiTextField
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Full Name"
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <Spacer xs={10} />
          <MuiTextField
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <Spacer xs={10} />
          <MuiTextField
            id="city"
            name="city"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
            placeholder="City"
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
          />
          <Spacer xs={10} />
          <MuiTextField
            id="street"
            name="street"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.street}
            placeholder="Street"
            error={Boolean(touched.street && errors.street)}
            helperText={touched.street && errors.street}
          />
          <Spacer xs={10} />
          <div className="double-input">
            <MuiTextField
              id="houseNumber"
              name="houseNumber"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.houseNumber}
              placeholder="House Number"
              error={Boolean(touched.houseNumber && errors.houseNumber)}
              helperText={touched.houseNumber && errors.houseNumber}
            />
            <Spacer xs={10} horizontal />
            <MuiTextField
              id="zip"
              name="zip"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.zip}
              placeholder="Zip"
              error={Boolean(touched.zip && errors.zip)}
              helperText={touched.zip && errors.zip}
            />
          </div>
          {isValid && (
            <>
              <Spacer xs={20} />
              <ValidationStatus
                status={dirty ? AddressStatus.NOT_VALIDATED : status}
              />

              {geo && !dirty && (
                <>
                  <Spacer xs={10} />
                  <Nunito customcolor="white">Lng: {geo.longitude}</Nunito>
                  <Nunito customcolor="white">Lat: {geo.latitude}</Nunito>
                </>
              )}
              <Spacer xs={10} />
              <MuiButton
                data-cy="validate-form"
                onClick={handleValidate}
                disabled={
                  isValidating ||
                  (!dirty && status !== AddressStatus.NOT_VALIDATED)
                }
              >
                Validate
              </MuiButton>
              {validationErr && (
                <Nunito
                  customcolor={ThemeColors.ERROR}
                  weight="bold"
                  align="center"
                >
                  {validationErr}
                </Nunito>
              )}
            </>
          )}

          <Spacer xs={20} />
          <MuiButton data-cy="submit-form" type="submit" disabled={!isValid}>
            Submit
          </MuiButton>
        </form>
      </div>
    </StyledMotionContentBase>
  );
};

export default AddressForm;
