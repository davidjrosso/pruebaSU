"use client";
import { IUser } from "@/app/model/user";
import { userMutationService } from "@/features/shared/services/userServices/userMutation";
import { useMutation } from "@apollo/client";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../shared/components/toast/ToastProvider";
import {
  Box,
  Card,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ProfileForm from "../shared/components/avatar/Avatar";

type Props = {
  register: IUser | undefined;
  onClose?: () => void;
};

export default function FormRegister(props: Props) {
  const { toastShow } = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IUser>();
  const [resetKey, setResetKey] = useState(0);
  const [mutateFunction, { loading, error, data }] = useMutation(
    userMutationService.register
  );
  const router = useRouter();
  const onSubmit = handleSubmit(async (values) => {
    const response = await mutateFunction({
      variables: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      },
    });
    reset();
    toastShow({
      message: "El usuario ha sido creado correctamente",
      severity: "success",
    });
    if (response.data) {
      // User created successfully
      reset({
        name: "",
        phone: "",
        email: "",
        address: "",
        image: "",
      });
      setResetKey((prevKey) => prevKey + 1);
      toastShow({
        message: "El usuario ha sido creado correctamente",
        severity: "success",
      });
      router.push("/pages/login");
    }
    console.log(values);
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
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
        alignContent={"center"}
        onSubmit={onSubmit}
      >
        <Card sx={{ pb: 5, alignItems: "center" }}>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Registro
          </Typography>
          <ProfileForm
            avatarType="business"
            onChange={function (data: any): void {
              setValue("image", data);
            }}
            defaultImage={props.register?.image ? props.register.image : ""}
            resetKey={resetKey}
          />
          <FormControl sx={{ alignItems: "center" }}>
            <TextField
              id="name"
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
              id="surname"
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
              {...(errors.surname?.type === "minLenght" && {
                helperText: "El apellido es demasiado corto",
                error: true,
              })}
            />
            <TextField
              id="email"
              label="Email"
              sx={{ width: "43ch", m: 1 }}
              type="text"
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                minLength: 2,
              })}
              {...(errors.email?.type === "required" && {
                helperText: "Campo obligatorio",
                error: true,
              })}
              {...(errors.email?.type === "pattern" && {
                helperText: "Ingrese un email válido",
                error: true,
              })}
            />
            <TextField
              id="password"
              sx={{ width: "43ch", m: 1 }}
              type={showPassword ? "text" : "password"}
              label="Password"
              {...register("password", {
                required: true,
                minLength: 2,
              })}
              {...(errors.password?.type === "required" && {
                helperText: "Campo obligatorio",
                error: true,
              })}
              {...(errors.password?.type === "minLength" && {
                helperText: "La contraseña es demasiado corta",
                error: true,
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              sx={{ width: "43ch", m: 1 }}
              label="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                minLength: 2,
                validate: (value) => value === getValues("password"),
              })}
              {...(errors.confirmPassword?.type === "required" && {
                helperText: "Campo obligatorio",
                error: true,
              })}
              {...(errors.confirmPassword?.type === "validate" && {
                helperText: "Las contraseñas deben coincidir",
                error: true,
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              className="align-content:flex-start bg-blue-500 text-white"
              sx={{ width: "47.6ch", m: 1 }}
              type="submit"
              //onClick={onSubmit}
              //className={style.submit}
              variant="contained"
            >
              Register
            </Button>
          </FormControl>
        </Card>
      </Box>
    </>
  );
}
