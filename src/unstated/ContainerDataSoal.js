import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataSoal extends Container {
  state = {
    semua_soal: [],
    formulirDataSoal: {
      soal: "",
      tanda: "",
      pilihan_1: "",
      pilihan_2: "",
      pilihan_3: "",
      pilihan_4: "",
      jawaban: "",
      nilai_soal: undefined
    }
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
  perbaruiSoalSoal(soal) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, soal }
    }));
  }
  perbaruiTandaSoal(tanda) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, tanda }
    }));
  }
  perbaruiPilihan1Soal(pilihan_1) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, pilihan_1 }
    }));
  }
  perbaruiPilihan2Soal(pilihan_2) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, pilihan_2 }
    }));
  }
  perbaruiPilihan3Soal(pilihan_3) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, pilihan_3 }
    }));
  }
  perbaruiPilihan4Soal(pilihan_4) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, pilihan_4 }
    }));
  }
  perbaruiJawabanSoal(jawaban) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, jawaban }
    }));
  }
  perbaruiNilaiSoal(nilai) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, nilai }
    }));
  }
  async bersihkanFormulirSoal(e) {
    e.preventDefault();
    await this.setState({
      formulirDataSoal: {
        soal: "",
        tanda: "",
        pilihan_1: "",
        pilihan_2: "",
        pilihan_3: "",
        pilihan_4: "",
        jawaban: "",
        nilai_soal: undefined
      }
    });
  }
  async masukkanFormulirSoal(e) {
    e.preventDefault();
    console.log(await this.state.formulirDataSoal);
    await this.setState({
      formulirDataSoal: {
        soal: "",
        tanda: "",
        pilihan_1: "",
        pilihan_2: "",
        pilihan_3: "",
        pilihan_4: "",
        jawaban: "",
        nilai_soal: undefined
      }
    });
  }
}
export default ContainerDataSoal;
