"use client";

import { Delete, Edit } from "@mui/icons-material";
import React, {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEventHandler, useState } from "react";
import { IBusiness } from "../../model/business";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import DeleteDialog from "@/features/shared/components/dialog/DelectDialog";
import FormBusinessComponent from "../formBusiness/formBusiness";
import { businessQueryService } from "../../services/businessQuery";
import { businessMutationService } from "../../services/businessMutation";

type Props = {
  business: IBusiness;
  buttonAction?: boolean;
};

function ItemBusiness(props: Props) {
  const { data, error, loading, refetch } = useQuery(
    businessQueryService.FindUserBusiness
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [DeleteBusiness] = useMutation(businessMutationService.deleteBusiness);
  const handleEdit = async () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const { toastShow } = useToast();

  const handleDeleteConfirmed: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    setIsDeleteDialogOpen(false);
    setShowAlert(true);
    console.log(props);
    await DeleteBusiness({ variables: { id: props.business._id } });
    toastShow({
      message: "La empresa se ha sido eliminada correctamente",
      severity: "success",
    });
    refetch();
  };

  const handleCloseEditDialog = async () => {
    console.log(props);
    setIsEditDialogOpen(false);
  };

  return (
    <>
      {" "}
      <Box sx={{ width: "100%" }}>
        <ListItemAvatar>
          <Avatar src={props.business.image} alt={props.business.name} />
        </ListItemAvatar>
        <ListItemText
          primary={`Name: ${props.business.name}`}
          secondary={
            <>
            <span>Email: {props.business.email}</span>
            <br />
            <span>Phone: {props.business.phone}</span>
            <br />
            <span>Address: {props.business.address}</span>
            </>
            }
          primaryTypographyProps={{ sx: { color: "#000" } }}
        />
        {props.buttonAction == true ? (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            {" "}
            <IconButton
              edge="end"
              aria-label="editar"
              onClick={() => handleEdit()}
            >
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="eliminar" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        ) : null}
      </Box>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="¿Está seguro que desea eliminar esta empresa?"
        message="Se eliminará de forma permanente "
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogContent>
          <FormBusinessComponent
            business={props.business}
            onClose={() => {
              setIsEditDialogOpen(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default ItemBusiness;
