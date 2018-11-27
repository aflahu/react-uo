import { Container } from "unstated";
import Data from "./data";
import Axios from "axios";
import swal from "sweetalert";

class ContainerDataPengguna extends Container {
  state = {
    admin: [],
    guru: [],
    pilihan_guru: [],
    formulirDataGuru: {
      no: "",
      nama: "",
      kunci: "",
      tipe: "guru"
    },
    murid: [],
    dataTabelMurid: [],
    pilihanMurid: [],
    formulirDataMurid: {
      no: "",
      nama: "",
      kunci: "",
      tipe: "murid"
    }
  };

  async ambilDataAdmin() {
    try {
      const result = await Axios.get(Data.url + "/pengguna/tipe/admin");
      await this.setState({ admin: result.data });
    } catch (error) {
      if (error.response === undefined) {
        return swal(
          "Tidak terhubung ke server",
          "Silahkan hubungi admin",
          "error"
        );
      }
    }
  }

  // untuk data Guru
  async ambilDataGuru() {
    try {
      const result = await Axios.get(Data.url + "/pengguna/tipe/guru");
      let guru = result.data;
      if (guru.length > 0 && guru[0].menguji !== undefined) {
        for (const u in guru) {
          guru[u].string_menguji = guru[u].menguji.map(i => i.judul).toString();
        }
      }
      await this.setState({ guru });
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
  perbaruiNoGuru(no) {
    this.setState(sebelumnya => ({
      formulirDataGuru: { ...sebelumnya.formulirDataGuru, no }
    }));
  }
  perbaruiNamaGuru(nama) {
    this.setState(sebelumnya => ({
      formulirDataGuru: { ...sebelumnya.formulirDataGuru, nama }
    }));
  }
  perbaruiKunciGuru(kunci) {
    this.setState(sebelumnya => ({
      formulirDataGuru: { ...sebelumnya.formulirDataGuru, kunci }
    }));
  }
  async bersihkanFormulirGuru(e) {
    e.preventDefault();
    await this.setState({
      formulirDataGuru: { no: "", nama: "", kunci: "", tipe: "guru" }
    });
  }
  async pilihanGuru() {
    const result = await Axios.get(Data.url + "/pengguna/tipe/guru");
    const pilihan = await result.data.map(isi => {
      const value = isi.no;
      const label = isi.no + " | " + isi.nama;
      return { value, label };
    });
    this.setState({ pilihan_guru: pilihan });
  }
  async masukkanFormulirGuru(e, perbarui) {
    e.preventDefault();
    try {
      if (perbarui) {
        // await Axios.post(Data.url + "/pengguna", this.state.formulirDataGuru);
        alert("perbarui");
        await this.setState({
          formulirDataGuru: { no: "", nama: "", kunci: "", tipe: "guru" }
        });
        await this.ambilDataGuru();
        await this.pilihanGuru();
      }
      if (!perbarui) {
        await Axios.post(Data.url + "/pengguna", this.state.formulirDataGuru);
        await this.setState({
          formulirDataGuru: { no: "", nama: "", kunci: "", tipe: "guru" }
        });
        await this.ambilDataGuru();
        await this.pilihanGuru();
      }
    } catch (error) {
      swal("Silahkan perbaiki data masukan", "", "error");
    }
  }
  async mengisiFromulirGuru(formulirDataGuru) {
    this.setState({ formulirDataGuru });
  }

  // untuk data Murid
  async ambilDataMurid() {
    try {
      const result = await Axios.get(Data.url + "/pengguna/tipe/murid");
      let murid = result.data;
      if (murid.length > 0 && murid[0].kelas_murid !== undefined) {
        for (const u in murid) {
          murid[u].string_kelas_murid = murid[u].kelas_murid
            .map(i => i.nama)
            .toString();
        }
      }
      await this.setState({ murid });
    } catch (error) {
      if (error.response === undefined) {
        return swal(
          "Tidak terhubung ke server",
          "Silahkan hubungi admin",
          "error"
        );
      }
    }
  }
  perbaruiNoMurid(no) {
    this.setState(sebelumnya => ({
      formulirDataMurid: { ...sebelumnya.formulirDataMurid, no }
    }));
  }
  perbaruiNamaMurid(nama) {
    this.setState(sebelumnya => ({
      formulirDataMurid: { ...sebelumnya.formulirDataMurid, nama }
    }));
  }
  perbaruiKunciMurid(kunci) {
    this.setState(sebelumnya => ({
      formulirDataMurid: { ...sebelumnya.formulirDataMurid, kunci }
    }));
  }
  async pilihanMurid() {
    const result = await Axios.get(Data.url + "/pengguna/tipe/murid");
    const pilihan = await result.data.map(isi => {
      const value = isi.no;
      const label = isi.no + " | " + isi.nama;
      return { value, label };
    });
    this.setState({ pilihanMurid: pilihan });
  }
  async bersihkanFormulirMurid(e) {
    e.preventDefault();
    await this.setState({
      formulirDataMurid: { no: "", nama: "", kunci: "", tipe: "murid" }
    });
    await this.ambilDataMurid();
  }
  async masukkanFormulirMurid(e, perbarui) {
    e.preventDefault();
    try {
      if (perbarui) {
        await Axios.post(Data.url + "/pengguna", this.state.formulirDataMurid);
        await this.setState({
          formulirDataMurid: { no: "", nama: "", kunci: "", tipe: "murid" }
        });
        await this.ambilDataMurid();
        await this.pilihanMurid();
      }
      if (!perbarui) {
        await Axios.post(Data.url + "/pengguna", this.state.formulirDataMurid);
        await this.setState({
          formulirDataMurid: { no: "", nama: "", kunci: "", tipe: "murid" }
        });
        await this.ambilDataMurid();
        await this.pilihanMurid();
      }
    } catch (error) {
      swal("Silahkan perbaiki data masukan", "", "error");
    }
  }
  mengisiFromulirMurid(formulirDataMurid) {
    this.setState({ formulirDataMurid });
  }
}
export default ContainerDataPengguna;
