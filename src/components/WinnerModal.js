import React from "react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const WinnerModal = ({ setShowModal, winner, updateVisible, deleteData, modeBR, dataLength }) => {
    const { width, height } = useWindowSize()

    return (
        <div className="winner-modal">
            <div className="winner-modal-overlay">
                {!modeBR && <Confetti width={width} height={height} numberOfPieces={500} tweenDuration={1} />}
                <div className="winner-modal-content bg-dark">
                    <div className="row">
                        <div className="col-12"><p className="modal-message">{modeBR ? 'HA SIDO ELIMINADO' : 'HA GANADO'}</p></div>
                        <div className="col-12"><p className={`modal-winner ${modeBR ? 'text-danger' : 'text-success'}`}>{winner.completeOption}</p></div>
                        <div className="col-6 col-sm-4"><button type="button" onClick={() => { updateVisible(winner.id) }} className="btn btn-info button-normal w-100 mb-3">OCULTAR</button></div>
                        <div className="col-6 col-sm-4"><button type="button" onClick={() => { deleteData(winner.id) }} className="btn btn-danger button-normal w-100 mb-3">ELIMINAR</button></div>
                        <div className="col-12 col-sm-4"><button type="button" onClick={() => { setShowModal(false) }} className="btn btn-secondary button-normal w-100 mb-3">CERRAR</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinnerModal;