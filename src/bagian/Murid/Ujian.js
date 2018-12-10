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
import { history } from "../../material/BrowserRouter";

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
    const no_ujian = window.localStorage.getItem("no_ujian");
    if (no_ujian) return history.replace("/soal");
    const [data, data_ujian] = this.props.containers;
    await data_ujian.ambilUjianMurid(window.localStorage.getItem("no"));
  }
  keluarApp = () => {
    window.localStorage.clear();
    return history.replace("/");
  };

  render() {
    const { classes } = this.props;
    const [data, data_ujian] = this.props.containers;

    return (
      <div className={classes.utama}>
        <AppBar position="static" className={classes.palang}>
          <Toolbar>
            <Tooltip title="Keluar">
              <IconButton color="inherit" onClick={this.keluarApp}>
                <Keluar />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" color="inherit">
              Ujian untuk {window.localStorage.getItem("nama")}
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
                {d.nama_mapel}
              </Typography>
              <Divider />
              <Typography variant="subheading">
                Nama Guru: {d.guru.nama}
              </Typography>
              <Typography variant="subheading">
                Waktu Ujian: {d.waktu} Menit
              </Typography>
              <Typography variant="subheading">
                jumlah soal : {d.soal_ujian.length}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  window.localStorage.setItem("no_ujian", d.no);
                  window.localStorage.setItem("judul_ujian", d.judul);
                  window.localStorage.setItem("nama_mapel", d.nama_mapel);
                  window.localStorage.setItem(
                    "soal_ujian",
                    JSON.stringify(d.soal_ujian)
                  );
                  window.localStorage.setItem("waktu_ujian", d.waktu);
                  window.localStorage.setItem("mulai", new Date().getTime());
                  history.replace("/soal");
                }}
              >
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
