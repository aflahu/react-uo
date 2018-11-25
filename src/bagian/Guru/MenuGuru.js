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
import { compose } from "recompose";
import Containers from "unstated-connect";
import ContainerDataPengguna from "../../unstated/ContainerDataPenguna";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

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

// const pilihan_jawaban = [
//   { value: "pilhan_1", label: "Pilihan 1" },
//   { value: "pilhan_2", label: "Pilihan 2" },
//   { value: "pilhan_3", label: "Pilihan 3" },
//   { value: "pilhan_4", label: "Pilihan 4" }
// ];

class MenuGuru extends Component {
  state = {
    value: 0,
    formulir: 0
  };
  async componentDidMount() {
    const [data, data_soal, data_kelas, data_ujian] = this.props.containers;
    await data_soal.ambilDataSemuaSoal();
    await data_kelas.ambilDataSemuaKelas();
    await data_ujian.ambilDataSemuaUjian();
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
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const [data, data_soal, data_kelas, data_ujian] = this.props.containers;
    return (
      <div className={classes.utama}>
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
                  onClick: () => null
                },
                {
                  icon: "delete_outline",
                  tooltip: "hapus",
                  onClick: () => null
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
                <TextField
                  margin="dense"
                  id="tanggal"
                  label="Tanggal"
                  fullWidth
                  value={data_kelas.state.formulirDataKelas.tanggal}
                  onChange={event =>
                    data_kelas.perbaruiTanggalKelas(event.currentTarget.value)
                  }
                />
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
                    data_kelas.masukkanFormulirKelas(e);
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
                  icon: "edit",
                  tooltip: "perbarui",
                  onClick: () => null
                },
                {
                  icon: "delete_outline",
                  tooltip: "hapus",
                  onClick: () => null
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
                Tambah Data Ujian
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
                <TextField
                  margin="dense"
                  id="tanggal"
                  label="Tanggal"
                  fullWidth
                  value={data_ujian.state.formulirDataUjian.tanngal}
                  onChange={event =>
                    data_ujian.perbaruiTanggalUjian(event.currentTarget.value)
                  }
                />
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
                  value={data_ujian.state.formulirDataUjian.kelas}
                  onChange={value => data_ujian.perbaruiKelasUjian(value)}
                  pilihan={data_kelas.state.pilihan_kelas}
                />
                <MaterialSelect
                  label="Soal"
                  isMulti
                  value={data_ujian.state.formulirDataUjian.soal}
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
                    data_ujian.masukkanFormulirUjian(e);
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
                  onClick: () => null
                },
                {
                  icon: "delete_outline",
                  tooltip: "hapus",
                  onClick: () => null
                }
              ]}
            />
            <Dialog
              open={this.state.formulir === 3}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              scroll="body"
            >
              <DialogTitle id="form-dialog-title">Tambah Data Soal</DialogTitle>
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
                  autoFocus
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
                    data_soal.masukkanFormulirSoal(e);
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
    );
  }
}

const gabungan = compose(
  withStyles(hiasan),
  Containers([
    ContainerDataPengguna,
    ContainerDataSoal,
    ContainerDataKelas,
    ContainerDataUjian
  ])
);
export default gabungan(MenuGuru);
