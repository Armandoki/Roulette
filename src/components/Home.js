import React, { useState, useEffect } from "react";
import RouletteWheel from "./RouletteWheel";
import RouletteWheelEmpty from "./RouletteWhellEmpty";
import WinnerModal from "./WinnerModal";
import { v4 } from "uuid";
import rageRat from '../static/img/rat-rage.gif'
import { randomBackground, randomLoseSound, randomWinSound } from "../utils/functions";
import { createStorage, editStorage, readStorage } from "../utils/localStorage";


function Home() {
  //Estados.
  const [modeBR, setModeBR] = useState(false) //Determina el modo battle royale.
  const [mustSpin, setMustSpin] = useState(false); //Determina si la ruleta esta girando.
  const [dataVisible, setDataVisible] = useState([]); //Concursantes visibles en la ruleta.
  const [data, setData] = useState([]); //Todo los concursantes.
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null)
  let background = randomBackground()

  useEffect(() => {
    document.body.classList.add(background);
    if (localStorage.getItem('roulette') == null) {
      createStorage()
    }
    else {
      const lsData = readStorage()
      setData(lsData);
      setDataVisible(lsData.filter((obj) => obj.visible));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (showModal) {
      if (modeBR) {
        new Audio(randomLoseSound()).play()
      }
      else {
        new Audio(randomWinSound()).play()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal])


  //Cambiar background.
  const onChangeBackground = () => {
    document.body.classList.remove(background);
    background = randomBackground()
    document.body.classList.add(background);
  }

  //Agregar concursante.
  const createData = () => {
    let saveLocal = []

    if (input) {
      const obj = { id: v4(), text: input.toUpperCase(), visible: true }
      setData((prev) => [...prev, obj]);
      setDataVisible((prev) => [...prev, obj])
      setInput("")
      saveLocal = [...data, obj]
    }

    editStorage(saveLocal)
  }

  //Borra algun concursante.
  const deleteData = (id) => {
    const newData = data.filter((item) => item.id !== id);
    const newDataVisible = newData.filter((obj) => obj.visible)
    setData(newData);
    setDataVisible(newDataVisible);
    if (showModal) { setShowModal(false) }

    editStorage(newData)
  }

  //Actualiza la visibilidad de un concursante.
  const updateVisible = (id) => {
    const newData = data.map((obj) => obj.id === id ? { ...obj, visible: !obj.visible } : obj)
    const newDataVisible = newData.filter((obj) => obj.visible)
    setData(newData);
    setDataVisible(newDataVisible);
    if (showModal) { setShowModal(false) }

    editStorage(newData)
  };

  //Se ejecuta cuando la ruleta deja de girar.
  const stopSpinning = (winner) => {
    setWinner(winner)
    setShowModal(true)
    setMustSpin(false)
  }

  return (
    <div className="container-lg div-home">
      <div className="row text-center justify-content-center">

        {/*SECCION*/}
        {showModal && <WinnerModal setShowModal={setShowModal} winner={winner} deleteData={deleteData} updateVisible={updateVisible} modeBR={modeBR} />}

        {/*SECCION*/}
        <div className="col-12 col-sm-10 bg-dark div-roulette">
          <h1 style={{ cursor: 'default', userSelect: 'none' }}>RULETA <span style={{ cursor: 'default', userSelect: 'none' }}>{modeBR ? 'BR' : 'NORMAL'}</span> <span onClick={() => { !mustSpin && setModeBR(!modeBR) }} style={{ cursor: mustSpin && 'not-allowed' }}>{modeBR ? '💀' : '🌟'}</span></h1>
          {dataVisible.length !== 0 ? <RouletteWheel data={dataVisible} mustSpin={mustSpin} setMustSpin={setMustSpin} stopSpinning={stopSpinning} /> : <RouletteWheelEmpty />}
          <div className="options-buttons mt-4">
            <button className={`ms-1 me-1 btn ${modeBR ? 'btn-warning' : 'btn-primary'} button-normal`} style={{ cursor: mustSpin && 'not-allowed' }} disabled={mustSpin} onClick={() => { setModeBR(!modeBR) }}>{modeBR ? '💀' : '🌟'}</button>
            <button className="ms-1 me-1 btn btn-info button-normal" style={{ cursor: mustSpin && 'not-allowed' }} disabled={mustSpin} onClick={onChangeBackground}>🗺️</button>
          </div>
        </div>

        {/*SECCION*/}
        <div className="col-12 col-sm-10 col-md-6 bg-dark div-input">
          <h3 style={{ cursor: 'default', userSelect: 'none' }}>PALABRA O NOMBRE</h3>
          <input type="text" className="border border-dark" onChange={(name) => setInput(name.target.value)} value={input} onKeyDown={(event) => { if (event.key === 'Enter') { createData() } }} style={{ cursor: mustSpin && 'not-allowed' }} disabled={mustSpin} maxLength={25} />
          <button type="button" onClick={createData} style={{ cursor: mustSpin && 'not-allowed' }} disabled={mustSpin} className="btn btn-success button-normal "> AGREGAR </button>
        </div>

        {/*SECCION*/}
        <div className="col-12 col-sm-10 bg-dark div-data-list">
          <h3 style={{ cursor: 'default', userSelect: 'none' }}>LISTA DE INGRESOS</h3>
          <div className="data-list">
            {data.length !== 0 ? data.map((item) => (
              <div key={item.id} className="row ms-4 me-4 data-list-row">
                <div className="col-6 data-list-name" style={{ textDecoration: !item.visible && 'line-through', color: !item.visible && '#6c757d' }}><span onClick={() => { !mustSpin && updateVisible(item.id) }} style={{ cursor: mustSpin && 'not-allowed' }}>{item.text}</span></div>
                <div className="col-3 text-end"><button onClick={() => { updateVisible(item.id) }} style={{ cursor: mustSpin && 'not-allowed' }} disabled={mustSpin} className={`btn ${item.visible ? 'btn-info' : 'btn-secondary'} button-normal`}>👁️</button></div>
                <div className="col-3 text-start"><button onClick={() => { deleteData(item.id) }} style={{ cursor: mustSpin && 'not-allowed' }} disabled={mustSpin} className="btn btn-danger button-normal">✖️</button></div>
              </div>
            ))
              :
              <div className="data-list-empty">
                <p className="text-danger" style={{ cursor: 'default', userSelect: 'none' }}>RATA APRIETA EL PUÑO DE LA RABIA</p>
                <img src={rageRat} alt="" />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
