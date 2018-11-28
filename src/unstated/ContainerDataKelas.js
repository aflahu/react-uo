import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataKelas extends Container {
  state = {
    semua_kelas: [],
    pilihan_kelas: [],
    formulirDataKelas: {
      no: "",
      nama: "",
      tanggal: "",
      murid_di_kelas: []
    }
  };
  async ambilDataSemuaKelas() {
    try {
      const result = await Axios.get(Data.url + "/kelas");
      const data = result.data;
      if (data.length > 0 && data[0].murid_di_kelas) {
        for (const u in data) {
          data[u].murid_murid = data[u].murid_di_kelas
            .map(i => i.nama)
            .toString();
        }
      }
      if (data.length > 0 && data[0].ujian) {
        for (const u in data) {
          data[u].string_ujian = data[u].ujian.map(i => i.judul).toString();
        }
      }
      await this.setState({ semua_kelas: data });
    } catch (error) {
      if (error.response === undefined) {
        return swal(
          "Maaf ada kendala di pelayanan server",
          "Silahkan hubungi admin, Semoga Allah mempermudah anda",
          "error"
        );
      }
    }
  }
  async perbaruiNamaKelas(nama) {
    await this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, nama }
    }));
  }
  async perbaruiTanggalKelas(tanggal) {
    await this.setState(sebelumnya => ({
      formulirDataKelas: { ...sebelumnya.formulirDataKelas, tanggal }
    }));
  }
  async perbaruiMuridKelas(murid_di_kelas) {
    console.log(murid_di_kelas);
    await this.setState(sebelumnya => ({
      formulirDataKelas: {
        ...sebelumnya.formulirDataKelas,
        murid_di_kelas
      }
    }));
    console.log(this.state.formulirDataKelas);
  }
  async bersihkanFormulirKelas(e) {
    e.preventDefault();
    await this.setState({
      formulirDataKelas: { nama: "", tanggal: "", murid_di_kelas: [] }
    });
  }
  async pilihanKelas() {
    const result = await Axios.get(Data.url + "/kelas");
    const pilihan = await result.data.map(isi => {
      const value = isi.no;
      const label = isi.no + " | " + isi.nama;
      return { value, label };
    });
    this.setState({ pilihan_kelas: pilihan });
  }
  async masukkanFormulirKelas(e, perbarui) {
    e.preventDefault();
    const data = {
      ...this.state.formulirDataKelas,
      murid_di_kelas: this.state.formulirDataKelas.murid_di_kelas.map(
        i => i.value
      )
    };
    try {
      if (perbarui) {
        Axios.post(Data.url + "/kelas", data);
        await this.setState({
          formulirDataKelas: { nama: "", tanggal: "", murid_di_kelas: [] }
        });
        await new Promise(res => setTimeout(res, 3000));
        await this.ambilDataSemuaKelas();
      }
      if (!perbarui) {
        Axios.post(Data.url + "/kelas", data);
        await this.setState({
          formulirDataKelas: { nama: "", tanggal: "", murid_di_kelas: [] }
        });
        await new Promise(res => setTimeout(res, 3000));
        await this.ambilDataSemuaKelas();
      }
    } catch (error) {
      swal("Silahkan perbaiki data masukan", "", "error");
    }
  }
  mengisiFromulirKelas(formulirDataKelas) {
    const murid_di_kelas = formulirDataKelas.murid_di_kelas.map(i => {
      return { label: i.no + " | " + i.nama, value: i.no };
    });
    this.setState({
      formulirDataKelas: { ...formulirDataKelas, murid_di_kelas }
    });
    console.log(formulirDataKelas);
  }
  async menghapusDataKelas(formulirDataKelas) {
    const no = formulirDataKelas.no;
    console.log(no);
    try {
      swal({
        title: "Benar anda mau menghapus data?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(async willDelete => {
        if (willDelete) {
          await Axios.delete(Data.url + "/kelas/" + no);
          await this.ambilDataSemuaKelas();
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
export default ContainerDataKelas;
