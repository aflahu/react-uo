import React, { Component } from "react";
import {
  Paper,
  withStyles,
  AppBar,
  Tabs,
  Tab,
  IconButton,
  Button,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
  Dialog
} from "@material-ui/core";
import MaterialTable from "material-table";
import ContainerDataKelas from "../../unstated/ContainerDataKelas";
import ContainerDataUjian from "../../unstated/ContainerDataUjian";
import ContainerDataSoal from "../../unstated/ContainerDataSoal";
import { Subscribe } from "unstated";
import AddIcon from "@material-ui/icons/Add";
import MaterialSelect from "../../material/MaterialSelect";

const hiasan = theme => ({
  utama: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
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

class MenuGuru extends Component {
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
            <Tab label="Data Kelas" />
            <Tab label="Data Ujian" />
            <Tab label="Data Soal" />
          </Tabs>
        </AppBar>
        <Subscribe
          to={[ContainerDataSoal, ContainerDataKelas, ContainerDataUjian]}
        >
          {(data_soal, data_kelas, data_ujian) => {
            if (value === 0) {
              data_kelas.ambilDataSemuaKelas();
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
                      { title: "No. Kelas", field: "no", type: "numeric" },
                      { title: "Nama", field: "nama" },
                      { title: "Tanggal", field: "tanggal" },
                      { title: "Murid-murid", field: "murid_di_kelas" },
                      { title: "Ujian", field: "ujian" }
                    ]}
                    data={data_kelas.state.semua_kelas}
                    title="Data Kelas"
                  />
                  <Dialog
                    open={this.state.formulir === 1}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
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
                      <TextField
                        margin="dense"
                        id="murid_di_kelas"
                        label="Murid di kelas"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="ujian"
                        label="Ujian"
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
              data_ujian.ambilDataSemuaUjian();
              return (
                <div style={{ width: "100%" }}>
                  <IconButton
                    size="small"
                    className={classes.tambah}
                    onClick={() => this.handleClickOpen(2)}
                  >
                    <AddIcon />
                  </IconButton>
                  <MaterialTable
                    columns={[
                      { title: "No. Ujian", field: "no", type: "numeric" },
                      { title: "Judul", field: "judul" },
                      { title: "Mata Pelajaran", field: "nama_mapel" },
                      { title: "Tanggal", field: "tanggal" },
                      { title: "Lama Waktu", field: "waktu" },
                      { title: "Guru", field: "guru" },
                      { title: "Kelas kelas ujian", field: "kelas_kelas_ujian" }
                    ]}
                    data={data_ujian.state.semua_ujian}
                    title="Data Ujian"
                  />
                  <Dialog
                    open={this.state.formulir === 2}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    scroll="body"
                  >
                    <DialogTitle id="form-dialog-title">
                      Tambah Data Ujian
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="judul"
                        label="Judul"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="nama_mapel"
                        label="Nama mata pelajaran"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="tanggal"
                        label="Tanggal"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="waktu"
                        label="Waktu"
                        type="number"
                        fullWidth
                      />
                      <MaterialSelect label="Guru" />
                      <MaterialSelect label="Kelas" />
                      <MaterialSelect label="Soal" />
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
            if (value === 2) {
              data_soal.ambilDataSemuaSoal();
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
                      { title: "No. Soal", field: "no", type: "numeric" },
                      { title: "Soal", field: "soal" },
                      { title: "Pilihan 1", field: "pilihan_1" },
                      { title: "Pilihan 2", field: "pilihan_2" },
                      { title: "Pilihan 3", field: "pilihan_3" },
                      { title: "Pilihan 4", field: "pilihan_4" },
                      { title: "Jawaban", field: "jawaban" },
                      { title: "Nilai Soal", field: "nilai" },
                      { title: "Ujian", field: "kelas_kelas_ujian" }
                    ]}
                    data={data_soal.state.semua_soal}
                    title="Data Soal"
                  />
                  <Dialog
                    open={this.state.formulir === 3}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    scroll="body"
                  >
                    <DialogTitle id="form-dialog-title">
                      Tambah Data Soal
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="soal"
                        label="Pertanyaan"
                        multiline
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="pilihan_1"
                        label="Pilihan 1"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="pilihan_2"
                        label="Pilihan 2"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="pilihan_3"
                        label="Pilihan 3"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="pilihan_4"
                        label="Pilihan 4"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="jawaban"
                        label="Jawaban"
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="nilai_soal"
                        label="Nilai"
                        type="number"
                        fullWidth
                      />
                      <MaterialSelect label="Ujian" />
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
          }}
        </Subscribe>
      </div>
    );
  }
}
export default withStyles(hiasan)(MenuGuru);
