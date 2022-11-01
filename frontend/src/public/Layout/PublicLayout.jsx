import { Box, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useMessage } from "../../hooks";

import { Navbar } from "../components";
import { setTypeMessage } from "../../helpers";
import alertify from "alertifyjs";

export const PublicLayout = ({ children }) => {
  const { text, type, clearAllMessage } = useMessage();

  useEffect(() => {
    if (!!text && !!type) {
      alertify.set("notifier", "position", "top-right");
      const showMessage = setTypeMessage(type, text);
      showMessage();
      clearAllMessage();
    }
  }, [text]);

  return (
    <>
      <Navbar />
      <Box component="" sx={{ p: 3 }} className="">
        <Toolbar />
        {children}
      </Box>
    </>
  );
};
