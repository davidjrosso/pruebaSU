"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  Box,
  TextField,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { IClient } from "../../models/Client";
import ProfileForm from "@/features/shared/components/avatar/Avatar";
import { getSessionServices } from "@/auth/services/session.service";
import { ClientMutationServices } from "../../services/clientMutation/clientMutation";
import { useToast } from "@/features/shared/components/toast/ToastProvider";
import { useQuery } from "@apollo/client";
import { QueryClientService } from "../../services/clientQuery/clientQuery.services";

const documentTypes = ["CUIT", "CUIL", "DNI"];

type Props = {
  client: IClient | undefined;
  onClose?: () => void;
};

export default function FormClientComponent(props: Props) {
  // Estado
  const [idBusiness, setIdBusiness] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [createClient] = useMutation(ClientMutationServices.CreateClient);
  const [updateClient] = useMutation(ClientMutationServices.UpdateClient);
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const buttonLabel = isEditing ? "Guardar" : "Register";
  const [resetImage, setResetImage] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Hooks
  const { toastShow } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IClient>({
    defaultValues: {
      name: "",
      image: "",
      city: "",
      address: "",
      email: "",
      phone: "",
      business: "",
      postCode: "",
      documentType: "",
      documentNumber: "",
      surname: "",
    },
  });

  const { data: queryData, refetch } = useQuery(
    QueryClientService.clients,
    {
      variables: {
        id: getSessionServices("business"),
      },
    }
  );

  // useEffect para establecer valores del formulario cuando cambia la propiedad del cliente
  useEffect(() => {
    if (props && props.client) {
      setIsEditing(true);
      setValue("name", props.client.name);
      setValue("surname", props.client.surname);
      setValue("city", props.client.city);
      setValue("address", props.client.address);
      setValue("email", props.client.email);
      setValue("phone", props.client.phone);
      setValue("postCode", props.client.postCode);
      setValue("documentType", props.client.documentType);
      setValue("documentNumber", props.client.documentNumber);
      setValue("image", props.client.image);
      setSelectedDocumentType(props.client.documentType);
    }
  }, [props.client]);

  // useEffect para establecer el ID del negocio desde la sesión
  useEffect(() => {
    const businessId = getSessionServices("business");
    if (businessId !== null) {
      setIdBusiness(businessId);
    }
  }, []);

  // Manejador de envío del formulario para la creación de cliente
  const onSubmit = handleSubmit(async (values) => {
    await createClient({
      variables: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        city: values.city,
        business: idBusiness,
        documentNumber: values.documentNumber,
        documentType: selectedDocumentType,
        postCode: values.postCode,
        address: values.address,
        phone: values.phone,
        image: values.image,
      },
    });
    reset({
      name: "",
      surname: "",
      email: "",
      city: "",
      documentNumber: "",
      postCode: "",
      address: "",
      phone: "",
      image: "",
      documentType: "",
    });
    setSelectedDocumentType("");
    setResetImage((actualValue) => !actualValue);
    if (props.onClose) props.onClose();
    setShowAlert(true);
    toastShow({
      message: "El Cliente ha sido creado correctamente",
      severity: "success",
    });
    refetch();
  });

  // Manejador de envío del formulario para la actualización de cliente
  const onUpdate = handleSubmit(async (values) => {
    if (!props.client) return;
    await updateClient({
      variables: {
        id: props.client.id,
        name: values.name,
        surname: values.surname,
        email: values.email,
        city: values.city,
        business: idBusiness,
        documentNumber: values.documentNumber,
        documentType: selectedDocumentType,
        postcode: values.postCode,
        address: values.address,
        phone: values.phone,
        image: values.image,
      },
    });
    formRef.current?.reset();
    if (props.onClose) props.onClose();
    setShowAlert(true);
    toastShow({
      message: "El cliente ha sido editado correctamente",
      severity: "success",
    });
    refetch();
  });

  return (
    <Box
      className="bg-blue-500 text-white p-4"
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      ref={formRef}
      alignContent={"center"}
    >
      <Card sx={{ textAlign: "center", alignItems: "center", pb: 1 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          {isEditing ? "Editar Cliente" : "Crear Cliente"}
        </Typography>
        <FormControl>
          <ProfileForm
            avatarType="client"
            onChange={(data: any): void => {
              setValue("image", data);
            }}
            defaultImage={props.client?.image ? props.client.image : ""}
            resetKey={resetImage}
          />
          <TextField
            className="w-1/2 p-2"
            id="Name"
            label="Name"
            sx={{ width: "43ch", m: 1 }}
            type="text"
            {...register("name", {
              required: true,
              minLength: 2,
            })}
            {...(errors.name?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.name?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            id="Surname"
            label="Surname"
            sx={{ width: "43ch", m: 1 }}
            type="text"
            {...register("surname", {
              required: true,
              minLength: 2,
            })}
            {...(errors.surname?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.surname?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <FormControl {...register("documentType")} className="w-1/2 p-2">
            <InputLabel>Document Type</InputLabel>
            <Select
              label="Document Type"
              sx={{ width: "43ch", m: 1 }}
              value={selectedDocumentType}
              onChange={(e) => setSelectedDocumentType(e.target.value)}
            >
              {documentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className="w-1/2 p-2"
            id="N°"
            label="N°"
            sx={{ width: "43ch", m: 1 }}
            type="text"
            {...register("documentNumber", {
              required: true,
              minLength: 2,
            })}
            {...(errors.documentNumber?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.documentNumber?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            id="Adress"
            label="Address"
            sx={{ width: "43ch", m: 1 }}
            type="text"
            {...register("address", {
              required: true,
              minLength: 2,
            })}
            {...(errors.address?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.address?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            id="Email"
            label="Email"
            sx={{ width: "43ch", m: 1 }}
            type="email"
            {...register("email", {
              required: true,
              minLength: 2,
              pattern: emailRegex,
            })}
            {...(errors.email?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.email?.type === "minLength" && {
              helperText: "El correo electrónico es demasiado corto",
              error: true,
            })}
            {...(errors.email?.type === "pattern" && {
              helperText: "Formato de correo electrónico inválido",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            id="Phone"
            label="Phone"
            sx={{ width: "43ch", m: 1 }}
            type="phone"
            {...register("phone", {
              required: true,
              minLength: 9,
            })}
            {...(errors.phone?.type === "required" && {
              helperText: "Campo Obligatorio",
              error: true,
            })}
            {...(errors.phone?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            id="City"
            label="City"
            sx={{ width: "43ch", m: 1 }}
            type="text"
            {...register("city", {
              required: true,
              minLength: 2,
            })}
            {...(errors.city?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.city?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <TextField
            className="w-1/2 p-2"
            id="Post Code"
            label="Post Code"
            sx={{ width: "43ch", m: 1 }}
            type="text"
            {...register("postCode", {
              required: true,
              minLength: 2,
            })}
            {...(errors.postCode?.type === "required" && {
              helperText: "Campo obligatorio",
              error: true,
            })}
            {...(errors.postCode?.type === "minLength" && {
              helperText: "El nombre es demasiado corto",
              error: true,
            })}
          />
          <Button
            className="bg-blue-500 text-white p-2 mt-4"
            type="submit"
            onClick={isEditing ? onUpdate : onSubmit}
            sx={{ width: "49.1ch", m: 1 }}
            variant="contained"
          >
            {isEditing ? "Guardar" : "Registrar"}
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
}
