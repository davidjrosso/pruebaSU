"use client";

import { useQuery } from "@apollo/client";
import { IBusiness } from "../../model/business";
import { ListItems } from "@/features/shared/components/listItem/ListItem";
import ItemBusiness from "../itemBusiness/itemBusiness";
import { businessQueryService } from "../../services/businessQuery";
import { setSessionService } from "../../../../auth/services/session.service";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  Typography,
} from "@mui/material";
import SearchAppBar from "@/features/shared/components/search/search";
import { ReactNode, useEffect, useState } from "react";

export const ListBusiness = (props: IBusiness) => {
  const [searchQuery, setSearchQuery] = useState("");//manejo de busqueda  
  const [business, setBusiness] = useState<IBusiness[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    console.log(business);

    if (event.target.value == "") {
      let business = data.findUserBusiness[0]
      setBusiness(business.findUserBusiness);
      return;
    }

    setBusiness(
      business.filter((item: IBusiness) => {
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase()))
          return item;
      })
    );
  };

  const { data, error, loading, refetch } = useQuery(
    businessQueryService.FindUserBusiness
  );
  const router = useRouter();

  useEffect(() => {
    if (data) setBusiness(data.findUserBusiness); //manejo de busqueda 
  }, [data]);

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
          Lista de Empresas
        </Typography>

        <FormControl sx={{ alignItems: "center" }}>
          {data ? (
            <ListItems
              items={business}
              renderItem={(item: IBusiness) => (
                <ItemBusiness business={item} buttonAction={true} />
              )}
              handleItemClick={function (item: IBusiness): IBusiness {
                if (typeof window !== "undefined")
                  localStorage.setItem("business", item._id);
                // router.push("/pages/createClient"); //redireccionar al dashboard
                return item;
                //handleItemDelete(item.id);
              }}
            ></ListItems>
          ) : (
            <CircularProgress />
          )}
        </FormControl>
      </Card>
    </Box>
  );
};

export default ListBusiness;
