import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
// Import the circular menu
import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";
import HomeIcon from "@mui/icons-material/Home";
import { logoutUser, getProfile } from "../../../redux";
import { getToken } from "../../../redux/utils";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticationData = useSelector((state) => state.authentication);
  const { currentUser, error } = authenticationData;

  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, []);

  const logOutOrLogin = () => {
    token ? dispatch(logoutUser(navigate)) : navigate("/login");
  };

  const items = [
    {
      name: "Login",
      label: "Login",
      icon: <LoginIcon />,
      onPress: logOutOrLogin,
    },
    {
      name: "Home",
      label: "Home",
      icon: <HomeIcon />,
      onPress: () => navigate("/"),
    },
  ];
  const logedInItems = [
    {
      name: "Logout",
      label: "Logout",
      icon: <LoginIcon />,
      onPress: logOutOrLogin,
    },
    {
      name: "Home",
      label: "Home",
      icon: <HomeIcon />,
      onPress: () => navigate("/"),
    },
    {
      name: "My Quotes",
      label: "My Quotes",
      icon: <FormatQuoteIcon />,
      onPress: () => navigate("/quotes"),
    },
  ];
  const navItems = token ? logedInItems : items;

  return (
    <div
      style={{ marginTop: "10px", marginLeft: "10px", position: "absolute" }}
    >
      <CircleMenu
        startAngle={0}
        rotationAngle={120}
        itemSize={1}
        radius={4}
        /**
         * rotationAngleInclusive (default true)
         * Whether to include the ending angle in rotation because an
         * item at 360deg is the same as an item at 0deg if inclusive.
         * Leave this prop for angles other than 360deg unless otherwise desired.
         */
        rotationAngleInclusive={false}
      >
        {navItems.map((i) => (
          <CircleMenuItem
            onClick={() => i.onPress()}
            tooltip={i.label}
            tooltipPlacement={TooltipPlacement.Right}
            key={i.name}
          >
            {i.icon}
          </CircleMenuItem>
        ))}
        {/* <CircleMenuItem
          onClick={() => logOutOrLogin()}
          tooltip={token ? "Logout" : "Login"}
          tooltipPlacement={TooltipPlacement.Right}
        >
          <LoginIcon />
        </CircleMenuItem>

        <CircleMenuItem tooltip="Dashbaord">
          <DashboardIcon />
        </CircleMenuItem> */}
      </CircleMenu>
    </div>
  );
}
export default Nav;
