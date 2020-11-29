import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCube } from "swiper";
import "swiper/swiper.scss";
import Cards from "./Cards";
SwiperCore.use([EffectCube]);
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Stories(props) {
  const classes = useStyles();
  const fullScreen = useMediaQuery("(max-width:750px)");
  const { open, handleClose, user: userData, userIndex } = props;

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Stories
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Swiper
            slidesPerView={1}
            onSlideChange={() => console.log("slide changed")}
            onSwiper={(swiper) => console.log(swiper)}
            initialSlide={+userIndex}
          >
            {!userData ? (
              <h2>Loading...</h2>
            ) : (
              userData.map((user, index) => {
                return (
                  <SwiperSlide>
                    <Cards user={user} />
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
      </Dialog>
    </div>
  );
}
