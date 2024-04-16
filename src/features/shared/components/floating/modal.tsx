import React, { ReactNode, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;

  content: ReactNode;
}

export default function Modal({ open, onClose, content }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
