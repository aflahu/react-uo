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
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import MaterialTable from "material-table";
import { Subscribe } from "unstated";
import ContainerDataPengguna from "../../unstated/ContainerDataPenguna";
import ContainerDataKelas from "../../unstated/ContainerDataKelas";
import ContainerDataUjian from "../../unstated/ContainerDataUjian";
import AddIcon from "@material-ui/icons/Add";
import MaterialSelect from "../../material/MaterialSelect";
import { compose } from "recompose";
import Containers from "unstated-connect";
import moment from "moment-hijri";
import Keluar from "@material-ui/icons/ExitToApp";
import { history } from "../../material/BrowserRouter";

const hiasan = theme => ({
  utama: {
    // width: "auto",
    display: "grid",
    gridTemplateColumns: "auto minmax( 500px, 900px) auto"
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    // paddingLeft: theme.spacing.unit * 17,
    // paddingRight: theme.spacing.unit * 17,
    // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
    //   width: 900,
    //   marginLeft: "auto",
    //   marginRight: "auto"
    // }
  },
  palang: {
    gridColumn: "1 / 4"
  },
  tengah: {
    gridColumn: "2",
    marginTop: theme.spacing.unit * 3
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
  },
  tanggal: {
    display: "flex",
    flex: "1 1"
  }
});

class DataUtama extends Component {
  state = {
    value: 0,
    formulir: 0,
    perbarui: false
  };

  async componentDidMount() {
    const [data, data_kelas, data_ujian] = this.props.containers;
    await data.ambilDataGuru();
    await data.ambilDataMurid();
    await data_kelas.ambilDataSemuaKelas();
    await data_ujian.ambilDataSemuaUjian();
    await data.pilihanMurid();
  }

  handleClickOpen = f => {
    this.setState({ formulir: f });
  };

  handleEdit = (f, dataFormulir) => {
    this.setState({ formulir: f, perbarui: true });
    const [data, data_kelas] = this.props.containers;
    if (f === 1) data.mengisiFromulirGuru(dataFormulir);
    if (f === 2) data.mengisiFromulirMurid(dataFormulir);
    if (f === 3) data_kelas.mengisiFromulirKelas(dataFormulir);
  };
  handleDeleteData = (f, dataFormulir) => {
    const [data, data_kelas] = this.props.containers;
    if (f === 1) data.menghapusDataPengguna(dataFormulir);
    if (f === 2) data.menghapusDataPengguna(dataFormulir);
    if (f === 3) data_kelas.menghapusDataKelas(dataFormulir);
  };

  handleClose = () => {
    this.setState({ formulir: 0 });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  keluarApp = () => {
    window.localStorage.clear();
    return history.replace("/");
  };

  render() {
    const { classes } = this.props;
    const { value, perbarui } = this.state;
    const [data, data_kelas, data_ujian] = this.props.containers;
    return (
      <div className={classes.utama}>
        <AppBar position="static" className={classes.palang}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.keluarApp}>
              <Keluar />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Assalamu'alaikum warahmatullahi wabarakatuh
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.tengah}>
          <AppBar position="static" elevation={7}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Data Guru" />
              <Tab label="Data Murid" />
              <Tab label="Data Kelas" />
              <Tab label="Data Ujian" />
            </Tabs>
          </AppBar>
          {value === 0 && (
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
                  { title: "Menguji", field: "string_menguji" }
                ]}
                data={data.state.guru}
                title="Data Guru"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "perbarui",
                    onClick: (e, data) => this.handleEdit(1, data)
                  },
                  {
                    icon: "delete_outline",
                    tooltip: "hapus",
                    onClick: (e, data) => this.handleDeleteData(1, data)
                  }
                ]}
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
                    value={data.state.formulirDataGuru.no}
                    onChange={event =>
                      data.perbaruiNoGuru(event.currentTarget.value)
                    }
                    disabled={perbarui}
                  />
                  <TextField
                    margin="dense"
                    id="nama"
                    label="Nama"
                    fullWidth
                    value={data.state.formulirDataGuru.nama}
                    onChange={event =>
                      data.perbaruiNamaGuru(event.currentTarget.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    id="kunci"
                    label="Kunci"
                    type="password"
                    fullWidth
                    value={data.state.formulirDataGuru.kunci}
                    onChange={event =>
                      data.perbaruiKunciGuru(event.currentTarget.value)
                    }
                    disabled={perbarui}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={e => {
                      this.handleClose();
                      data.bersihkanFormulirGuru(e);
                      this.setState({ perbarui: false });
                    }}
                    color="primary"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={async e => {
                      this.handleClose();
                      await data.masukkanFormulirGuru(e, this.state.perbarui);
                      this.setState({ perbarui: false });
                    }}
                    color="primary"
                  >
                    Masukkan
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
          {value === 1 && (
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
                  { title: "Kelas", field: "string_kelas_murid" }
                ]}
                data={data.state.murid}
                title="Data Murid"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "perbarui",
                    onClick: (e, data) => this.handleEdit(2, data)
                  },
                  {
                    icon: "delete_outline",
                    tooltip: "hapus",
                    onClick: (e, data) => this.handleDeleteData(2, data)
                  }
                ]}
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
                    value={data.state.formulirDataMurid.no}
                    onChange={event =>
                      data.perbaruiNoMurid(event.currentTarget.value)
                    }
                    disabled={perbarui}
                  />
                  <TextField
                    margin="dense"
                    id="nama"
                    label="Nama"
                    fullWidth
                    value={data.state.formulirDataMurid.nama}
                    onChange={event =>
                      data.perbaruiNamaMurid(event.currentTarget.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    id="kunci"
                    label="Kunci"
                    type="password"
                    fullWidth
                    value={data.state.formulirDataMurid.kunci}
                    onChange={event =>
                      data.perbaruiKunciMurid(event.currentTarget.value)
                    }
                    disabled={perbarui}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={e => {
                      this.handleClose();
                      data.bersihkanFormulirMurid(e);
                      this.setState({ perbarui: false });
                    }}
                    color="primary"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={async e => {
                      this.handleClose();
                      await data.masukkanFormulirMurid(e, this.state.perbarui);
                      this.setState({ perbarui: false });
                    }}
                    color="primary"
                  >
                    Masukkan
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
          {value === 2 && (
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
                  { title: "Murid-murid", field: "murid_murid" }
                ]}
                data={data_kelas.state.semua_kelas}
                title="Data Kelas"
                actions={[
                  {
                    icon: "edit",
                    tooltip: "perbarui",
                    onClick: (e, data) => this.handleEdit(3, data)
                  },
                  {
                    icon: "delete_outline",
                    tooltip: "hapus",
                    onClick: (e, data) => this.handleDeleteData(3, data)
                  }
                ]}
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
                    value={data_kelas.state.formulirDataKelas.nama}
                    onChange={event =>
                      data_kelas.perbaruiNamaKelas(event.currentTarget.value)
                    }
                  />
                  <div className={classes.tanggal}>
                    <TextField
                      margin="dense"
                      id="tanggal"
                      label="Tanggal"
                      type="date"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={data_kelas.state.formulirDataKelas.tanggal}
                      onChange={event =>
                        data_kelas.perbaruiTanggalKelas(
                          event.currentTarget.value
                        )
                      }
                    />
                    <TextField
                      margin="dense"
                      InputLabelProps={{
                        shrink: true
                      }}
                      label="Tanggal Hijryah"
                      value={moment(
                        data_kelas.state.formulirDataKelas.tanggal
                      ).format("iYYYY/iM/iD")}
                      fullWidth
                      disabled
                    />
                  </div>
                  <MaterialSelect
                    label="Murid"
                    isMulti
                    value={data_kelas.state.formulirDataKelas.murid_di_kelas}
                    onChange={v => data_kelas.perbaruiMuridKelas(v)}
                    pilihan={data.state.pilihanMurid}
                  />
                  <div style={{ paddingBottom: 300 }} />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={e => {
                      this.handleClose();
                      data_kelas.bersihkanFormulirKelas(e);
                      this.setState({ perbarui: false });
                    }}
                    color="primary"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={async e => {
                      this.handleClose();
                      data_kelas.masukkanFormulirKelas(e, this.state.perbarui);
                      this.setState({ perbarui: false });
                    }}
                    color="primary"
                  >
                    Masukkan
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
          {value === 3 && (
            <div style={{ width: "100%" }}>
              <MaterialTable
                columns={[
                  { title: "No. Ujian", field: "no", type: "numeric" },
                  { title: "Judul", field: "judul" },
                  { title: "Mata Pelajaran", field: "nama_mapel" },
                  { title: "Tanggal", field: "tanggal" },
                  { title: "Lama Waktu", field: "waktu" },
                  { title: "Guru", field: "string_guru" },
                  { title: "Ujian", field: "string_kelas_kelas_ujian" }
                ]}
                data={data_ujian.state.semua_ujian}
                title="Data Ujian"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const gabungan = compose(
  withStyles(hiasan),
  Containers([ContainerDataPengguna, ContainerDataKelas, ContainerDataUjian])
);
export default gabungan(DataUtama);
