import React, { Component } from "react";
import { Paper, withStyles, AppBar, Tabs, Tab } from "@material-ui/core";
import MaterialTable from "material-table";

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
  }
});

class MenuGuru extends Component {
  state = {
    value: 0
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
        {/* <Paper className={classes.media}> */}
        {value === 0 && (
          <div style={{ width: "100%" }}>
            <MaterialTable
              columns={[
                { title: "No. Kelas", field: "no", type: "numeric" },
                { title: "Nama", field: "nama" },
                { title: "Tanggal", field: "tanggal" },
                { title: "Murid-murid", field: "murid_di_kelas" },
                { title: "Ujian", field: "ujian" }
              ]}
              data={[
                {
                  no: 123,
                  nama: "123",
                  tanggal: 1487,
                  murid_di_kelas: 1487,
                  ujian: 123
                }
              ]}
              title="Data Kelas"
            />
          </div>
        )}
        {value === 1 && (
          <div style={{ width: "100%" }}>
            <MaterialTable
              columns={[
                { title: "No. Ujian", field: "no", type: "numeric" },
                { title: "Judul", field: "judul" },
                { title: "Mata Pelajaran", field: "nama_mapel" },
                { title: "Tanggal", field: "tanggal" },
                { title: "Lama Waktu", field: "waktu" },
                { title: "Guru", field: "guru" },
                { title: "Kelas kelas ujian", field: "kelas_kelas_ujian" }
                // data soal
                // data nilai
              ]}
              data={[
                {
                  no: 123,
                  judul: "123",
                  nama_mapel: 1487,
                  tanggal: 1487,
                  waktu: 123,
                  guru: "123",
                  kelas_kelas_ujian: 123
                }
              ]}
              title="Data Ujian"
            />
          </div>
        )}
        {value === 2 && (
          <div style={{ width: "100%" }}>
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
              data={[
                {
                  no: 123,
                  soal: "123",
                  pilihan_1: 1487,
                  pilihan_2: 1487,
                  pilihan_3: 1487,
                  pilihan_4: 1487,
                  jawaban: 1487,
                  nilai: 123,
                  ujian: "123"
                }
              ]}
              title="Data Soal"
            />
          </div>
        )}
        {/* </Paper> */}
      </div>
    );
  }
}
export default withStyles(hiasan)(MenuGuru);
