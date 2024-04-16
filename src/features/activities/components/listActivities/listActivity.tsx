"use client";

import { useQuery } from "@apollo/client";
import { getSessionServices } from "@/auth/services/session.service";
import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  Typography,
} from "@mui/material";
import router from "next/router";
import SearchAppBar from "@/features/shared/components/search/search";
import { useEffect, useState } from "react";
import { IActivities } from "../../model/Activitie";
import { QueryActivities } from "../../service/ActivitiesQuery/QueryActivitie";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemActivitie from "../itemActivitie/itemActivitie";
import activities from "@/app/pages/dashboard/activities/page";

export const ListActivitiesComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); //manejo de busqueda
  const [Activities, setActivities] = useState<IActivities[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    if (event.target.value == "") {
      let business = data.findUserBusiness[0];
      setActivities(business.Activities);
      return;
    }

    setActivities(
      Activities.filter((item: IActivities) => {
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase()))
          return item;
      })
    );
  };

  const { data, error, loading, refetch } = useQuery(
    QueryActivities.GetActivities,
    {
      onError: (error) => {
        console.log("Error al obtener las actividades:", error);
      },
    }
  );

  useEffect(() => {
    if (data) setActivities(data.findUserBusiness?.client?.project?.activitie);
    console.log(data); //manejo de busqueda
  }, [data]);
  const activities =
    data?.findUserBusiness?.[0]?.client?.[0]?.project?.[0]?.activitie;

  return (
    <Box
      className="bg-blue-500 text-white p-4"
      component="form"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: "auto",
      }}
    >
      <Card
        sx={{
          textAlign: "center",
          alignItems: "center",
          width: "80vh",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <SearchAppBar handleSearchChange={handleSearchChange} />
        </Box>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Lista de Actividades
        </Typography>
        <FormControl sx={{ alignItems: "center" }}>
          {data ? (
            (console.log(data),
            (
              <ListItems
                items={activities}
                renderItem={(item: IActivities) => (
                  <ItemActivitie activity={item} buttonAction={true} />
                )}
                handleItemClick={function (item: IActivities): IActivities {
                  if (typeof window !== "undefined")
                    localStorage.setItem("activities", item._id);
                  // router.push("/pages/createClient"); //redireccionar al dashboard
                  return item;
                  //handleItemDelete(item.id);
                }}
              ></ListItems>
            ))
          ) : (
            <CircularProgress />
          )}
        </FormControl>
      </Card>
    </Box>
  );
};

export default ListActivitiesComponent;
