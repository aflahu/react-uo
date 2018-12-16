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
  Divider,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@material-ui/core";
import Keluar from "@material-ui/icons/ExitToApp";
import { compose } from "recompose";
import Containers from "unstated-connect";
import ContainerDataUjian from "../../unstated/ContainerDataUjian";
import ContainerDataPengguna from "../../unstated/ContainerDataPenguna";
import { history } from "../../material/BrowserRouter";
import EditIcon from "@material-ui/icons/Edit";

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
  },
  grow: {
    flexGrow: 1
  }
});

class Ujian extends Component {
  state = {
    lihat: false
  };
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
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Ujian untuk {window.localStorage.getItem("nama")}
            </Typography>

            <Tooltip title="Lihat nilai">
              <Switch
                onChange={() => this.setState({ lihat: !this.state.lihat })}
                value={this.state.lihat}
              />
            </Tooltip>
            <Tooltip title="Perbarui akun">
              <IconButton
                color="inherit"
                onClick={async () => {
                  await data.ambilDataPengguna();
                  this.setState({ akun: !this.state.akun });
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Dialog
              open={this.state.akun}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Perbarui Akun</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="no"
                  label="No."
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  value={data.state.formulir_pengguna.no}
                  onChange={event =>
                    data.perbaruiNoPengguna(event.currentTarget.value)
                  }
                  disabled
                />
                <TextField
                  margin="dense"
                  id="nama"
                  label="Nama"
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  value={data.state.formulir_pengguna.nama}
                  onChange={event =>
                    data.perbaruiNamaPengguna(event.currentTarget.value)
                  }
                />
                <TextField
                  margin="dense"
                  id="kunci"
                  label="Kunci"
                  type="password"
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  value={data.state.formulir_pengguna.kunci}
                  onChange={event =>
                    data.perbaruiKunciPengguna(event.currentTarget.value)
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={e => {
                    this.handleClose();
                    data.bersihkanFormulirPengguna(e);
                    this.setState({ akun: false });
                  }}
                  color="primary"
                >
                  Batal
                </Button>
                <Button
                  onClick={async e => {
                    await data.perbaruiPengguna(e);
                    this.setState({ akun: false });
                    data.bersihkanFormulirPengguna(e);
                  }}
                  color="primary"
                >
                  Masukkan
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
        <Paper className={classes.peringatan}>
          <Typography variant="inherit">Perhatian:</Typography>
          <Typography variant="inherit">
            - Sakali mulai ujian tidak bisa kembali
          </Typography>
          <Typography variant="inherit">
            - Data bisa jadi digunakan oleh pihak sekolah, dan pihak developer
            (untuk perbaikan)
          </Typography>
        </Paper>
        <div className={classes.pilihan}>
          {data_ujian.state.semua_ujian.map(d => (
            <Paper key={d.no} className={classes.media}>
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
              {d.nilai_terkumpul.filter(i => i.no === 5)[0] &&
                (this.state.lihat && (
                  <Typography variant="subheading" hidden={false}>
                    nilai : {d.nilai_terkumpul.filter(i => i.no === 5)[0].nilai}
                  </Typography>
                ))}

              {!d.nilai_terkumpul.filter(i => i.no === 5)[0] && (
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
              )}
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
