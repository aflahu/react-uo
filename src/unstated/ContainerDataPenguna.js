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
      no: undefined,
      nama: "",
      kunci: ""
    },
    formulirDataMurid: {
      no: undefined,
      nama: "",
      kunci: ""
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
  masukkanFormulirGuru() {
    console.log(this.state.formulirDataGuru);
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
  masukkanFormulirMurid() {
    console.log(this.state.formulirDataMurid);
  }
}
export default ContainerDataPengguna;
