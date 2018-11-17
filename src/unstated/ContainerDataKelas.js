import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataKelas extends Container {
  state = {
    semua_kelas: [],
    formulirDataKelas: {
      nama: "",
      tanggal: undefined,
      murid_di_kelas: []
    }
  };
  async ambilDataSemuaKelas() {
    try {
      const result = await Axios.get(Data.url + "/kelas");
      await this.setState({ semua_kelas: result.data });
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
  perbaruiNamaKelas(nama) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, nama }
    }));
  }
  perbaruiTanggalKelas(tanggal) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, tanggal }
    }));
  }
  perbaruiMuridKelas(murid_di_kelas) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, murid_di_kelas }
    }));
  }
  masukkanFormulirKelas() {
    console.log(this.state.formulirDataKelas);
  }
}
export default ContainerDataKelas;
