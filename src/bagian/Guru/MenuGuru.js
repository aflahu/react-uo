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
  Dialog,
  Toolbar,
  Typography,
  Tooltip
} from "@material-ui/core";
import MaterialTable from "material-table";
import ContainerDataKelas from "../../unstated/ContainerDataKelas";
import ContainerDataUjian from "../../unstated/ContainerDataUjian";
import ContainerDataSoal from "../../unstated/ContainerDataSoal";
import { Subscribe } from "unstated";
import AddIcon from "@material-ui/icons/Add";
import MaterialSelect from "../../material/MaterialSelect";
import { compose } from "recompose";
import Containers from "unstated-connect";
import ContainerDataPengguna from "../../unstated/ContainerDataPenguna";
import Keluar from "@material-ui/icons/ExitToApp";
import EditIcon from "@material-ui/icons/Edit";

import { history } from "../../material/BrowserRouter";
import moment from "moment-hijri";
import ContainerDataNilai from "../../unstated/ContainerDataNilai";

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

class MenuGuru extends Component {
  state = {
    value: 0,
    formulir: 0,
    perbarui: false,
    formulir_nilai: false,
    akun: false
  };
  async componentDidMount() {
    const [data, data_soal, data_kelas, data_ujian] = this.props.containers;
    await data_soal.ambilDataSemuaSoal();
    await data_kelas.ambilDataSemuaKelas();
    await data_ujian.ambilDataSemuaUjian(
      parseInt(window.localStorage.getItem("no"))
    );
  }
  handleClickOpen = async f => {
    this.setState({ formulir: f });
    const [data, data_soal, data_kelas, data_ujian] = this.props.containers;
    await data.pilihanMurid();
    await data.pilihanGuru();
    await data_kelas.pilihanKelas();
    await data_soal.pilihanSoal();
  };

  handleClose = () => {
    this.setState({ formulir: 0 });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleNilai = async (formulir_nilai, val) => {
    const [
      data,
      data_soal,
      data_kelas,
      data_ujian,
      data_nilai
    ] = this.props.containers;
    await this.setState({ formulir_nilai });
    if (val) {
      await data_nilai.ambilNilaiDariUjian(val.no);
    }
  };
  handleEdit = (f, dataFormulir) => {
    this.setState({ formulir: f, perbarui: true });
    const [data, data_soal, data_kelas, data_ujian] = this.props.containers;
    if (f === 1) data_kelas.mengisiFromulirKelas(dataFormulir);
    if (f === 2) data_ujian.mengisiFromulirUjian(dataFormulir);
    if (f === 3) data_soal.mengisiFromulirSoal(dataFormulir);
    data.pilihanMurid();
    data.pilihanGuru();
    data_kelas.pilihanKelas();
    data_soal.pilihanSoal();
  };
  handleDeleteData = (f, dataFormulir) => {
    const [data, data_soal, data_kelas, data_ujian] = this.props.containers;
    if (f === 1) data_kelas.menghapusDataKelas(dataFormulir);
    if (f === 2) data_ujian.menghapusDataUjian(dataFormulir);
    if (f === 3) data_soal.menghapusDataSoal(dataFormulir);
  };
  keluarApp = () => {
    window.localStorage.clear();
    return history.replace("/");
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const [
      data,
      data_soal,
      data_kelas,
      data_ujian,
      data_nilai
    ] = this.props.containers;
    return (
      <div className={classes.utama}>
        <AppBar position="static" className={classes.palang}>
          <Toolbar>
            <Tooltip title="Keluar">
              <IconButton color="inherit" onClick={this.keluarApp}>
                <Keluar />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              {window.localStorage.getItem("nama") +
                " | " +
                window.localStorage.getItem("tipe")}
            </Typography>
            <Tooltip title="Perbarui akun">
              <IconButton
                color="inherit"
                onClick={() => {
                  this.setState({ akun: !this.state.akun });
                  data.ambilDataPengguna();
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
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
        </AppBar>
        <div className={classes.tengah}>
          <AppBar position="static" elevation={7}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Data Kelas" />
              <Tab label="Data Ujian" />
              <Tab label="Data Soal" />
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
                  { title: "No. Kelas", field: "no", type: "numeric" },
                  { title: "Nama", field: "nama" },
                  { title: "Tanggal", field: "tanggal" },
                  { title: "Murid-murid", field: "murid_murid" },
                  { title: "Ujian", field: "string_ujian" }
                ]}
                data={data_kelas.state.semua_kelas}
                title="Data Kelas"
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
                scroll="body"
              >
                <DialogTitle id="form-dialog-title">
                  Formulir Data Kelas
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
                      value={moment(
                        data_kelas.state.formulirDataKelas.tanggal,
                        "iM/iD/iYYYY"
                      ).format("YYYY-MM-DD")}
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
                      value={data_kelas.state.formulirDataKelas.tanggal}
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
                    }}
                    color="primary"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={e => {
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
          {value === 1 && (
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
                  { title: "Guru", field: "string_guru" },
                  {
                    title: "Kelas kelas ujian",
                    field: "string_kelas_kelas_ujian"
                  }
                ]}
                data={data_ujian.state.semua_ujian}
                title="Data Ujian"
                actions={[
                  {
                    icon: "report",
                    tooltip: "nilai",
                    onClick: (e, data) => this.handleNilai(true, data)
                  },
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
                scroll="body"
              >
                <DialogTitle id="form-dialog-title">
                  Formulir Data Ujian
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="judul"
                    label="Judul"
                    fullWidth
                    value={data_ujian.state.formulirDataUjian.judul}
                    onChange={event =>
                      data_ujian.perbaruiJudulUjian(event.currentTarget.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    id="nama_mapel"
                    label="Nama mata pelajaran"
                    fullWidth
                    value={data_ujian.state.formulirDataUjian.nama_mapel}
                    onChange={event =>
                      data_ujian.perbaruiMapelUjian(event.currentTarget.value)
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
                      value={moment(
                        data_ujian.state.formulirDataUjian.tanggal,
                        "iM/iD/iYYYY"
                      ).format("YYYY-MM-DD")}
                      onChange={event =>
                        data_ujian.perbaruiTanggalUjian(
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
                      value={data_ujian.state.formulirDataUjian.tanggal}
                      fullWidth
                      disabled
                    />
                  </div>
                  <TextField
                    margin="dense"
                    id="waktu"
                    label="Waktu"
                    type="number"
                    fullWidth
                    value={data_ujian.state.formulirDataUjian.waktu}
                    onChange={event =>
                      data_ujian.perbaruiWaktuUjian(event.currentTarget.value)
                    }
                  />
                  {/* <MaterialSelect
                  label="Guru"
                  value={data_ujian.state.formulirDataUjian.guru}
                  onChange={value => data_ujian.perbaruiGuruUjian(value)}
                  pilihan={data.state.pilihan_guru}
                />*/}
                  <MaterialSelect
                    label="Kelas"
                    isMulti
                    value={data_ujian.state.formulirDataUjian.kelas_kelas_ujian}
                    onChange={value => data_ujian.perbaruiKelasUjian(value)}
                    pilihan={data_kelas.state.pilihan_kelas}
                  />
                  <MaterialSelect
                    label="Soal"
                    isMulti
                    value={data_ujian.state.formulirDataUjian.soal_ujian}
                    onChange={value => data_ujian.perbaruiSoalUjian(value)}
                    pilihan={data_soal.state.pilihan_soal}
                  />
                  <div style={{ paddingBottom: 300 }} />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={e => {
                      this.handleClose();
                      data_ujian.bersihkanFormulirUjian(e);
                    }}
                    color="primary"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={e => {
                      this.handleClose();
                      data_ujian.masukkanFormulirUjian(e, this.state.perbarui);
                      this.setState({ perbarui: false });
                    }}
                    color="primary"
                  >
                    Masukkan
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={this.state.formulir_nilai}
                onClose={() => this.handleNilai(true)}
              >
                <DialogContent>
                  <MaterialTable
                    columns={[
                      { title: "NIM", field: "nim" },
                      { title: "Nama", field: "string_nama" },
                      { title: "Siswa Waktu", field: "sisa_waktu" },
                      { title: "Nilai", field: "nilai" }
                    ]}
                    data={data_nilai.state.nilai_dari_ujian}
                    title="Nilai Murid"
                    options={{ exportButton: true }}
                    actions={[
                      {
                        icon: "delete_outline",
                        tooltip: "hapus",
                        onClick: (e, data) => data_nilai.hapusNiliaDiNo(data.no)
                      }
                    ]}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      window.location.reload();
                      this.handleNilai(false);
                    }}
                    color="primary"
                  >
                    Tutup
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
                  { title: "No. Soal", field: "no", type: "numeric" },
                  { title: "Soal", field: "soal" },
                  { title: "Tanda", field: "tanda" },
                  { title: "Pilihan 1", field: "pilihan_1" },
                  { title: "Pilihan 2", field: "pilihan_2" },
                  { title: "Pilihan 3", field: "pilihan_3" },
                  { title: "Pilihan 4", field: "pilihan_4" },
                  { title: "Jawaban", field: "jawaban" },
                  { title: "Nilai Soal", field: "nilai_soal" },
                  { title: "Ujian", field: "string_ujian" }
                ]}
                data={data_soal.state.semua_soal}
                title="Data Soal"
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
                  Formulir Data Soal
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="soal"
                    label="Pertanyaan"
                    multiline
                    fullWidth
                    value={data_soal.state.formulirDataSoal.soal}
                    onChange={event =>
                      data_soal.perbaruiSoalSoal(event.currentTarget.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    id="tanda"
                    label="Tanda"
                    multiline
                    fullWidth
                    value={data_soal.state.formulirDataSoal.tanda}
                    onChange={event =>
                      data_soal.perbaruiTandaSoal(event.currentTarget.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    id="pilihan_1"
                    label="Pilihan 1"
                    fullWidth
                    value={data_soal.state.formulirDataSoal.pilihan_1}
                    onChange={event =>
                      data_soal.perbaruiPilihan1Soal(event.currentTarget.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    id="pilihan_2"
                    label="Pilihan 2"
                    fullWidth
                    value={data_soal.state.formulirDataSoal.pilihan_2}
                    onChange={event =>
                      data_soal.perbaruiPilihan2Soal(event.currentTarget.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    id="pilihan_3"
                    label="Pilihan 3"
                    fullWidth
                    value={data_soal.state.formulirDataSoal.pilihan_3}
                    onChange={event =>
                      data_soal.perbaruiPilihan3Soal(event.currentTarget.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    id="pilihan_4"
                    label="Pilihan 4"
                    fullWidth
                    value={data_soal.state.formulirDataSoal.pilihan_4}
                    onChange={event =>
                      data_soal.perbaruiPilihan4Soal(event.currentTarget.value)
                    }
                  />
                  <MaterialSelect
                    label="Jawaban"
                    value={data_soal.state.formulirDataSoal.jawaban}
                    onChange={v => data_soal.perbaruiJawabanSoal(v)}
                    pilihan={data_soal.state.pilihan_jawaban}
                  />
                  <TextField
                    margin="dense"
                    id="nilai_soal"
                    label="Nilai"
                    type="number"
                    fullWidth
                    value={data_soal.state.formulirDataSoal.nilai_soal}
                    onChange={event =>
                      data_soal.perbaruiNilaiSoal(event.currentTarget.value)
                    }
                  />

                  <div style={{ paddingBottom: 300 }} />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={e => {
                      this.handleClose();
                      data_soal.bersihkanFormulirSoal(e);
                    }}
                    color="primary"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={e => {
                      this.handleClose();
                      data_soal.masukkanFormulirSoal(e, this.state.perbarui);
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
        </div>
      </div>
    );
  }
}

const gabungan = compose(
  withStyles(hiasan),
  Containers([
    ContainerDataPengguna,
    ContainerDataSoal,
    ContainerDataKelas,
    ContainerDataUjian,
    ContainerDataNilai
  ])
);
export default gabungan(MenuGuru);
