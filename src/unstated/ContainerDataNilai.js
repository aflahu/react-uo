import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";
import { history } from "../material/BrowserRouter";

class ContainerDataNilai extends Container {
  state = {
    nilai_dari_ujian: [],
    no_ujian: 0
  };

  async ambilNilaiDariUjian(no_ujian) {
    try {
      const r = await Axios.get(Data.url + "/nilai/ujian/" + no_ujian);
      const dat = r.data;
      for (const i in dat) {
        dat[i].nim = dat[i].murid.no;
        dat[i].string_nama = dat[i].murid.nama;
      }
      this.setState({ nilai_dari_ujian: dat, no_ujian });
    } catch (error) {
      if (error.response === undefined) {
        return swal(
          "Maaf ada kendala di pelayanan server",
          "Silahkan hubungi admin, Semoga Allah SWT memudahkan",
          "error"
        );
      }
    }
  }
  async hapusNiliaDiNo(no_nilai) {
    try {
      const no_ujian = this.state.no_ujian;
      swal({
        title: "Benar anda mau menghapus data?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(async willDelete => {
        if (willDelete) {
          await Axios.delete(Data.url + "/nilai/" + no_nilai);
          await this.ambilNilaiDariUjian(no_ujian);
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

  async totalNilai(urutan_jawaban) {
    const soal = JSON.parse(window.localStorage.getItem("soal_ujian"));
    let total = 0;
    let seharusnya = 0;
    for (const i in soal) {
      if (soal[i].jawaban === urutan_jawaban[i]) {
        total = total + soal[i].nilai_soal;
      }
      seharusnya = seharusnya + soal[i].nilai_soal;
    }
    const persentase = ((total / seharusnya) * 100).toFixed(2);
    return { nilai: total, persentase };
  }

  async tambahNilai(urutan_jawaban, sisa_waktu) {
    try {
      swal({
        title: "Benar anda mau mengumpulkan?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(async willDelete => {
        const { nilai, persentase } = await this.totalNilai(urutan_jawaban);
        if (willDelete) {
          const data = {
            no_ujian: window.localStorage.getItem("no_ujian"),
            no_pengguna: window.localStorage.getItem("no"),
            urutan_soal: window.localStorage.getItem("soal_ujian"),
            urutan_jawaban: JSON.stringify(urutan_jawaban),
            sisa_waktu,
            nilai
          };
          await Axios.post(Data.url + "/nilai", data);
          // await this.ambilNilaiDariUjian(no_ujian);
          swal(
            "jawaban berhasil dikumpulkan \n nilai: " +
              nilai +
              "\n nilai (persentase) : " +
              persentase,
            {
              icon: "success"
            }
          );
          window.localStorage.removeItem("no_ujian");
          window.localStorage.removeItem("judul_ujian");
          window.localStorage.removeItem("nama_mapel");
          window.localStorage.removeItem("soal_ujian");
          window.localStorage.removeItem("waktu_ujian");
          window.localStorage.removeItem("mulai");
          history.replace("/ujian");
        } else {
          swal("Pengumpulan jawaban dibatalkan");
        }
      });
    } catch (error) {
      swal(
        "Maaf ada kendala di pelayanan server",
        "Silahkan hubungi admin, semoga Allah memudahkan",
        "error"
      );
    }
  }
}
export default ContainerDataNilai;
