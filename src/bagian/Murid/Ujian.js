import React, { Component } from "react";
import {
  Paper,
  Typography,
  Button,
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Divider
} from "@material-ui/core";
import Keluar from "@material-ui/icons/ExitToApp";
import { compose } from "recompose";
import Containers from "unstated-connect";
import ContainerDataUjian from "../../unstated/ContainerDataUjian";
import ContainerDataPengguna from "../../unstated/ContainerDataPenguna";

const hiasan = theme => ({
  utama: {
    display: "grid",
    gridTemplateColumns: "auto minmax( 250px, 900px) auto"
  },
  palang: {
    gridColumn: "1/4"
  },
  pilihan: {
    gridColumn: "2",
    display: "grid",
    gridGap: "7px",
    gridTemplateColumns: "repeat(auto-fill, minmax(295px, 1fr))"
  },
  media: {
    marginTop: theme.spacing.unit * 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  peringatan: {
    gridColumn: "2",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    // marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3
  },
  tombol: {
    marginTop: theme.spacing.unit * 3
  }
});

class Ujian extends Component {
  async componentDidMount() {
    const [data, data_ujian] = this.props.containers;
    await data_ujian.ambilDataSemuaUjian();
  }
  render() {
    const { classes } = this.props;
    const [data, data_ujian] = this.props.containers;

    return (
      <div className={classes.utama}>
        <AppBar position="static" className={classes.palang}>
          <Toolbar>
            <Tooltip title="Keluar">
              <IconButton color="inherit">
                <Keluar />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" color="inherit">
              Ujian untuk nama anta
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.peringatan}>
          <Typography variant="inherit">
            Peringatan: sekali mulai harus
          </Typography>
        </Paper>
        <div className={classes.pilihan}>
          {data_ujian.state.semua_ujian.map(d => (
            <Paper key={d} className={classes.media}>
              <Typography align="center" variant="title" gutterBottom>
                Nama Mapel
              </Typography>
              <Divider />
              <Typography variant="subheading">Nama Guru: Fulan</Typography>
              <Typography variant="subheading">
                Waktu Ujian: 20 Menit
              </Typography>
              <Typography variant="subheading">jumlah soal : 20</Typography>

              <Button variant="contained" color="primary">
                Mulai Ujian
              </Button>
            </Paper>
          ))}
        </div>
      </div>
    );
  }
}
const gabungan = compose(
  withStyles(hiasan),
  Containers([ContainerDataPengguna, ContainerDataUjian])
);
export default gabungan(Ujian);
