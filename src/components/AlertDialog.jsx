import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  handleClose,
  actionType,
  alertMsg,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose("decline")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("decline", actionType)}>No</Button>
          <Button onClick={() => handleClose("ok", actionType)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
