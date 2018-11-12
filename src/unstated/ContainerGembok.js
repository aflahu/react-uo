// @flow
import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

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
    } catch (error) {
      // console.log(error.response.status);
      // console.log(result.status);
      if (error.response.status === 404) {
        swal("No tidak ditemukan", "silahkan coba kembali", "warning");
      }
      if (error.response.status === 401) {
        swal("Kunci tidak sesuai", "silahkan coba kembali", "warning");
      }
    }
  }
}
export default ContainerGembok;
