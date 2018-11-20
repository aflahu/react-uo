import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataPengguna extends Container {
  state = {
    admin: [],
    guru: [],
    murid: [],
    formulirDataGuru: {
      no: "",
      nama: "",
      kunci: "",
      tipe: "guru"
    },
    formulirDataMurid: {
      no: "",
      nama: "",
      kunci: "",
      tipe: "murid"
    }
  };

  async ambilDataGuru() {
    try {
      const result = await Axios.get(Data.url + "/pengguna/tipe/guru");
      await this.setState({ guru: result.data });
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

  async ambilDataMurid() {
    try {
      const result = await Axios.get(Data.url + "/pengguna/tipe/murid");
      await this.setState({ murid: result.data });
    } catch (error) {
      if (error.response === undefined) {
        return swal(
          "Tidak terhubung ke server",
          "Silahkan hubungi admin",
          "error"
        );
      }
    }
  }

  async ambilDataAdmin() {
    try {
      const result = await Axios.get(Data.url + "/pengguna/tipe/admin");
      await this.setState({ admin: result.data });
    } catch (error) {
      if (error.response === undefined) {
        return swal(
          "Tidak terhubung ke server",
          "Silahkan hubungi admin",
          "error"
        );
      }
    }
  }

  // fromulir untuk data Guru
  perbaruiNoGuru(no) {
    this.setState(sebelumnya => ({
      formulirDataGuru: { ...sebelumnya.formulirDataGuru, no }
    }));
  }
  perbaruiNamaGuru(nama) {
    this.setState(sebelumnya => ({
      formulirDataGuru: { ...sebelumnya.formulirDataGuru, nama }
    }));
  }
  perbaruiKunciGuru(kunci) {
    this.setState(sebelumnya => ({
      formulirDataGuru: { ...sebelumnya.formulirDataGuru, kunci }
    }));
  }
  async bersihkanFormulirMurid(e) {
    e.preventDefault();
    await this.setState({
      formulirDataMurid: { no: undefined, nama: "", kunci: "", tipe: "murid" }
    });
    await this.ambilDataMurid();
  }
  async masukkanFormulirMurid(e) {
    e.preventDefault();
    try {
      await Axios.post(Data.url + "/pengguna", this.state.formulirDataMurid);
      await this.setState({
        formulirDataMurid: { no: undefined, nama: "", kunci: "", tipe: "murid" }
      });
    } catch (error) {
      swal("Silahkan perbaiki data masukan", "", "error");
    }
  }

  // fromulir untuk data Murid
  perbaruiNoMurid(no) {
    this.setState(sebelumnya => ({
      formulirDataMurid: { ...sebelumnya.formulirDataMurid, no }
    }));
  }
  perbaruiNamaMurid(nama) {
    this.setState(sebelumnya => ({
      formulirDataMurid: { ...sebelumnya.formulirDataMurid, nama }
    }));
  }
  perbaruiKunciMurid(kunci) {
    this.setState(sebelumnya => ({
      formulirDataMurid: { ...sebelumnya.formulirDataMurid, kunci }
    }));
  }
  async bersihkanFormulirGuru(e) {
    e.preventDefault();
    await this.setState({
      formulirDataGuru: { no: "", nama: "", kunci: "", tipe: "guru" }
    });
  }
  async masukkanFormulirGuru(e) {
    e.preventDefault();
    try {
      await Axios.post(Data.url + "/pengguna", this.state.formulirDataGuru);
      await this.setState({
        formulirDataGuru: { no: "", nama: "", kunci: "", tipe: "guru" }
      });
      await this.ambilDataGuru();
    } catch (error) {
      swal("Silahkan perbaiki data masukan", "", "error");
    }
  }
}
export default ContainerDataPengguna;
