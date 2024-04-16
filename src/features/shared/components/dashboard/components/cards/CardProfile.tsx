import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { businessQueryService } from "@/features/business/services/businessQuery";
import { useQuery } from "@apollo/client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

moment.locale("es");

export default function CardProfile() {
  const containerStyle = {
    height: "450px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra
  };
  const { data, error, loading } = useQuery(
    businessQueryService.FindUserBusiness,
    {
      variables: {
        id: "651727a345c77d9e21342a12",
      },
    }
  );
  console.log(data);
  const clients = data?.findUserBusiness[0]?.client;

  let contadorClients = 0;

  if (Array.isArray(clients)) {
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].status === "0") contadorClients++;
    }
  }
  console.log(error);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (data) {
      const calendarId = { id: data.findUserBusiness?.[0]?.googleCalendarId };
      const apiKey = "";
      const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const googleEvents = data.items.map(
            (item: {
              summary: any;
              start: { dateTime: string | number | Date };
              end: { dateTime: string | number | Date };
            }) => ({
              title: item.summary,
              start: new Date(item.start.dateTime),
              end: new Date(item.end.dateTime),
            })
          );
          setEvents(googleEvents);
        })
        .catch((error) => {
          console.error("Error al cargar eventos:", error);
        });
    }
  }, [data]);
  const localizer = momentLocalizer(moment);

  return (
    <>
      <Box
        width={400}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={1}>
          <div style={{ textAlign: "center" }}>
            <div>
              <Grid container>
                <Grid item xs={4}>
                  <div>
                    <Typography>22</Typography>
                    <Typography>Project</Typography>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <Typography>10</Typography>
                    <Typography>Client</Typography>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <Typography>{contadorClients}</Typography>
                    <Typography>Hours</Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div style={containerStyle}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <div>
            <Typography variant="h6"></Typography>
          </div>
        </Paper>
      </Box>
    </>
  );
}
