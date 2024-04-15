"use client"
import React, { ReactNode, useState } from "react";
import Fab from "@mui/material/Fab";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import Modal from "./modal";

interface FloatingActionButtonsProps {
  modalContent: ReactNode;
}

export default function FloatingActionButtons({
  modalContent,
}: FloatingActionButtonsProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20 }}>
      <Fab
        style={{
          backgroundColor: "#F3F4F6",
          color: "black",
          width: "80px",
          height: "80px",
        }}
        aria-label="add"
        title="Add"
        onClick={handleOpenModal}
      >
        <AddCircleTwoToneIcon style={{ width: "80px", height: "80px" }} />
      </Fab>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        content={modalContent}
      />
    </div>
  );
}
