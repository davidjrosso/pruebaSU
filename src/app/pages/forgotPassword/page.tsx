"use client"
import { Button, Card, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function FormForgotPassword () {
  const [email, setEmail] = useState("");

  
  const handleSubmit = (e: any) => {
    console.log("Ya se envio");
    alert("El E-mail se ha enviado");
  };

  return (
    <Card variant="outlined" sx={{margin:5}}>
     <Typography variant="h3" sx={{marginLeft:5,marginRight:5}}>Recuperar su contraseña</Typography>
    
     <Typography variant="body1" sx={{marginLeft:5,marginRight:5}}> Ingrese su Correo Electrónico para poder recibir las indicaciones para
          recuperar su Contraseña.</Typography>

      <FormControl onSubmit={handleSubmit} sx={{margin:5, width:"50%"}} >
          <TextField
           
            required
            id="outlined-required"
            label="E-mail"
            name="email"
            type="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <Button type="submit" variant="contained" sx={{marginTop:5}}>
            Enviar
          </Button>
          </div>
          
      </FormControl>
    </Card>
  );
};
