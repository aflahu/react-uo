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
  async perbaruiNamaKelas(nama) {
    await this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, nama }
    }));
  }
  async perbaruiTanggalKelas(tanggal) {
    await this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, tanggal }
    }));
  }
  async perbaruiMuridKelas(murid_di_kelas) {
    await this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, murid_di_kelas }
    }));
  }
  async bersihkanFormulirKelas(e) {
    e.preventDefault();
    await this.setState({
      formulirDataKelas: { nama: "", tanggal: undefined, murid_di_kelas: [] }
    });
  }
  async masukkanFormulirKelas(e) {
    e.preventDefault();
    console.log(await this.state.formulirDataKelas);
    await this.setState({
      formulirDataKelas: { nama: "", tanggal: undefined, murid_di_kelas: [] }
    });
    await this.ambilDataSemuaKelas();
  }
}
export default ContainerDataKelas;
