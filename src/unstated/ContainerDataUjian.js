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
      guru: window.localStorage.getItem("no"),
      kelas: "",
      soal: []
    }
  };

  async ambilDataSemuaUjian() {
    try {
      const result = await Axios.get(Data.url + "/ujian");
      let semua_ujian = result.data;
      if (semua_ujian.length > 0 && semua_ujian[0].guru) {
        for (const u in semua_ujian) {
          semua_ujian[u].string_guru = semua_ujian[u].guru.nama;
        }
      }
      if (semua_ujian.length > 0 && semua_ujian[0].kelas_kelas_ujian) {
        for (const u in semua_ujian) {
          semua_ujian[u].string_kelas_kelas_ujian = semua_ujian[
            u
          ].kelas_kelas_ujian
            .map(i => i.nama)
            .toString();
        }
      }
      // console.log(semua_ujian);
      await this.setState({ semua_ujian });
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
  // perbaruiGuruUjian(guru) {
  //   this.setState(sebelumnya => ({
  //     formulirDataUjian: { ...sebelumnya.formulirDataUjian, guru }
  //   }));
  // }
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
    const data = {
      ...this.state.formulirDataUjian,
      kelas: this.state.formulirDataUjian.kelas.map(i => i.value),
      soal: this.state.formulirDataUjian.soal.map(i => i.value)
    };
    console.log(data);
    Axios.post(Data.url + "/ujian", data);
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
    await new Promise(res => setTimeout(res, 3000));
    await this.ambilDataSemuaUjian();
  }
}
export default ContainerDataUjian;
