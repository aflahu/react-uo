import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataUjian extends Container {
  state = {
    semua_ujian: [],
    formulirDataKelas: {
      judul: "",
      nama_mapel: "",
      tanggal: undefined,
      waktu: "",
      guru: "",
      kelas: "",
      soal: []
    }
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

  perbaruiJudulUjian(judul) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, judul }
    }));
  }
  perbaruiMapelUjian(nama_mapel) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, nama_mapel }
    }));
  }
  perbaruiTanggalUjian(tanggal) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, tanggal }
    }));
  }
  perbaruiWaktuUjian(waktu) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, waktu }
    }));
  }
  perbaruiGuruUjian(guru) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, guru }
    }));
  }
  perbaruiKelasUjian(kelas) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, kelas }
    }));
  }
  perbaruiSoalUjian(soal) {
    this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, soal }
    }));
  }
  masukkanFormulirUjian() {
    console.log(this.state.formulirDataKelas);
  }
}
export default ContainerDataUjian;
