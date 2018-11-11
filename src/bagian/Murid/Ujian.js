import React, { Component } from "react";
import { Paper, Typography, Button, withStyles } from "@material-ui/core";

const hiasan = theme => ({
  utama: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    // float: "center",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 17,
    paddingRight: theme.spacing.unit * 17,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  media: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  peringatan: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    marginBottom: theme.spacing.unit * 1,
    marginTop: theme.spacing.unit * 1
  },
  tombol: {
    marginTop: theme.spacing.unit * 3
  }
});

class Ujian extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.utama}>
        <Paper className={classes.media}>
          <Typography align="center" variant="h4" component="h4" gutterBottom>
            Nama Mapel
          </Typography>
          <Typography variant="subheading">Nama Guru: Fulan</Typography>
          <Typography variant="subheading">Waktu Ujian: 20 Menit</Typography>
          <Typography variant="subheading">jumlah soal : 20</Typography>
          <Typography variant="subheading" gutterBottom>
            Nama Murid: Fulan
          </Typography>
          <Paper className={classes.peringatan} elevation={9}>
            peringatan
          </Paper>
          <Button variant="raised" color="primary">
            Mulai Ujian
          </Button>
        </Paper>
      </div>
    );
  }
}
export default withStyles(hiasan)(Ujian);
