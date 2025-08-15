import { useState } from 'react'

const Tiedot = ({auto, kasittelija}) => {
    return(
    <div>
      <h2>Malli: {auto.malli}</h2>
      <h3>Merkki: {auto.merkki}</h3>
      <p>Auton hinta: {auto.hinta}€</p>
      <p>Ajetut kilometrit: {auto.km}</p>
      <button onClick={kasittelija}>Lisää ostoskoriin</button>
    </div> )
}
const App = () => {
  const [ostoskori, setOstoskori] = useState([])



  const autot = [
    {merkki: "Honda",malli: "Civic", hinta: 2000, km: 150000, id: 1},
    {merkki: "Fiat", malli: "Punto", hinta: 1000, km: 200000, id: 2},
    {merkki: "Nissan", malli: "GTR R34", hinta: 170000, km: 50000, id: 3}
  ]  

  const lisaaOstoskoriin = (auto) => {
    let uusiLista = ostoskori.concat(auto)
    setOstoskori(uusiLista)
  }

  return (
    <div>
      <h1>Meidän Autot</h1>
        <div>
          {autot.map(auto => <Tiedot key={auto.id} auto={auto} kasittelija={lisaaOstoskoriin} />)} 
        </div>
        <h1>Ostoskori</h1>
        {ostoskori.map(auto => <p key={auto.id} >{auto.merkki}</p>)}
  </div>
  )
}

export default App