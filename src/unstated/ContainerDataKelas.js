import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataKelas extends Container {
  state = {
    semua_kelas: [],
    formulirDataKelas: {
      nama: "",
      tanggal: "",
      murid_di_kelas: []
    }
  };
  async ambilDataSemuaKelas() {
    try {
      const result = await Axios.get(Data.url + "/kelas");
      const data = result.data;
      if (data.length > 0 && data[0].murid_di_kelas !== undefined) {
        for (const u in data) {
          data[u].murid_murid = data[u].murid_di_kelas
            .map(i => i.nama)
            .toString();
        }
      }
      await this.setState({ semua_kelas: data });
      console.log(data);
    } catch (error) {
      if (error.response === undefined) {
        return swal(
          "Maaf ada kendala di pelayanan server",
          "Silahkan hubungi admin, Semoga Allah mempermudah anda",
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
    console.log(murid_di_kelas);
    await this.setState(sebelumnya => ({
      formulirDataKelas: {
        ...sebelumnya.formulirDataKelas,
        murid_di_kelas
      }
    }));
    console.log(this.state.formulirDataKelas);
  }
  async bersihkanFormulirKelas(e) {
    e.preventDefault();
    await this.setState({
      formulirDataKelas: { nama: "", tanggal: "", murid_di_kelas: [] }
    });
  }
  async masukkanFormulirKelas(e) {
    e.preventDefault();
    const data = {
      ...this.state.formulirDataKelas,
      murid_di_kelas: this.state.formulirDataKelas.murid_di_kelas.map(
        i => i.value
      )
    };
    try {
      Axios.post(Data.url + "/kelas", data);
      await this.setState({
        formulirDataKelas: { nama: "", tanggal: "", murid_di_kelas: [] }
      });
      await new Promise(res => setTimeout(res, 3000));
      await this.ambilDataSemuaKelas();
    } catch (error) {
      swal("Silahkan perbaiki data masukan", "", "error");
    }
  }
}
export default ContainerDataKelas;
