import UserProfile from "@/app/components/user-profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu perfil",
};


const Notes = () => {

  return (
    <>
        <UserProfile/>
    </>
  );
};

export default Notes;
