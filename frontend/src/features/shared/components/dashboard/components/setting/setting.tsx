import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  LinearProgress,
  Stack,
} from "@mui/material";
import { IUser } from "@/app/model/user";
import FormRegister from "@/features/user/register";
import { useForm } from "react-hook-form";
import { getSessionServices } from "@/auth/services/session.service";
import { useMutation } from "@apollo/client";
import { userMutationService } from "@/features/shared/services/userServices/userMutation";
import { useToast } from "../../../toast/ToastProvider";


type Props = {
  user: IUser|undefined
  onClose?: () => void;
};
interface Settings {
  name: string;
  email: string;
  password: string;
}
export default function SettingsPanel (props:Props) {
//   const [updateUser]= useMutation (userMutationService.register);
//   const [idBusiness, setIdBusiness] = useState("");
//   const [showAlert, setShowAlert] = useState(false);
//   const {toastShow} = useToast();
// const {
//   register,
//   handleSubmit,
//   setValue,
//   reset,
//   formState:{errors},
// }=useForm<IUser>({
//   defaultValues:{
//     homeAddress: "",
//     id: "",
//     name: "",
//     surname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//     image: "",
//     address: "",
//     gender: "",
//     phone: "",
//   }
// });
// useEffect(()=>{if (props&&props.user){
//   setValue("name",props.user.name);
//   setValue("surname",props.user.surname);
//   setValue("image",props.user.image);
//   setValue("phone",props.user.phone);
// }},[props.user]);

// useEffect(() => {
//   if (getSessionServices("business") == null) {
//     console.log("no hay business");
//   } else {
//     const business_id = getSessionServices("business");
//     console.log(business_id)
//     if (business_id !== null) {
//       setIdBusiness(business_id);
//     }
//   }
// }, []);


  const initialSettings: Settings = {
    name: "Agustin Sala",
    email: "prueba@prueba.com",
    password: "",
  };

  const [settings, setSettings] = useState<Settings>(initialSettings    );
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageChange = () => {
//     const file = fileInputRef.current?.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImageUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const onUpdate = handleSubmit ( async (values)=>{
//    if (!props.user) return;
//    await updateUser({
//     variables:{
//       name:values.name,
//       surname:values.surname,
//       phone:values.phone,
//       image:values.image,      
//     },
//    });
//   });
//   if (props.onClose) props.onClose();
//   setShowAlert(true)
//   toastShow({
//     message:"editaste correcvtamente",
//     severity:"success",
//   })
//   const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setSettings({ ...settings, [name]: value });
//   };

  const saveSettings = () => {
    // Lógica para guardar configuraciones (puedes hacer una llamada a API aquí)
    console.log("Configuraciones guardadas:", settings);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        margin: "center",
        maxWidth: "800px",
        marginTop: "60px",
        marginLeft: "400px",
      }}
    >
      <Paper
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        
        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-bold">Perfil</h2>
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
          >
            Subir Imagen
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            // onChange={handleImageChange}
          />
          <TextField
            value={props.user?.image ? props.user.image:"" }
            style={{ marginBottom: "15px" }}
            label="Selecciona una imagen"
            variant="outlined"
            // value={imageUrl}
            onClick={() => {
              fileInputRef.current?.click();
            }}
            fullWidth
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            // onChange={handleImageChange}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Imagen"
              style={{ marginTop: "20px", maxWidth: "100%" }}
            />
          )}
          <TextField
            style={{ marginBottom: "15px" }}
            label="Name"
            variant="outlined"
            name="name"
            value={settings.name}
            // onChange={handleSettingsChange}
            fullWidth
          />
          <TextField
            style={{ marginBottom: "15px" }}
            label="Email"
            variant="outlined"
            name="email"
            value={settings.email}
            // onChange={handleSettingsChange}
            fullWidth
          />
          <TextField
            style={{ marginBottom: "15px" }}
            label="Password"
            variant="outlined"
            name="password"
            value={settings.password}
            // onChange={handleSettingsChange}
            fullWidth
          />
          <TextField
            style={{ marginBottom: "15px" }}
            label="New Password"
            variant="outlined"
            name="new password"
            value={settings.password}
            // onChange={handleSettingsChange}
            fullWidth
          />

          <Button variant="contained" onClick={saveSettings}>
            Save
          </Button>
        </div>
      </Paper>
      <Paper
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-bold">Notificaciones</h2>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
          </Stack>
        </div>
      </Paper>
      <Paper
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-bold">Ajustes</h2>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
          </Stack>
        </div>
      </Paper>
    </Box>
  );
};




