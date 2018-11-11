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
                { title: "Adı", field: "name" },
                { title: "Soyadı", field: "surname" },
                { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
                {
                  title: "Doğum Yeri",
                  field: "birthCity",
                  lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
                }
              ]}
              data={[
                {
                  name: "sda",
                  surname: "asdsa",
                  birthYear: 1487,
                  birthCity: 63
                },
                {
                  name: "sda",
                  surname: "asdsa",
                  birthYear: 1487,
                  birthCity: 63
                }
              ]}
              title="Demo Title"
            />
          </div>
        )}
        {value === 1 && <div>Item Two</div>}
        {value === 2 && <div>Item Three</div>}
        {/* </Paper> */}
      </div>
    );
  }
}
export default withStyles(hiasan)(MenuGuru);
