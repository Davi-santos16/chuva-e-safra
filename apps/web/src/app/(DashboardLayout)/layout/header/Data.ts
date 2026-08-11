
//  Profile Data
interface ProfileType {
  title: string;
  img: any;
  subtitle: string;
  url: string;
  icon:string
}


const profileDD: ProfileType[] = [
  {
    img: "/images/svgs/icon-account.svg",
    title: "My Profile",
    subtitle: "Account settings",
    icon:"tabler:user",
    url: "/user-profile",
  },
  {
    img: "/images/svgs/icon-tasks.svg",
    title: "My Tasks",
    subtitle: "To-do and Daily tasks",
    icon:"tabler:list-check",
    url: "/",
  },
];

export {
  profileDD,
};
