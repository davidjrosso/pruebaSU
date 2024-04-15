import FooterAdmin from "@/features/shared/components/dashboard/components/footers/footerAdmin";
import Sidebar from "@/features/shared/components/dashboard/components/sideBar/sideBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar/>
      <div style={{ display: "flex", justifyContent: "center",padding:"5vh", marginTop: "-15vh" }} >
        {children}
      </div>
      <FooterAdmin  />
    </>
  );
}
