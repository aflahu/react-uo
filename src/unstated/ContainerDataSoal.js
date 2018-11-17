import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataSoal extends Container {
  state = {
    semua_soal: [],
    formulirDataSoal: {
      soal: "",
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
  perbaruiSoalUjian(soal) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, soal }
    }));
  }
  perbaruiPilihan1Ujian(pilihan_1) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, pilihan_1 }
    }));
  }
  perbaruiPilihan2Ujian(pilihan_2) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, pilihan_2 }
    }));
  }
  perbaruiPilihan3Ujian(pilihan_3) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, pilihan_3 }
    }));
  }
  perbaruiPilihan4Ujian(pilihan_4) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, pilihan_4 }
    }));
  }
  perbaruiJawabanUjian(jawaban) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, jawaban }
    }));
  }
  perbaruiNilaiUjian(nilai) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, nilai }
    }));
  }
  masukkanFormulirUjian() {
    console.log(this.state.formulirDataSoal);
  }
}
export default ContainerDataSoal;
