import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Pagination } from "@mui/lab";
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

import { Grid, Box, Typography, Tooltip } from "@mui/material";

import AlertDialog from "../../components/AlertDialog";
import ReadMoreDialog from "../../components/ReadMoreDialog";

import { getToken } from "../../redux/utils";
import { likeQuote, deleteQuote } from "../../redux";
import usePagination from "./Pagination";
import { useSpring, animated } from "@react-spring/web";

function Quotes({ quotes, currentUser, isMyQuotes }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const count = Math.ceil(quotes.length / PER_PAGE);
  const _DATA = usePagination(quotes, PER_PAGE);
  const animateConfig = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 3,
  });
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const defaultAlertMsg =
    "You won't able to revert your liked quotes. Are you sure you want to proceed?";
  const [open, setOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [alertMsg, setAlertMsg] = useState(defaultAlertMsg);
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

  const handleUserAction = (id, type, isLikedOrFavt, isMyQuote) => {
    if (token) {
      if ((isLikedOrFavt && type === "like") || isMyQuote) {
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

  const renderUserAction = (counts, arr, type, id, classes, quoteBy, sx) => {
    const iconHolder = {
      favourite: {
        filled: FavoriteIcon,
        bordered: FavoriteBorderIcon,
        classes: "",
        toolTipTitle: "Add to favourite",
      },
      like: {
        filled: ThumbUpIcon,
        bordered: ThumbUpOffAltIcon,
        classes: "not-allowed",
        toolTipTitle: "Like it",
      },
    };
    const isUserInArray = arr.includes(logedInUserId);
    const iconHolderData = iconHolder[type];

    const IconToShow = isUserInArray
      ? iconHolderData.filled
      : iconHolderData.bordered;
    const classesToAdd =
      isUserInArray && type !== "favourite" ? iconHolderData.classes : "";
    const isMyQuote = quoteBy === logedInUserId;
    const myQuotesClass = isMyQuote ? "not-allowed" : "";
    const tooTipTitle = isMyQuote ? "Your Quote" : iconHolderData.toolTipTitle;
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

          <Tooltip title={tooTipTitle} placement="top">
            <IconToShow
              className={`${classesToAdd} ${myQuotesClass}`}
              onClick={() =>
                handleUserAction(id, type, isUserInArray, isMyQuote)
              }
            />
          </Tooltip>
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
              navigate(`/quotes/edit/${id}`);
            }}
          />
          <DeleteIcon
            onClick={() => {
              handleClickOpen(id, "deleteQuote");
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
      type === "deleteQuote"
        ? setAlertMsg("Are you sure you want to delete?")
        : setAlertMsg(defaultAlertMsg);
      setSelectedQuote(id);
      setActionType(type);
      setOpen(true);
    }
  };

  const handleClose = (proceed, alertType) => {
    setOpen(false);
    if (proceed === "ok") {
      alertType === "deleteQuote"
        ? dispatch(deleteQuote(selectedQuote))
        : dispatch(likeQuote(selectedQuote, actionType));
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
      <AlertDialog
        open={open}
        actionType={actionType}
        alertMsg={alertMsg}
        handleClose={handleClose}
      />
      <ReadMoreDialog
        open={openReadMore}
        text={readMoreQuote}
        handleClose={handleReadMoreClose}
      />
      <Grid container>
        {_DATA.currentData().map((elem, index) => {
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
          const { id: quoteBy, name } = user;
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
              <animated.div style={animateConfig}>
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
                        "",
                        quoteBy
                      )
                    : null}
                  {!isMyQuotes
                    ? renderUserAction(
                        likeCounts,
                        likeBy,
                        "like",
                        id,
                        "quote-footer-left",
                        quoteBy,
                        { width: "45px" }
                      )
                    : null}

                  {isMyQuotes ? renderDeleteAction("edit", id) : null}
                </Box>
              </animated.div>
            </Grid>
          );
        })}
      </Grid>
      {quotes.length > 12 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          py={3}
        >
          <Pagination
            count={count}
            color="primary"
            page={page}
            onChange={handleChange}
            size="large"
          />
        </Box>
      ) : null}
    </>
  );
}

export default Quotes;
