import { useEffect, useState } from 'react';
import type { Cipo } from './types/type';
import './App.css'

function App() {
  const [cipok, setCipok] = useState<Cipo[]>([]);
  const [nev, setNev] = useState<string>("");
  const [marka, setMarka] = useState<string>("");
  const [megjelenes, setMegjelenes] = useState<string>("");
  const [ar, setAr] = useState<number>(0);
  const [magasszaru, setMagasszaru] = useState<boolean>(false);
  useEffect(
    () => {
      async function fetchCipok() {
        try {
          const response = await fetch("http://localhost:3000/cipok");
          const data: Cipo[] = await response.json();
          setCipok(data);
        }
        catch (err) {
          console.log(err);
        }
      }
      fetchCipok();
    }, []
  );

  async function felvetel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ujCipo = {
      nev: nev,
      marka: marka,
      megjelenes_datuma: megjelenes,
      eredeti_ar_usd: ar,
      magasszaru: magasszaru
    };
    try {
      const response = await fetch("http://localhost:3000/cipok",
        {
          "method": "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(ujCipo)
        }
      );
      const cipo: Cipo = await response.json();
      setCipok((elozo) => [...elozo, cipo]);
      setNev("");
      setMarka("");
      setMegjelenes("");
      setAr(0);
      setMagasszaru(false);

    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="container">
        <div className="row mx-3">
          <div className="col-sm-12">

            <h1>ikonikus cipők</h1>
            <h2>cipő lista</h2>
            <table className='table table-hover table-striped'>
              <thead>
                <tr>
                  <th>Név</th>
                  <th>Márka</th>
                  <th>Megjelenés</th>
                  <th>Eredeti ár</th>
                  <th>Magasszárú-e</th>
                </tr>
              </thead>
              <tbody>
                {
                  cipok.map((cipo) => (<tr key={cipo.id}>
                    <td>{cipo.nev}</td>
                    <td>{cipo.marka}</td>
                    <td>{cipo.megjelenes_datuma}</td>
                    <td>{cipo.eredeti_ar_usd}</td>
                    <td>{cipo.magasszaru ? "✅" : "❌"}</td>
                  </tr>))
                }
              </tbody>
            </table>
            <h2>új cipő felvétele</h2>
            <form onSubmit={felvetel} className='form form-control'>
              <label htmlFor="input_nev">
                Add meg a cipő nevét: <br />
                <input type="text" value={nev} onChange={(e) => setNev(e.target.value)} id="input_nev" />
              </label>
              <br />
              <label htmlFor="input_osztaly">
                Add meg a cipő márkáját: <br />
                <input type="text" value={marka} onChange={(e) => setMarka(e.target.value)} id="input_marka" />
              </label><br />
              <label htmlFor="input_megjelenes">
                Add meg a cipő megjelenését: <br />
                <input type="date" value={megjelenes} onChange={(e) => setMegjelenes(e.target.value)} id="input_megjelenes" />
              </label><br />
              <label htmlFor="input_ar">
                Add meg a cipő árát: <br />
                <input type="number" value={ar} onChange={(e) => setAr(parseInt(e.target.value))} id="input_ar" />
              </label><br />
              <label htmlFor="input_magasszaru">
                Magasszárú: <br />
                <input type="checkbox" onChange={(e) => setMagasszaru(e.target.checked)} id="input_magasszárú" />
              </label><br />
              <button type='submit' className='btn btn-primary'>submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
