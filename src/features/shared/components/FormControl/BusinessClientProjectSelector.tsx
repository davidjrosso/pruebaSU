import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProjectQueryService } from "@/features/project/projectService/projectQuery/projectQuery.service";
import { getSessionServices } from "@/auth/services/session.service";


interface FormControlProjectProps {
  defaultSelectedProjectId?:string;
  onSelectedChange:(value:any)=>void
}
export default function BusinessClientProjectSelector({defaultSelectedProjectId, onSelectedChange}:FormControlProjectProps){
  const [selectedProjectLocal, setSelectedProjectLocal]=useState<string | undefined>(defaultSelectedProjectId)
  const { data: projectData, loading: projectLoading, error: projectError } =
    useQuery(ProjectQueryService.Project, {
      variables: {
        id: getSessionServices("business"),
        idClient: getSessionServices("client"),
      },
    });
  const projects =
  projectData?.findUserBusiness?.[0]?.client?.[0]?.project || [];
  useEffect(()=>{
    console.log(defaultSelectedProjectId)
    setSelectedProjectLocal(defaultSelectedProjectId)
  }),[defaultSelectedProjectId]

console.log(projects)
  return (
    <FormControl className="w-1/2 p-2">
      <InputLabel>Proyecto</InputLabel>
      <Select
        className="p-1"
        label="Proyecto"
        sx={{ m: 1, width: "41.7ch" }}
        onChange={(e) => {
          const selectedValue = e.target.value as string;
          onSelectedChange(selectedValue)
          setSelectedProjectLocal(selectedValue);
       
        }}
      >
        {projects.map((project: any) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
