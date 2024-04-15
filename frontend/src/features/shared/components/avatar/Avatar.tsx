"use client";

import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AvatarEditor from "react-avatar-editor";

type AvatarType = "user" | "business" | "product" | "box" | "client";

interface IProfileFormProps {
  onChange: (data: any) => void;
  avatarType: AvatarType;
  defaultImage: string;
  resetKey: any;
}

function ProfileForm({
  onChange,
  avatarType,
  defaultImage,
  resetKey,
}: IProfileFormProps) {
  const [avatarSrc, setAvatarSrc] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null); // Cambia el estado de image a string
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    setImage(null);
  }, [resetKey]);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setAvatarSrc(file);
      onChange(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setOpen(true);
    }
  };

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImage();
      canvas.toBlob((blob:any) => {
        console.log(blob);
        if (blob) {
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            // Aquí ya está en base64
            let base64 = reader.result as string;
            onChange(base64);
            setAvatarSrc(new File([blob], "avatar.png"));
            setImage(base64); // Establece la imagen del avatar después de guardarla
            setOpen(false);
          };
        }
      }, "image/png");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          onClick={handleButtonClick}
          src={image || defaultImage} 
          alt="Profile"
          style={{ cursor: "pointer" }}
          sx={{
            m: 1,
            width: 64,
            height: 64,
            "&:hover $editButton, &:focus-within $editButton": {
              opacity: 1,
            },
          }}
          key={avatarSrc?.name}
        >
          {avatarType === "user" && <PersonIcon sx={{ color: "white" }} />}
          {avatarType === "business" && (
            <BusinessIcon sx={{ color: "white" }} />
          )}
          {avatarType === "product" && (
            <LocalMallIcon sx={{ color: "white" }} />
          )}
          {avatarType === "box" && <CheckBoxIcon sx={{ color: "white" }} />}
          {avatarType === "client" && (
            <AssignmentIndIcon sx={{ color: "white" }} />
          )}
        </Avatar>
        <input
          type="file"
          accept="image/*"
          onChange={handleClick}
          style={{
            display: "none",
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            cursor: "pointer",
            ...(!avatarSrc && { display: "none" }),
          }}
          ref={inputFileRef}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            {avatarSrc && (
              <AvatarEditor
                ref={(ref) => setEditor(ref)}
                image={avatarSrc}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                color={[255, 255, 255, 0.6]}
                scale={scale}
                rotate={0}
                onImageReady={() => {}}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ mr: 1 }}>
                <ZoomInIcon
                  onClick={() => setScale(scale + 0.1)}
                  sx={{ color: "#757575", "&:hover": { color: "#9e9e9e" } }}
                />
              </Box>
              <Box sx={{ mr: 0.2 }}>
                <ZoomOutIcon
                  onClick={() => setScale(scale - 0.1)}
                  sx={{ color: "#757575", "&:hover": { color: "#9e9e9e" } }}
                />
              </Box>
            </Box>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default ProfileForm;