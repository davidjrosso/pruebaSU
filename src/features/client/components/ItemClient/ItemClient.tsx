"use client";

import { Delete, Edit } from "@mui/icons-material";
import {
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
import { MouseEventHandler, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { IClient } from "../../models/Client";
import DeleteDialog from "@/features/shared/components/dialog/DelectDialog";
import { QueryClientService } from "../../services/clientQuery/clientQuery.services";
import { ClientMutationServices } from "../../services/clientMutation/clientMutation";
import FormClientComponent from "../FormClient/FormClient";
import { useToast } from "@/features/shared/components/toast/ToastProvider";


type Props = {
  client: IClient;
  buttonAction?: boolean;
};

function ItemClient(props: Props) {
  const { data, error, loading, refetch } = useQuery(
    QueryClientService.clients
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteClient] = useMutation(ClientMutationServices.DeleteClient);
  const handleEdit = async () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDeleteDialogOpen(true);
  };

  const toastShow = useToast();

  const handleDeleteConfirmed: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    setIsDeleteDialogOpen(false);
    setShowAlert(true);
    console.log(props);
    await deleteClient({ variables: { id: props.client.id } });
    toastShow({
      message: "El cliente se ha sido eliminado correctamente",
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
          <Avatar src={props.client.image} alt={props.client.name} />
        </ListItemAvatar>
        <ListItemText
          primary={`Name: ${props.client.name} ${props.client.surname}`}
          secondary={
            <>
              <span>Email: {props.client.email}</span>
              <br />
              <span>Phone: {props.client.phone}</span>
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
        title="¿Está seguro que desea eliminar este cliente?"
        message="Se eliminará de forma permanente "
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogContent>
          <FormClientComponent
            client={props.client}
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
export default ItemClient;
