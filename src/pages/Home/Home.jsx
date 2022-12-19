import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import { fetchQuotes } from "../../redux";
import Loader from "../../components/Loader";
import Quotes from "./Quotes";

function Home() {
  const blogsData = useSelector((state) => state.quotes);
  const { quotes, loading, error } = blogsData;

  const authenticationData = useSelector((state) => state.authentication);
  const { currentUser } = authenticationData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuotes());
  }, []);

  return <>{loading ? <Loader /> : <Quotes quotes={quotes} currentUser={currentUser} />}</>;
}

export default Home;
