import { Alert } from "@mui/material";
import { useAppContext } from "../context/AppContext";

const AlertComponent = () => {
  const { alertType, alertText } = useAppContext();
  return <Alert severity={alertType}>{alertText}</Alert>;
};
export default AlertComponent;
