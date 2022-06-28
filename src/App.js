import "./styles.css";
import { ethers } from "ethers";
import abi from "./ABI.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

// 0x36F5E8B3C18A72032579BC1c638b5e75D8b79971
export default function App() {
  const [item, setitem] = useState([]);
  const [colorname, setcolorname] = useState("");
  const [conn, setconn] = useState("not connected");
  const [buttonchange, setbuttonchange] = useState("connect");

  const address = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setconn(await signer.getAddress());
    setbuttonchange("connected");
  };

  const Mint = async () => {
    const add = "0x36F5E8B3C18A72032579BC1c638b5e75D8b79971";
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(add, abi, signer);
    const txin = await contract.safeMint(colorname);
    console.log(colorname);
    await setitem([...item, colorname]);
    await setcolorname("");
    console.log(await txin);
    console.log(await item);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-dark justify-content-between">
        <a className="navbar-brand" style={{ color: "white" }}>
          Color Token
        </a>
        <form className="form-inline" style={{ color: "white" }}>
          <button type="button" className="btn btn-light" onClick={address}>
            {buttonchange}
          </button>
          <div>
            <br />
            Address: {conn}
          </div>
        </form>
      </nav>
      <br />
      <h2>Issue token</h2>
      <div class="row">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Color"
          onChange={(e) => setcolorname(e.target.value)}
        />
      </div>
      <br />
      <input
        class="btn btn-primary"
        type="submit"
        value="MINT"
        onClick={Mint}
      />
      <hr />
      <ul>
        {item.map((item) => (
          <>
            <div
              style={{
                color: "white",
                margin: "30px",
                height: "125px",
                width: "125px",
                backgroundColor: item,
                borderRadius: "50%",
                display: "inline-block"
              }}
            >
              {item}
              <br />
              {conn.substr(0, 8)}...
            </div>
          </>
        ))}
      </ul>
    </div>
  );
}
