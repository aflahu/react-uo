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
    no_soal: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19
    ],
    ujian: null
  };
  componentDidMount() {
    const no_ujian = window.localStorage.getItem("no_ujian");
    if (!no_ujian) history.replace("/ujian");
    const mulai = window.localStorage.getItem("mulai");
    const waktu = window.localStorage.getItem("waktu");
    const soal = window.localStorage.getItem("soal_ujian");
    console.log(soal);
    // if() {
    //   this.kumpulkan()
    // }
    // this.setState({ ujian });
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
    return (
      <div className={classes.utama}>
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
            {this.state.no_soal.map((item, index) => (
              <Button
                color="secondary"
                variant="outlined"
                key={index}
                className={classes.sudah}
              >
                {item}
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
            pertanyaan asd as sdasd asdsadsa dsa dasdsad sadasdsadsadsadsa sad
            sad sadas dsad sad sad sad sad sad sad sad sad sad{" "}
          </Typography>
          <FormControl component="fieldset" className={classes.formControl}>
            {/* <FormLabel component="legend">Gender</FormLabel> */}
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
              <FormControlLabel
                value="disabled"
                control={<Radio />}
                label="(Disabled option)"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper className={classes.media}>
          <Button size="large" variant="contained" color="secondary">
            Kembali
          </Button>
          <Button disabled>
            {"1" + "/" + (window.localStorage.getItem("soal_ujian").length + 1)}
          </Button>
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
            20 menit
          </Button>
        </Paper>
      </div>
    );
  }
}
export default withStyles(hiasan)(Soal);
