import { useState } from "react";
import "./App.css";
import YellowCheckmark from "./assets/checkmark_yellow.svg";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async () => {
    setError(false);
    setSuccess(false);

    try {
      if (!email) throw new Error("No email provided!");
      setLoading(true);
      await fetch("https://happy-toad-34.deno.dev", {
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          wallet,
        }),
      })
        .then((res) => res.text())
        .then((text) => console.log(text));
      setSuccess(true);
    } catch (e) {
      setError(true);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div id="titleWrapper">
        <img src={YellowCheckmark} alt="Yellow Checkmark" />
        <h1>ThinksDAO</h1>
      </div>
      <h2>The DAO ecosystem is fragmented and lacking in innovation.</h2>
      <p>
        <strong>ThinksDAO</strong> is a community of DAO operators, tool
        builders, and investors working together with the{" "}
        <strong>ThinksTank</strong>, an invite-only think tank, to research and
        accelerate models and tooling that will benefit the DAO ecosystem.
      </p>
      <h2>Get Updates</h2>
      <div className="wrapper">
        <div id="emailForm">
          <label>Name</label>
          <input
            placeholder="John Smith"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            placeholder="me@example.com"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Wallet</label>
          <input
            placeholder="john.eth"
            type="text"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Subscribe"}
      </button>
      {success && <h4 style={{ color: "green" }}>Confirmation Email Sent.</h4>}
      {error && (
        <h4 style={{ color: "red" }}>Subscription failed. Try again.</h4>
      )}
    </div>
  );
}

export default App;
