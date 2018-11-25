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
      nilai_soal: ""
    },
    pilihan_jawaban: [
      { value: "pilihan_1", label: "Pilihan 1" },
      { value: "pilihan_2", label: "Pilihan 2" },
      { value: "pilihan_3", label: "Pilihan 3" },
      { value: "pilihan_4", label: "Pilihan 4" }
    ]
  };

  async ambilDataSemuaSoal() {
    try {
      const result = await Axios.get(Data.url + "/soal");
      let semua_soal = result.data;
      if (semua_soal.length > 0 && semua_soal[0].no_ujian) {
        for (const u in semua_soal) {
          semua_soal[u].string_ujian = semua_soal[u].no_ujian
            .map(i => i.judul)
            .toString();
        }
      }
      console.log(semua_soal);
      await this.setState({ semua_soal });
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
      formulirDataSoal: {
        ...sebelumnya.formulirDataSoal,
        jawaban
      }
    }));
  }
  perbaruiNilaiSoal(nilai_soal) {
    this.setState(sebelumnya => ({
      formulirDataSoal: { ...sebelumnya.formulirDataSoal, nilai_soal }
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
        nilai_soal: ""
      }
    });
  }
  async pilihanSoal() {
    const result = await Axios.get(Data.url + "/soal");
    const pilihan = await result.data.map(isi => {
      const value = isi.no;
      const label = isi.no + " | " + isi.tanda;
      return { value, label };
    });
    this.setState({ pilihan_soal: pilihan });
  }
  async masukkanFormulirSoal(e) {
    e.preventDefault();
    const data = this.state.formulirDataSoal;
    data.jawaban = data.jawaban.value;
    // console.log(data);
    await Axios.post(Data.url + "/soal", data);
    await this.setState({
      pilihan_soal: [],
      formulirDataSoal: {
        soal: "",
        tanda: "",
        pilihan_1: "",
        pilihan_2: "",
        pilihan_3: "",
        pilihan_4: "",
        jawaban: "",
        nilai_soal: ""
      }
    });
    await this.ambilDataSemuaSoal();
  }
}
export default ContainerDataSoal;
