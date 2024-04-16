import { getSessionServices } from "@/auth/services/session.service";
import { useQuery } from "@apollo/client";
import { FormControl, InputLabel, Select, MenuItem, Avatar } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { UserQueryServices } from "../../services/userServices/useQuery";

interface FormControlUserProps {
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function FormControlUser({ setSelectedUser }: FormControlUserProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: userData, loading: userLoading, error: userError } = useQuery(UserQueryServices.getLoggedInUserInfo, {
    variables: {
      id: getSessionServices("business"),
    },
  });

  const user = userData?.getLoggedInUserInfo;

  return (
    <FormControl className="w-1/2 p-2">
      <InputLabel>Usuario</InputLabel>
      <Select
        className="p-1"
        label="Usuario"
        sx={{ m: 1, width: "41.7ch" }}
        {...(errors.user?.type === "required" && {
          helperText: "Campo Obligatorio",
          error: true,
        })}
        {...register("user")}
        onChange={(e) => {
          const selectedValue = e.target.value as string;
          setSelectedUser(selectedValue);
        }}
      >
        {user && (
          <MenuItem key={user.id} value={user.id}>
            {`${user.name} ${user.surname}`}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
