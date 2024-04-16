"use client";

import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";


import { QueryActivities } from "../../service/ActivitiesQuery/QueryActivitie";
import { useMutation, useQuery } from "@apollo/client";
import { IActivities } from "../../model/Activitie";
import { MutationActivitie } from "../../service/ActivitiesMutation/MutationActivities";
import ActivityForm from "../formActivitie/formActivities";
import DeleteDialog from "@/features/shared/components/dialog/DelectDialog";
import { useToast } from "@/features/shared/components/toast/ToastProvider";

type Props = {
  activity: IActivities;
  buttonAction?: boolean;
};

function ItemActivitie(props: Props) {
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteActivitie] = useMutation(MutationActivitie.deleteActivitie);
  const handleEdit = async () => {
    setIsEditDialogOpen(true);
  };

  const { data, error, loading, refetch } = useQuery(
    QueryActivities.GetActivities,
    {
      variables: {
        idClient: props.activity.clientId,
        idProject: props.activity.projectId,
      },
    }
  );
  

  const clientDetails = data?.findUserBusiness[0].client[0];
  console.log(clientDetails)
  const projectDetails = data?.findUserBusiness[0].client[0].project[0];
  console.log(projectDetails)
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
    await deleteActivitie({ variables: { id: props.activity._id} });
    toastShow({
      message: "Actividad se ha eliminado correctamente",
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
        {/* <ListItemAvatar>
          <Avatar src={props.activity.image} alt={props.activity.name} />
        </ListItemAvatar> */}
        <ListItemText
          primary={`Name: ${props.activity.name} `}
          secondary={
            <>
              <span>Descripción: {props.activity.description}</span>
              <br />
              <span>Proyecto: {projectDetails.name}</span>
              <br />
              <span>
                Cliente:{clientDetails.name} {clientDetails.surname}
              </span>
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
        title="¿Está seguro que desea eliminar Actividad?"
        message="Se eliminará de forma permanente "
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogContent>
          <ActivityForm
            activitie={props.activity}
            client={clientDetails}
            project={projectDetails}
            id={undefined}
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
export default ItemActivitie;
