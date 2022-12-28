import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  common,
  blue,
  brown,
  cyan,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  pink,
  purple,
  teal,
  yellow,
} from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { Grid, Box, Typography } from "@mui/material";

import AlertDialog from "../../components/AlertDialog";
import ReadMoreDialog from "../../components/ReadMoreDialog";

import { getToken } from "../../redux/utils";
import { likeQuote } from "../../redux";

function Quotes({ quotes, currentUser, isMyQuotes }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [actionType, setActionType] = useState(null);
  const token = getToken();
  const logedInUserId = currentUser ? currentUser.id : "";
  const colors = {
    1: yellow,
    2: blue,
    3: brown,
    4: cyan,
    5: teal,
    6: deepPurple,
    7: green,
    8: indigo,
    9: lightBlue,
    10: lightGreen,
    11: lime,
    12: pink,
    13: purple,
  };

  const combinations = {
    1: common["white"],
    2: common["white"],
    3: common["white"],
    4: common["white"],
    5: common["white"],
    6: common["white"],
    7: common["white"],
    8: common["white"],
    9: common["white"],
    10: common["white"],
    11: common["white"],
    12: common["white"],
    13: common["white"],
  };
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleUserAction = (id, type, isLikedOrFavt) => {
    if (token) {
      if (isLikedOrFavt && type === "like") {
        return;
      }
      setSelectedQuote(id);
      setActionType(type);
      const addedToFavt = isLikedOrFavt ? "removeFavourite" : null;
      handleClickOpen(id, addedToFavt || type);
    } else {
      navigate("/login");
    }
  };

  const getColor = () => {
    const bgIntencity = randomIntFromInterval(3, 8);
    const randomeNumberForBgColor = randomIntFromInterval(1, 13);

    return {
      bg: colors[randomeNumberForBgColor][100 * bgIntencity],
      forColor: combinations[randomeNumberForBgColor],
    };
  };

  const renderUserAction = (counts, arr, type, id, classes, sx) => {
    const iconHolder = {
      favourite: {
        filled: FavoriteIcon,
        bordered: FavoriteBorderIcon,
        classes: "",
      },
      like: {
        filled: ThumbUpIcon,
        bordered: ThumbUpOffAltIcon,
        classes: "not-allowed",
      },
    };
    const isUserInArray = arr.includes(logedInUserId);
    const IconToShow = isUserInArray
      ? iconHolder[type].filled
      : iconHolder[type].bordered;
    const classesToAdd =
      isUserInArray && type !== "favourite" ? iconHolder[type].classes : "";
    return (
      <Box className={`quote-footer ${classes}`} sx={sx}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            width: "45px",
          }}
        >
          <span>{counts}</span>

          <IconToShow
            className={classesToAdd}
            onClick={() => handleUserAction(id, type, isUserInArray)}
          />
        </div>
      </Box>
    );
  };

  const renderDeleteAction = (type, id) => {
    return (
      <Box className="quote-footer">
        <div
          style={{
            width: "60px",
          }}
        >
          <ModeEditIcon
            className="mr-10"
            onClick={() => {
              console.log("HELLO WORLD. . .");
            }}
          />
          <DeleteIcon
            onClick={() => {
              console.log("HELLO WORLD. . .DeleteIcon");
            }}
          />
        </div>
      </Box>
    );
  };
  const quoteText = (quote) => {
    return quote.length > 210 ? (
      <Typography variant="body1" px={4} py={2}>
        {quote.substring(0, 210)}...
        <Typography
          variant="p"
          display="inline-block"
          sx={{ fontWeight: "bold" }}
          onClick={() => handleReadMoreClickOpen(quote)}
        >
          read more
        </Typography>
        .
      </Typography>
    ) : (
      <Typography variant="body1" px={4} py={2}>
        {quote}
      </Typography>
    );
  };
  const handleClickOpen = (id, type) => {
    if (type === "favourite" || type === "removeFavourite") {
      dispatch(likeQuote(id, type));
    } else {
      setOpen(true);
    }
  };

  const handleClose = (proceed) => {
    setOpen(false);
    if (proceed === "ok") {
      dispatch(likeQuote(selectedQuote, actionType));
    }
  };

  const [openReadMore, setOpenReadMore] = useState(false);
  const [readMoreQuote, setReadMoreQuote] = useState("");

  const handleReadMoreClickOpen = (quote) => {
    setOpenReadMore(true);
    setReadMoreQuote(quote);
  };
  const handleReadMoreClose = () => {
    setOpenReadMore(false);
  };

  return (
    <>
      <AlertDialog open={open} handleClose={handleClose} />
      <ReadMoreDialog
        open={openReadMore}
        text={readMoreQuote}
        handleClose={handleReadMoreClose}
      />
      <Grid container>
        {quotes.map((elem, index) => {
          const {
            id,
            quote,
            date,
            time,
            user,
            likeCounts,
            likeBy,
            favouriteCounts,
            favouriteBy,
          } = elem;
          let { bg, forColor } = elem;
          const dateTime = `${date} ${time}`;
          const { name } = user;
          let { bg: fbg, forColor: fForColor } = getColor();
          elem.bg = bg ? bg : fbg;
          elem.forColor = forColor ? forColor : fForColor;
          return (
            <Grid
              item
              key={id}
              sx={{
                bgcolor: elem.bg,
                color: elem.forColor,
                fontWeight: "bold",
                position: "relative",
                minHeight: "250px",
              }}
              px={2}
              pb={6}
              pt={2}
              xs={12}
              sm={4}
              md={3}
              lg={3}
              xl={3}
            >
              <Box className="quotes">
                <Typography
                  variant="h4"
                  className={index === 0 ? "firs-quote" : ""}
                >
                  {name}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  className={index === 0 ? "firs-quote" : ""}
                >
                  {dateTime}
                </Typography>
                {quoteText(quote)}

                {!isMyQuotes
                  ? renderUserAction(
                      favouriteCounts,
                      favouriteBy,
                      "favourite",
                      id,
                      ""
                    )
                  : null}
                {!isMyQuotes
                  ? renderUserAction(
                      likeCounts,
                      likeBy,
                      "like",
                      id,
                      "quote-footer-left",
                      { width: "45px" }
                    )
                  : null}

                {isMyQuotes ? renderDeleteAction("edit", id) : null}
                {isMyQuotes ? renderDeleteAction("delete", id) : null}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Quotes;
