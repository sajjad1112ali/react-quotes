import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchQuotes } from "../../redux";
import Loader from "../../components/Loader";
import Quotes from "./Quotes";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMyQuotes = location.pathname === "/quotes";

  const blogsData = useSelector((state) => state.quotes);
  const { quotes, loading, error } = blogsData;

  const authenticationData = useSelector((state) => state.authentication);
  const { currentUser } = authenticationData;
  const userDetails = currentUser || {};
  const dispatch = useDispatch();
  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };
  useEffect(() => {
    dispatch(fetchQuotes(isMyQuotes));
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Quotes
            quotes={quotes}
            currentUser={currentUser}
            isMyQuotes={isMyQuotes}
          />
          {isMyQuotes ? (
            <Fab color="secondary" sx={fabStyle} aria-label="add">
              <AddIcon onClick={() => navigate("/quotes/add")} />
            </Fab>
          ) : null}
        </>
      )}
    </>
  );
}

export default Home;
