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
      kelas_kelas_ujian: "",
      soal_ujian: []
    }
  };

  async ambilDataSemuaUjian(no_pengguna) {
    try {
      // berdasarkan no guru
      const result = await Axios.get(
        Data.url + "/ujian/" + (no_pengguna || "")
      );
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
      // // console.log(semua_ujian);
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
  perbaruiKelasUjian(kelas_kelas_ujian) {
    this.setState(sebelumnya => ({
      formulirDataUjian: { ...sebelumnya.formulirDataUjian, kelas_kelas_ujian }
    }));
  }
  perbaruiSoalUjian(soal_ujian) {
    this.setState(sebelumnya => ({
      formulirDataUjian: { ...sebelumnya.formulirDataUjian, soal_ujian }
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
        kelas_kelas_ujian: "",
        soal_ujian: []
      }
    });
  }
  async masukkanFormulirUjian(e, perbarui) {
    e.preventDefault();
    const data = {
      ...this.state.formulirDataUjian,
      kelas: this.state.formulirDataUjian.kelas_kelas_ujian.map(i => i.value),
      soal: this.state.formulirDataUjian.soal_ujian.map(i => i.value)
    };
    try {
      if (perbarui) {
        Axios.post(Data.url + "/ujian", data);
        await this.setState({
          formulirDataUjian: {
            judul: "",
            nama_mapel: "",
            tanggal: "",
            waktu: "",
            guru: window.localStorage.getItem("no"),
            kelas_kelas_ujian: "",
            soal_ujian: []
          }
        });
        await new Promise(res => setTimeout(res, 3000));
        await this.ambilDataSemuaUjian();
      }
      if (!perbarui) {
        Axios.post(Data.url + "/ujian", data);
        console.log(data);
        await this.setState({
          formulirDataUjian: {
            judul: "",
            nama_mapel: "",
            tanggal: "",
            waktu: "",
            guru: window.localStorage.getItem("no"),
            kelas_kelas_ujian: "",
            soal_ujian: []
          }
        });
        await new Promise(res => setTimeout(res, 3000));
        await this.ambilDataSemuaUjian();
      }
    } catch (error) {}
  }
  async mengisiFromulirUjian(formulirDataUjian) {
    const kelas_kelas_ujian = formulirDataUjian.kelas_kelas_ujian.map(i => {
      return { label: i.no + " | " + i.nama, value: i.no };
    });
    const soal_ujian = formulirDataUjian.soal_ujian.map(i => {
      return { label: i.no + " | " + i.tanda, value: i.no };
    });
    await this.setState({
      formulirDataUjian: { ...formulirDataUjian, kelas_kelas_ujian, soal_ujian }
    });
    console.log(this.state.formulirDataUjian);
  }

  async menghapusDataUjian(formulirDataUjian) {
    const no = formulirDataUjian.no;
    try {
      swal({
        title: "Benar anda mau menghapus data?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(async willDelete => {
        if (willDelete) {
          await Axios.delete(Data.url + "/ujian/" + no);
          await this.ambilDataSemuaUjian();
          swal("Data berhasil dihapus", {
            icon: "success"
          });
        } else {
          swal("Penghapusan data dibatalkan");
        }
      });
    } catch (error) {
      return swal(
        "Maaf ada kendala di pelayanan server",
        "Silahkan hubungi admin, semoga Allah memudahkan",
        "error"
      );
    }
  }
}
export default ContainerDataUjian;
