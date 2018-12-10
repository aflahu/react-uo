import React, { Component } from "react";
import {
  Paper,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  withStyles
} from "@material-ui/core";
import { history } from "../../material/BrowserRouter";
import moment from "moment-hijri";

const hiasan = theme => ({
  utama: {
    display: "grid",
    gridTemplateColumns: "auto minmax(1fr,1200px) auto"
  },
  media: {
    gridColumn: 2,
    maxWidth: 1200,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    marginBottom: 19
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  sudah: {
    // backgroundColor: "black"
  },
  pertanyaan: {
    fontSize: 21
  }
});

class Soal extends Component {
  state = {
    value: "female",
    no_soal_sekarang: 0,
    ujian: null,
    jam: null,
    menit: 0,
    detik: 0,
    soal: []
  };
  componentDidMount() {
    const no_ujian = window.localStorage.getItem("no_ujian");
    if (!no_ujian) history.replace("/ujian");
    const mulai = parseInt(window.localStorage.getItem("mulai"));
    const waktu = parseInt(window.localStorage.getItem("waktu_ujian"));
    const habis = moment(new Date(mulai)).add(1, "m");
    const soal = JSON.parse(window.localStorage.getItem("soal_ujian"));
    this.setState({ soal });
    // console.log(soal);
    // console.log(this.state.soal);
    // const sisa = moment.duration(habis.diff(new moment()));
    // console.log(sisa._data.minutes + " " + sisa._data.seconds);
    this.timer = setInterval(() => this.perbaruiWaktu(habis), 1000);
    // if() {
    //   this.kumpulkan()))
    // }
    // this.setState({ ujian });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  perbaruiWaktu(habis) {
    const jam = moment.duration(habis.diff(new moment()))._data.hours;
    const menit = moment.duration(habis.diff(new moment()))._data.minutes;
    const detik = moment.duration(habis.diff(new moment()))._data.seconds;
    const milis = moment.duration(habis.diff(new moment()))._milliseconds;
    this.setState({ jam, menit, detik });
    if (milis < 0) this.kumpulkan();
  }

  perbaruiNoSoalSekarang(no_soal_sekarang) {
    this.setState({ no_soal_sekarang });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  kumpulkan = () => {
    window.localStorage.removeItem("no_ujian");
    window.localStorage.removeItem("judul_ujian");
    window.localStorage.removeItem("nama_mapel");
    window.localStorage.removeItem("soal_ujian");
    window.localStorage.removeItem("waktu_ujian");
    window.localStorage.removeItem("mulai");
    history.replace("/ujian");
  };

  render() {
    const { classes } = this.props;
    const { soal, no_soal_sekarang } = this.state;
    return (
      <div className={classes.utama}>
        <div style={{ gridColumn: 3 }} />
        <Paper className={classes.media}>
          <Typography variant="headline">
            {window.localStorage.getItem("nama")}
          </Typography>
          <Typography variant="headline">
            Anda sedang ujian: {window.localStorage.getItem("judul_ujian")}
          </Typography>
          <Typography variant="headline">
            Mata pelajaran: {window.localStorage.getItem("nama_mapel")}
          </Typography>
        </Paper>
        <Paper className={classes.media}>
          <div>
            {soal.map((item, index) => (
              <Button
                color="secondary"
                variant="outlined"
                key={index}
                className={classes.sudah}
                onClick={() => this.perbaruiNoSoalSekarang(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </Paper>
        <Paper className={classes.media}>
          <Typography
            variant="display2"
            color="textPrimary"
            className={classes.pertanyaan}
          >
            {soal[no_soal_sekarang] && soal[no_soal_sekarang].soal}
          </Typography>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value={"pilihan_1"}
                control={<Radio />}
                label={
                  soal[no_soal_sekarang] && soal[no_soal_sekarang].pilihan_1
                }
              />
              <FormControlLabel
                value={"pilihan_2"}
                control={<Radio />}
                label={
                  soal[no_soal_sekarang] && soal[no_soal_sekarang].pilihan_2
                }
              />
              <FormControlLabel
                value={"pilihan_3"}
                control={<Radio />}
                label={
                  soal[no_soal_sekarang] && soal[no_soal_sekarang].pilihan_3
                }
              />
              <FormControlLabel
                value={"pilihan_4"}
                control={<Radio />}
                label={
                  soal[no_soal_sekarang] && soal[no_soal_sekarang].pilihan_4
                }
              />
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper className={classes.media}>
          <Button size="large" variant="contained" color="secondary">
            Kembali
          </Button>
          <Button disabled>{"1" + "/" + this.state.soal.length}</Button>
          <Button size="large" variant="contained" color="secondary">
            Selanjutnya
          </Button>
          <Button
            style={{ float: "right" }}
            size="large"
            variant="contained"
            color="primary"
            onClick={this.kumpulkan}
          >
            Kumpulkan
          </Button>
          <Button style={{ float: "right" }} variant="text" disabled>
            {(this.state.jam && this.state.jam + "jam :") || ""}{" "}
            {this.state.menit} menit : {this.state.detik} detik
          </Button>
        </Paper>
      </div>
    );
  }
}
export default withStyles(hiasan)(Soal);
