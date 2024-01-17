import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

const RouletteWheel = ({ data, mustSpin, setMustSpin, stopSpinning }) => {
    //Estados
    const [prizeNumber, setPrizeNumber] = useState(0); //Determina al ganador.
    const [rouletteData, setRouletteData] = useState(data); //Determina los participantes de la ruleta.

    //Elige a un ganador y pone en marcha la ruleta.
    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    //Acorta los nombres de los concursantes.
    useEffect(() => {
        const addShortString = data
            .map(item => ({
                id: item.id,
                completeOption: item.text,
                option: item.text.length >= 9 ? item.text.substring(0, 9).trimEnd() + "..." : item.text,
                visible: item.visible
            }));
        setRouletteData(addShortString);
    }, [data]);

    return (
        <div className="roulette-container">
            <Wheel
                mustStartSpinning={mustSpin}
                spinDuration={[0.6]}
                prizeNumber={prizeNumber}
                data={rouletteData}
                outerBorderColor={["#f2f2f2"]}
                outerBorderWidth={[6]}
                innerBorderColor={["#f2f2f2"]}
                radiusLineColor={["#f2f2f2"]}
                radiusLineWidth={data.length > 1 ? (data.length > 8 ? [1] : [6]) : [0]}
                textColors={["#f2f2f2"]}
                textDistance={55}
                fontSize={data.length > 8 ? [10] : [20]}
                backgroundColors={["#F99533", "#F22B35", "#24CA69", "#514E50", "#46AEFF", "#9145B7"]}
                perpendicularText={false}
                onStopSpinning={() => {
                    stopSpinning(rouletteData[prizeNumber])
                }}
            />
            <button type="button" onClick={handleSpinClick} disabled={mustSpin} className="wheel-button roulette-wheel-button">
                SPIN
            </button>
        </div>
    );
};

export default RouletteWheel;