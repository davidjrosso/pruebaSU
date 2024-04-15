"use client";

import FormBusinessComponent from "@/features/business/components/formBusiness/formBusiness";
import ListBusiness from "@/features/business/components/listBusiness/listBusiness";
import FloatingActionButtons from "@/features/shared/components/floating/floatingButton";

export default function listBusiness() {
  return (
    <>
      <div>
        <FloatingActionButtons
          modalContent={<FormBusinessComponent business={undefined} />}
        />
      </div>
      <div>
        <ListBusiness
          name={""}
          phone={""}
          email={""}
          address={""}
          category={""}
          image={""}
          touched={""}
          _id={""}
        />
      </div>
    </>
  );
}
