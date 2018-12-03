// @flow
import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";
import { history } from "../material/BrowserRouter";

// type KunciGembok = {
//   no: number,
//   tipe: string
// };

class ContainerGembok extends Container {
  state = {
    no: "",
    kunci: "",
    tipe: ""
  };

  PerbaruiNo(no) {
    this.setState({ no });
  }

  PerbaruiKunci(kunci) {
    this.setState({ kunci });
  }

  async bukaGembok() {
    try {
      const result = await Axios.post(Data.url + "/pengguna/masuk", {
        no: this.state.no,
        kunci: this.state.kunci
      });
      await this.setState({
        kunci: "",
        tipe: result.data.tipe
      });
      window.localStorage.setItem("no", this.state.no);
      window.localStorage.setItem("tipe", this.state.tipe);
      window.localStorage.setItem("nama", result.data.nama);
      console.log(result.data);
      if (this.state.tipe === "admin") return history.replace("/data-utama");
      if (this.state.tipe === "guru") return history.replace("/menu-guru");
      if (this.state.tipe === "murid") return history.replace("/ujian");
    } catch (error) {
      // console.log(error.response);
      // console.log(result.status);
      if (error.response === undefined) {
        return swal(
          "Maaf ada kendala di pelayanan server",
          "Silahkan hubungi admin, insyaAllah akan ditangani",
          "error"
        );
      }
      if (error.response.status === 404) {
        return swal(
          "No. Pengguna tidak ditemukan",
          "Silahkan coba kembali",
          "warning"
        );
      }
      if (error.response.status === 401) {
        return swal("Kunci tidak sesuai", "Silahkan coba kembali", "warning");
      }
    }
  }
}
export default ContainerGembok;
