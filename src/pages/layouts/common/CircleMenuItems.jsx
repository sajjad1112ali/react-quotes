import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
// Import the circular menu
import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";

import { logoutUser, getProfile } from "../../../redux";
import { getToken } from "../../../redux/utils";
const APP_NAME = process.env.REACT_APP_NAME;

function CircleMenuItems() {
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
        {token ? (
          <>
            <CircleMenuItem
              onClick={() => logOutOrLogin()}
              tooltip="Logout"
              tooltipPlacement={TooltipPlacement.Right}
            >
              <LoginIcon />
            </CircleMenuItem>
            <CircleMenuItem tooltip="Dashbaord">
              <DashboardIcon />
            </CircleMenuItem>
          </>
        ) : (
          <>
            <CircleMenuItem
              onClick={() => logOutOrLogin()}
              tooltip="Login"
              tooltipPlacement={TooltipPlacement.Right}
            >
              <LoginIcon />
            </CircleMenuItem>
          </>
        )}

        {/* <CircleMenuItem
          onClick={() => logOutOrLogin()}
          tooltip={token ? "Logout" : "Login"}
          tooltipPlacement={TooltipPlacement.Right}
        >
          <LoginIcon />
        </CircleMenuItem>

        <CircleMenuItem tooltip="Dashbaord">
          <DashboardIcon />
        </CircleMenuItem>


         */}
      </CircleMenu>
    </div>
  );
}
export default CircleMenuItems;
