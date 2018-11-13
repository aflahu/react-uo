import React, { Component } from "react";
import { Paper, withStyles, AppBar, Tabs, Tab } from "@material-ui/core";
import MaterialTable from "material-table";
import { Subscribe } from "unstated";
import ContainerDataPengguna from "../../unstated/ContainerDataPenguna";

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

class DataUtama extends Component {
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
            <Tab label="Data Guru" />
            <Tab label="Data Murid" />
            <Tab label="Data Kelas" />
            <Tab label="Data Ujian" />
          </Tabs>
        </AppBar>
        <Subscribe to={[ContainerDataPengguna]}>
          {data => {
            if (value === 0) {
              data.ambilDataGuru();
              return (
                <div style={{ width: "100%" }}>
                  <MaterialTable
                    columns={[
                      { title: "NIP", field: "no", type: "numeric" },
                      { title: "Nama", field: "nama" },
                      { title: "Menguji", field: "menguji" }
                    ]}
                    data={data.state.guru}
                    title="Data Guru"
                  />
                </div>
              );
            }
            if (value === 1) {
              data.ambilDataMurid();
              return (
                <div style={{ width: "100%" }}>
                  <MaterialTable
                    columns={[
                      { title: "NIS", field: "no", type: "numeric" },
                      { title: "Nama", field: "nama" },
                      { title: "Kelas", field: "kelas_murid" }
                    ]}
                    data={data.state.murid}
                    title="Data Murid"
                  />
                </div>
              );
            }
            if (value === 2)
              return (
                <div style={{ width: "100%" }}>
                  <MaterialTable
                    columns={[
                      { title: "No. Kelas", field: "no", type: "numeric" },
                      { title: "Nama", field: "nama" },
                      { title: "Tanggal", field: "tanggal" },
                      { title: "Murid-murid", field: "murid_di_kelas" }
                    ]}
                    data={[
                      {
                        no: 123,
                        nama: "123",
                        tanggal: 1487,
                        murid_di_kelas: 1487
                      }
                    ]}
                    title="Data Kelas"
                  />
                </div>
              );
            if (value === 3)
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
                    data={[
                      {
                        no: 123,
                        judul: "123",
                        nama_mapel: 1487,
                        tanggal: 1487,
                        waktu: 123,
                        guru: "123",
                        ujian: 123
                      }
                    ]}
                    title="Data Ujian"
                  />
                </div>
              );
          }}
        </Subscribe>
      </div>
    );
  }
}
export default withStyles(hiasan)(DataUtama);
