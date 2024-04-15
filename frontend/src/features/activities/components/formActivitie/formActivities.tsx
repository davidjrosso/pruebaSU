"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { IActivities } from "../../model/Activitie";
import { useMutation, useQuery } from "@apollo/client";
import { MutationActivitie } from "../../service/ActivitiesMutation/MutationActivities";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import FormControlUser from "@/features/shared/components/FormControl/UserSelector";
import BusinessClientSelector from "@/features/shared/components/FormControl/BusinessClientSelector";
import BusinessClientProjectSelector from "@/features/shared/components/FormControl/BusinessClientProjectSelector";
import { IClient } from "@/features/client/models/Client";
import { IProject } from "@/features/project/model/project";
import { QueryActivities } from "../../service/ActivitiesQuery/QueryActivitie";

type Props = {
  id: any;
  activitie: IActivities | undefined;
  project: IProject | undefined;
  client: IClient | undefined;
  onClose?: () => void;
};
export default function ActivityForm(props: Props) {

  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");


  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IActivities>({
    defaultValues: {
      name: "",
      description: "",
      projectId: "",
      clientId: "",
      tiempoEstimado: "",
    },
  });

  const { data, refetch } = useQuery(QueryActivities.GetActivities);
  const { toastShow } = useToast();
  useEffect(() => {
    if (props && props.activitie) {
      console.log(props)
      setIsEditing(true);
      setValue("name", props.activitie.name);
      setValue("description", props.activitie.description);
      setValue("tiempoEstimado", props.activitie.tiempoEstimado);
      setSelectedUser(props.activitie.user);
      setSelectedClientId(props.client!.id);
      setSelectedProjectId(props.project!.id);
      
    }
  }, [props.activitie]);

  const [CreateAvtivitie] = useMutation(MutationActivitie.createActivitie);
  const [UpdateActivitie] = useMutation(MutationActivitie.updateActivitie);

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    await CreateAvtivitie({
      variables: {
        name: values.name,
        description: values.description,
        project: selectedProjectId,
        client: selectedClientId,
        user: selectedUser.toString(),
        tiempoEstimado: values.tiempoEstimado,
      },
    });
    reset({});
    setSelectedClientId("");
    setSelectedProjectId("");
    toastShow({
      message: "Actividad ha sido creado correctamente",
      severity: "success",
    });
   
    refetch();
  });
  const onUpdate = handleSubmit(async (values) => {
    if (!props.activitie) return;
    await UpdateActivitie({
      variables: {
        id: props.activitie._id,
        name: values.name,
        description: values.description,
        project: selectedProjectId,
        client: selectedClientId,
        user: selectedUser.toString(),
        tiempoEstimado: values.tiempoEstimado,
      },
    });
    console.log(values);
    if (props.onClose) props.onClose();
    setShowAlert(true);
    toastShow({
      message: "Actividad ha sido editado correctamente",
      severity: "success",
    });

    toastShow({
      message: "Error al crear la actividad",
      severity: "error",
    });
    refetch();
  });


  const handleProjectChange = (projectId: string) => {
    // Puedes realizar acciones adicionales al cambiar el proyecto, si es necesario
    console.log("Proyecto seleccionado:", projectId);
    setSelectedProjectId(projectId);
  };
  return (
    <Box
      className="bg-blue-500 text-white p-4"
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ textAlign: "center", alignItems: "center", pb: 1 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Nueva Actividad
        </Typography>

        <FormControl sx={{ m: 1, width: "100ch" }}>
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "100ch" }}
            label="Nombre de la actividad"
            variant="outlined"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Este campo es obligatorio</span>}
          <BusinessClientSelector
            onSelectedChange={(value) => {
              setSelectedClientId(value);
            }}
          />
          <BusinessClientProjectSelector
            onSelectedChange={(value) => {
              handleProjectChange(value);
            }}
          />
          <FormControlUser setSelectedUser={setSelectedUser} />
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "100ch" }}
            label="Descripción"
            multiline
            rows={4}
            {...register("description", { required: true })}
            {...(errors.description?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            sx={{ m: 1, width: "100ch" }}
            label="Tiempo Estimaddo"
            variant="outlined"
            type="text"
            {...register("tiempoEstimado", { required: true })}
            {...(errors.tiempoEstimado?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
          />
          {!isEditing ? (
            <Button
              className="bg-blue-500 text-white p-2 mt-4"
              sx={{ width: "47.7ch", m: 1 }}
              type="submit"
              onClick={onSubmit}
              variant="contained"
            >
              Register
            </Button>
          ) : (
            <Button
              className="bg-blue-500 text-white p-2 mt-4"
              sx={{ width: "47.7ch", m: 1 }}
              type="submit"
              onClick={onUpdate}
              variant="contained"
            >
              Guardar
            </Button>
          )}
        </FormControl>
      </Card>
    </Box>
  );
}
