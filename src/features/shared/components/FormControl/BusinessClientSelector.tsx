import { getSessionServices } from '@/auth/services/session.service';
import { QueryClientService } from '@/features/client/services/clientQuery/clientQuery.services';
import { useQuery } from '@apollo/client';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface FormControlClientProps {
  defaultSelectedClientId?:string;
  onSelectedChange:(value:any)=>void
}

export default function BusinessClientSelector({ defaultSelectedClientId, onSelectedChange }: FormControlClientProps) {
  const [selectedClientLocal, setSelectedClientLocal] = useState<string | undefined>(defaultSelectedClientId);

  useEffect(()=>{
    console.log(defaultSelectedClientId)
    setSelectedClientLocal(defaultSelectedClientId)
  },[defaultSelectedClientId])

  const { data: clientData, error: clientError, loading: clientLoading, refetch } = useQuery(QueryClientService.clients, {
    variables: {
      id: getSessionServices("business"),
    },
  });

  const clients= clientData?.findUserBusiness?.[0].client || [];
  console.log("clientData:", clientData);

  return (
    <FormControl className="w-1/2 p-2">
      <InputLabel>Cliente</InputLabel>
      <Select
        className="p-1"
        label="Cliente"
        sx={{ m: 1, width: "41.7ch" }}
        value={selectedClientLocal}
        onChange={(e) => {
          const selectedValue = e.target.value as string;
          onSelectedChange(selectedValue);
          setSelectedClientLocal(selectedValue) // Llama a la función para establecer el valor en el componente padre
        }}
      >
        {clients.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name} {item.surname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
