import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataUjian extends Container {
  state = {
    semua_ujian: [],
    pilihan_ujian: [],
    formulirDataUjian: {
      judul: "",
      nama_mapel: "",
      tanggal: "",
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
      formulirDataUjian: { ...sebelumnya.formulirDataUjian, judul }
    }));
  }
  perbaruiMapelUjian(nama_mapel) {
    this.setState(sebelumnya => ({
      formulirDataUjian: { ...sebelumnya.formulirDataUjian, nama_mapel }
    }));
  }
  perbaruiTanggalUjian(tanggal) {
    this.setState(sebelumnya => ({
      formulirDataUjian: { ...sebelumnya.formulirDataUjian, tanggal }
    }));
  }
  perbaruiWaktuUjian(waktu) {
    this.setState(sebelumnya => ({
      formulirDataUjian: { ...sebelumnya.formulirDataUjian, waktu }
    }));
  }
  perbaruiGuruUjian(guru) {
    this.setState(sebelumnya => ({
      formulirDataUjian: { ...sebelumnya.formulirDataUjian, guru }
    }));
  }
  perbaruiKelasUjian(kelas) {
    this.setState(sebelumnya => ({
      formulirDataUjian: { ...sebelumnya.formulirDataUjian, kelas }
    }));
  }
  perbaruiSoalUjian(soal) {
    this.setState(sebelumnya => ({
      formulirDataUjian: { ...sebelumnya.formulirDataUjian, soal }
    }));
  }
  async bersihkanFormulirUjian(e) {
    e.preventDefault();
    await this.setState({
      formulirDataUjian: {
        judul: "",
        nama_mapel: "",
        tanggal: "",
        waktu: "",
        guru: "",
        kelas: "",
        soal: []
      }
    });
  }
  async masukkanFormulirUjian(e) {
    e.preventDefault();
    console.log(await this.state.formulirDataUjian);
    await this.setState({
      formulirDataUjian: {
        judul: "",
        nama_mapel: "",
        tanggal: "",
        waktu: "",
        guru: "",
        kelas: "",
        soal: []
      }
    });
    await this.ambilDataSemuaUjian();
  }
}
export default ContainerDataUjian;
