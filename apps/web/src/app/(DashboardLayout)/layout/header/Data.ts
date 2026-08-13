
//  Profile Data
interface ProfileType {
  title: string;
  url: string;
  icon:string
}


const profileDD: ProfileType[] = [
  {
    title: "Meu Perfil",
    icon:"tabler:user",
    url: "/user-profile",
  },
];

export {
  profileDD,
};
