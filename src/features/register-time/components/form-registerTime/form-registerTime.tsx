import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IRegisterTime } from "../../model/registerTime";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { businessQueryService } from "@/features/business/services/businessQuery";
import { useMutation, useQuery } from "@apollo/client";
import MultipleSelect from "@/features/shared/components/SelectorList/selectorList";
import { RegisterTimeServices } from "../service/registerTimeMutation/registerTimeMutation";
import { ProjectQueryService } from "@/features/project/projectService/projectQuery/projectQuery.service";

export default function FormRegisterTime() { const {
  register,
  handleSubmit,
  formState: { errors },
  control,
  setValue,
} = useForm<IRegisterTime>();

const { data, loading, error } = useQuery(ProjectQueryService.Project);

const [createRegisterTime] = useMutation(RegisterTimeServices.CreateRegisterTime);

const onSubmit: SubmitHandler<IRegisterTime> = async (data) => {
  // Lógica para calcular totalHours a partir de inicio y fin
  const totalHours = calcularTotalHoras(data.inicio, data.fin);

  // Llamar a la mutación GraphQL para crear el registro
  await createRegisterTime({
    variables: {
      proyect: data.proyect,
      activities: data.activities,
      date: data.date,
      inicio: data.inicio,
      fin: data.fin,
      descriptions: data.descriptions,
    },
  });

  // Limpiar campos del formulario
  setValue("proyect", "");
  setValue("activities", "");
  setValue("date", "");
  setValue("inicio", "");
  setValue("fin", "");
  setValue("descriptions", "");
  setValue("totalHours", totalHours);
};

// Función para calcular el total de horas entre dos horas dadas
const calcularTotalHoras = (inicio: string, fin: string): string => {
  const inicioDate = dayjs(inicio, "HH:mm");
  const finDate = dayjs(fin, "HH:mm");
  const diferenciaHoras = finDate.diff(inicioDate, "hour");
  const diferenciaMinutos = finDate.diff(inicioDate, "minute") % 60;
  return `${diferenciaHoras}:${diferenciaMinutos}`;
};

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

return (
  <Box sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  }}>
    <Card>
      <Typography variant="h3">Register Time</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          {/* <FormControl fullWidth>
            <InputLabel>Proyecto</InputLabel>
            <Controller
              render={({ field }) => (
                <Select {...field}>
                  {data.projects.map((project: any) => (
                    <MenuItem key={project.id} value={project.name}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
              name="proyect"
              rules={{ required: true }}
            />
          </FormControl> */}
        </Box>

        <Box>
          {/* <FormControl fullWidth>
            <InputLabel>Actividad</InputLabel>
            <Controller
              render={({ field }) => (
                <Select {...field}>
                  {data.activities.map((activity: any) => (
                    <MenuItem key={activity.id} value={activity.name}>
                      {activity.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
              name="activities"
              rules={{ required: true }}
            />
          </FormControl> */}
        </Box>

        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha"
              
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Hora de inicio"
              
            />
            <TimePicker
              label="Hora fin"
             
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <TextField
            label="Descripción"
            fullWidth
            {...register("descriptions", { required: true })}
          />
        </Box>

        <Box>
          <TextField
            label="Horas Totales"
            fullWidth
            {...register("totalHours", { required: true })}
            disabled
          />
        </Box>

        <Grid container justifyContent="center" alignItems="center" sx={{ p: "3%" }}>
          <Button type="submit" variant="contained">
            Enviar Registro
          </Button>
        </Grid>
      </form>
    </Card>
  </Box>
);
};

