import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

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
}
export default ContainerDataNilai;
