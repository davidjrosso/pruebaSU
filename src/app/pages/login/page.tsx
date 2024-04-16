"use client";

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import style from "./styleFormLogin.module.css";
import { Card } from "@mui/material";
import { useForm } from "react-hook-form";
import { userMutationService } from "@/features/shared/services/userServices/userMutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

type Login = {
  email: string;
  password: string;
};

export default function FormLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [mutateFunction, { data, error, loading }] = useMutation(
    userMutationService.login
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (data && data.login.value) {
      localStorage.setItem("authToken", data.login.value);
      router.push("/pages/dashboard");
    }
  }, [data, router]);

  const onSubmit = handleSubmit((values) => {
    mutateFunction({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  });

  return (
    <div className={style.Body}>
      <Card sx={{ p: 5 }}>
        <img
          className={style.logoSocial}
          src="https://socialup.com.ar/wp-content/uploads/2021/11/logo-blanco-135x71.png"
          alt=""
        />
        <Box>
          <TextField
            id="email"
            label="Email"
            sx={{ m: 1, width: "25ch" }}
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
        </Box>
        <Box>
          <TextField
            id="password"
            sx={{ m: 1, width: "25ch" }}
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
        </Box>
        <Box>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={onSubmit}
          >
            Sign In
          </Button>
        </Box>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Grid>
          <Link
            sx={{ m: 1 }}
            className={style.forgotPassword}
            href="/pages/forgotPassword"
            variant="body2"
            color="#6b0040"
          >
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            sx={{ m: 1 }}
            href="/pages/register"
            variant="body2"
            underline="none"
            color="#6b0040"
          >
            Don't have an account?
          </Link>
          <Link
            href="/pages/register"
            variant="subtitle1"
            color="#92213c"
            underline="hover"
          >
            {"Sign Up"}
          </Link>
        </Grid>
      </Card>
    </div>
  );
}
