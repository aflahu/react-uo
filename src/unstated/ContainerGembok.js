// @flow
import { Container } from "unstated";

// type KunciGembok = {
//   no: number,
//   tipe: string
// };

class ContainerGembok extends Container {
  state = {
    no: "",
    kunci: "",
    tipe: ""
  };

  PerbaruiNo(no) {
    this.setState({ no });
  }

  PerbaruiKunci(kunci) {
    this.setState({ kunci });
  }

  bukaGembok() {
    // axios post
    let data = { no: 0, tipe: "" };
    this.setState({
      tipe: data.tipe
    });
    console.log(this.state);
  }
}
export default ContainerGembok;
