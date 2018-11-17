import React, { Component } from "react";
import {
  Paper,
  withStyles,
  AppBar,
  Tabs,
  Tab,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem
} from "@material-ui/core";
import MaterialTable from "material-table";
import { Subscribe } from "unstated";
import ContainerDataPengguna from "../../unstated/ContainerDataPenguna";
import ContainerDataKelas from "../../unstated/ContainerDataKelas";
import ContainerDataUjian from "../../unstated/ContainerDataUjian";
import AddIcon from "@material-ui/icons/Add";
import RSelect from "react-select";
import MaterialSelect from "../../material/MaterialSelect";

const hiasan = theme => ({
  utama: {
    width: "auto",
    display: "gridu", // Fix IE 11 issue.
    // float: "left",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 17,
    paddingRight: theme.spacing.unit * 17,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  media: {
    marginTop: theme.spacing.unit * 1.2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 2}px`
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  tombol: {
    marginTop: theme.spacing.unit * 3
  },
  tambah: {
    marginTop: theme.spacing.unit * 2,
    float: "right"
  }
});

class DataUtama extends Component {
  state = {
    value: 0,
    formulir: 0
  };
  handleClickOpen = f => {
    this.setState({ formulir: f });
  };

  handleClose = () => {
    this.setState({ formulir: 0 });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.utama}>
        <AppBar position="static" elevation={7}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Data Guru" />
            <Tab label="Data Murid" />
            <Tab label="Data Kelas" />
            <Tab label="Data Ujian" />
          </Tabs>
        </AppBar>
        <Subscribe
          to={[ContainerDataPengguna, ContainerDataKelas, ContainerDataUjian]}
        >
          {(data, data_kelas, data_ujian) => {
            if (value === 0) {
              data.ambilDataGuru();
              return (
                <div style={{ width: "100%" }}>
                  <IconButton
                    size="small"
                    className={classes.tambah}
                    onClick={() => this.handleClickOpen(1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <MaterialTable
                    columns={[
                      { title: "NIP", field: "no", type: "numeric" },
                      { title: "Nama", field: "nama" },
                      { title: "Menguji", field: "menguji" }
                    ]}
                    data={data.state.guru}
                    title="Data Guru"
                  />
                  <Dialog
                    open={this.state.formulir === 1}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Tambah Data Guru
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="no"
                        label="NIP"
                        type="number"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="nama"
                        label="Nama"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="kunci"
                        label="Kunci"
                        type="password"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={this.handleClose} color="primary">
                        Subscribe
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              );
            }
            if (value === 1) {
              data.ambilDataMurid();
              return (
                <div>
                  <IconButton
                    size="small"
                    className={classes.tambah}
                    onClick={() => this.handleClickOpen(2)}
                  >
                    <AddIcon />
                  </IconButton>
                  <MaterialTable
                    columns={[
                      { title: "NIS", field: "no", type: "numeric" },
                      { title: "Nama", field: "nama" },
                      { title: "Kelas", field: "kelas_murid" }
                    ]}
                    data={data.state.murid}
                    title="Data Murid"
                  />
                  <Dialog
                    open={this.state.formulir === 2}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Tambah Data Murid
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="no"
                        label="NIS"
                        type="number"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="nama"
                        label="Nama"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="kunci"
                        label="Kunci"
                        type="password"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={this.handleClose} color="primary">
                        Subscribe
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              );
            }
            if (value === 2) {
              data_kelas.ambilDataSemuaKelas();
              return (
                <div style={{ width: "100%" }}>
                  <IconButton
                    size="small"
                    className={classes.tambah}
                    onClick={() => this.handleClickOpen(3)}
                  >
                    <AddIcon />
                  </IconButton>
                  <MaterialTable
                    columns={[
                      { title: "No. Kelas", field: "no", type: "numeric" },
                      { title: "Nama", field: "nama" },
                      { title: "Tanggal", field: "tanggal" },
                      { title: "Murid-murid", field: "murid_di_kelas" }
                    ]}
                    data={data_kelas.state.semua_kelas}
                    title="Data Kelas"
                  />
                  <Dialog
                    open={this.state.formulir === 3}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    scroll="body"
                  >
                    <DialogTitle id="form-dialog-title">
                      Tambah Data Kelas
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="nama"
                        label="Nama"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="tanggal"
                        label="Tanggal"
                        fullWidth
                      />
                      <MaterialSelect label="Murid" isMulti />
                      <div style={{ paddingBottom: 300 }} />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={this.handleClose} color="primary">
                        Subscribe
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              );
            }
            if (value === 3) {
              data_ujian.ambilDataSemuaUjian();
              return (
                <div style={{ width: "100%" }}>
                  <MaterialTable
                    columns={[
                      { title: "No. Ujian", field: "no", type: "numeric" },
                      { title: "Judul", field: "judul" },
                      { title: "Mata Pelajaran", field: "nama_mapel" },
                      { title: "Tanggal", field: "tanggal" },
                      { title: "Lama Waktu", field: "waktu" },
                      { title: "Guru", field: "guru" },
                      { title: "Ujian", field: "ujian" }
                    ]}
                    data={data_ujian.state.semua_ujian}
                    title="Data Ujian"
                  />
                </div>
              );
            }
          }}
        </Subscribe>
      </div>
    );
  }
}
export default withStyles(hiasan)(DataUtama);
