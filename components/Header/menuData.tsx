import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 33,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 3,
    title: "Support",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Chat",
        path: "/chat",
        newTab: false,
      },
      {
        id: 42,
        title: "Dashboard",
        path: "/dashboard",
        newTab: false,
      },
      {
        id: 43,
        title: "Calendar",
        path: "/calendar",
        newTab: false,
      },
      {
        id: 44,
        title: "Quiz",
        path: "/quiz",
        newTab: false,
      },
      {
        id: 45,
        title: "Campus",
        path: "/virtual_campus_tour",
        newTab: false,
      },
      {
        id: 46,
        title: "Chatbot",
        path: "/chatbot",
        newTab: false,
      },
      {
        id: 47,
        title: "Other University",
        path: "/other-university",
        newTab: false,
      },
      {
        id: 48,
        title: "Jump Start",
        path: "/jump-start",
        newTab: false,
      },
      {
        id: 49,
        title: "Career Match Challenge",
        path: "/career-match-challenge",
        newTab: false,
      },
    ],
  },
];
export default menuData;
