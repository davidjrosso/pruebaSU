"use client";

import FormProjectComponent from "@/features/project/components/formProject/formProject";
import ListProjectComponent from "@/features/project/components/listProject/listProject";
import FloatingActionButtons from "@/features/shared/components/floating/floatingButton";

export default function ListProject() {
  return (
    <>
      <div>
        <FloatingActionButtons
          modalContent={
            <FormProjectComponent id={undefined} project={undefined} client={undefined} />
          }
        />
      </div>
      <div>
        <ListProjectComponent />
      </div>
    </>
  );
}
