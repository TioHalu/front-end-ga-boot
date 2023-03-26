import Home from "../assets/icons/home.svg";
import Cloud from "../assets/icons/cloud.svg";
export const listDrawer = [
  {
    title: "Main",
    sub: [
      {
        name: "Dashboard",
        link: "/main/dashboard",
        icon: Home
      },
       {
        name: "Deploy",
        link: "/main/deploy",
        icon: Cloud
      }
    ]
  },
   {
    title: "Administrator",
    sub: [
      {
        name: "Member",
        link: "/administrator/member",
        icon: Home
      },
       {
        name: "Kube Config",
        link: "/administrator/kube-config",
        icon: Cloud
      }
    ]
  },
   
  
]