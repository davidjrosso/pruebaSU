"user client";

import FormClientComponent from "@/features/client/components/FormClient/FormClient";
import ListClientComponent from "@/features/client/components/ListClient/ListClient";
import FloatingActionButtons from "@/features/shared/components/floating/floatingButton";

export default function ListClient() {
  return (
    <>
      <div>
        <FloatingActionButtons
          modalContent={<FormClientComponent client={undefined} />}
        />
      </div>
      <div>
        <ListClientComponent />
      </div>
    </>
  );
}
