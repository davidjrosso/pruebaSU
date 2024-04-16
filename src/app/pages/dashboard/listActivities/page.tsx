"use client";

import ActivityForm from "@/features/activities/components/formActivitie/formActivities";
import ListActivitiesComponent from "@/features/activities/components/listActivities/listActivity";
import FloatingActionButtons from "@/features/shared/components/floating/floatingButton";

export default function ListActivities() {
  return (
    <>
      <div>
        <FloatingActionButtons
          modalContent={<ActivityForm activitie={undefined} project={undefined} client={undefined} id={undefined}  />}
        />
      </div>
      <div>
        <ListActivitiesComponent></ListActivitiesComponent>
      </div>
    </>
  );
}
