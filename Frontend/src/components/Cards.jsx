import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",

    boxShadow: "none",
  },
});

export default function Cards(props) {
  const classes = useStyles();

  const { user } = props;

  const [index, setIndex] = useState(0);
  const handlePrevClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      return;
    }
  };
  const handleNextClick = () => {
    if (index < user.story.length - 1) setIndex(index + 1);
    else return;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <img src={user.story[index]} alt="story" />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {user.story.length > 1 ? (
          <>
            <Button size="small" color="primary" onClick={handlePrevClick}>
              Prev
            </Button>
            <Button size="small" color="primary" onClick={handleNextClick}>
              Next
            </Button>
          </>
        ) : null}
      </CardActions>
    </Card>
  );
}
