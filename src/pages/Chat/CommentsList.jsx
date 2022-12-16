import React from "react";
import { Box, Typography } from "@mui/material";
const { formatComment } = require("../../redux/utils");

const CommentsList = (props) => {
  const { comments } = props;
  return (
    <>
      {comments.map((c) => (
        <Box key={c.id}>
          <Typography variant="h6" color="primary.dark">
            {c.name}
            <Typography
              sx={{
                color: "primary.light",
                fontSize: "12px",
                marginLeft: "3px",
              }}
              variant="span"
            >
              {formatComment(c.time)}
            </Typography>
          </Typography>
          <Typography sx={{ marginLeft: "5px" }}>{c.message}</Typography>
        </Box>
      ))}
    </>
  );
};

export default CommentsList;
