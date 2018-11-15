import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataUjian extends Container {
  state = {
    semua_ujian: []
  };

  async ambilDataSemuaUjian() {
    try {
      const result = await Axios.get(Data.url + "/ujian");
      await this.setState({ semua_ujian: result.data });
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
export default ContainerDataUjian;
