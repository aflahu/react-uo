import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataSoal extends Container {
  state = {
    semua_soal: []
  };

  async ambilDataSemuaSoal() {
    try {
      const result = await Axios.get(Data.url + "/soal");
      await this.setState({ semua_soal: result.data });
    } catch (error) {
      if (error.response === undefined) {
        return swal(
          "Maaf ada kendala di pelayanan server",
          "Silahkan hubungi admin, insyaAllah akan ditangani",
          "error"
        );
      }
    }
  }
}
export default ContainerDataSoal;
