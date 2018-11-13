import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  withStyles
} from "@material-ui/core";
import { Subscribe } from "unstated";
import ContainerGembok from "../unstated/ContainerGembok";
import { history } from "../material/BrowserRouter";

const hiasan = theme => ({
  utama: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    float: "left",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 17,
    paddingRight: theme.spacing.unit * 17,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  media: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  tombol: {
    marginTop: theme.spacing.unit * 3
  }
});

class MasukPagar extends Component {
  componentWillMount() {
    if (window.localStorage.getItem("tipe")) {
      if (window.localStorage.getItem("tipe") === "admin")
        return history.replace("/data-utama");
      if (window.localStorage.getItem("tipe") === "guru")
        return history.replace("/menu-guru");
      if (window.localStorage.getItem("tipe") === "murid")
        return history.replace("/ujian");
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.utama}>
        <Paper className={classes.media}>
          <Typography component="h1" variant="h5">
            Silahkan Di Isi
          </Typography>
          <Subscribe to={[ContainerGembok]}>
            {gembok => (
              <div className={classes.formulir}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="no">No. Pengguna</InputLabel>
                  <Input
                    id="no"
                    name="no"
                    type="number"
                    value={gembok.state.no}
                    onChange={event => {
                      gembok.PerbaruiNo(event.currentTarget.value);
                    }}
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="kunci">Kunci</InputLabel>
                  <Input
                    id="kunci"
                    name="kunci"
                    type="password"
                    value={gembok.state.kunci}
                    onChange={event => {
                      gembok.PerbaruiKunci(event.currentTarget.value);
                    }}
                  />
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.tombol}
                  onClick={() => gembok.bukaGembok()}
                >
                  Masuk
                </Button>
              </div>
            )}
          </Subscribe>
        </Paper>
      </div>
    );
  }
}
export default withStyles(hiasan)(MasukPagar);
