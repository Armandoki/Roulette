import React from "react";
import { Wheel } from "react-custom-roulette";

const RouletteWheelEmpty = () => {
    return (
        <div className="roulette-container">
            <Wheel
                mustStartSpinning={false}
                prizeNumber={0}
                data={[{ option: '1' }, { option: '2' }, { option: '3' }, { option: '4' }, { option: '5' }]}
                outerBorderColor={["#f2f2f2"]}
                innerBorderColor={["#f2f2f2"]}
                radiusLineColor={["#f2f2f2"]}
                textColors={["#f2f2f2"]}
                fontSize={[30]}
                backgroundColors={["#F99533", "#F22B35", "#24CA69", "#514E50", "#46AEFF", "#9145B7"]}
            />
        </div>
    );
};

export default RouletteWheelEmpty;