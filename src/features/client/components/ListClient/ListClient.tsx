"use client";

import { useQuery } from "@apollo/client";
import { IClient } from "../../models/Client";
import ItemClient from "../ItemClient/ItemClient";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import { QueryClientService } from "../../services/clientQuery/clientQuery.services";
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

export const ListClientComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); //manejo de busqueda
  const [Clients, setClients] = useState<IClient[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
 
    if (event.target.value == "") {
      let business = data.findUserBusiness[0]
      setClients(business.client);
      return;
    }

    setClients(
      Clients.filter((item: IClient) => {
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase()))
          return item;
      })
    );
  };

  const { data, error, loading, refetch } = useQuery(
    QueryClientService.clients,
    {
      variables: {
        id: getSessionServices("business"),
      },
    }
  );
  
  useEffect(() => {
     if (data) setClients(data.findUserBusiness?.client);
     console.log(data); //manejo de busqueda  
  }, [data]);
const clients= data?.findUserBusiness?.[0].client

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
          <SearchAppBar
            handleSearchChange={handleSearchChange}
          />


        </Box>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-xl text-center mb-4"
        >
          Lista de Clientes
        </Typography>
        <FormControl sx={{ alignItems: "center" }}> 
          {data ? (
            (console.log(data),
            (
              <ListItems
                items={clients}
                renderItem={(item: IClient) => (
                  <ItemClient client={item} buttonAction={true} />
                )}
                handleItemClick={function (item: IClient): IClient {
                  if (typeof window !== "undefined")
                    localStorage.setItem("clients", item.id);
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

export default ListClientComponent;
