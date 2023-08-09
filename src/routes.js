import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Securities from "views/examples/Securities.js";
import Book from "views/examples/Book.js";
import Watchlist from "views/examples/Watchlist";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/book",
    name: "Book",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Book />,
    layout: "/admin",
  },
  {
    path: "/watchlist",
    name: "Watchlist",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Watchlist />,
    layout: "/admin",
  },
  {
    path: "/securities",
    name: "Securities",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Securities />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
];
export default routes;
