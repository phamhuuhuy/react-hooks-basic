import React, { useState } from 'react';
import './ColorBox.scss'

ColorBox.propTypes = {
    
};

function getRamdomColor(){
    const colorList = ['green', 'deeppink', 'red', 'black', 'yellow'];
    const indexColor = Math.trunc(Math.random() * 5);
    return colorList[indexColor];
}

function ColorBox(props) {
    const [color, setColor] = useState(()=>{
        const initColor = localStorage.getItem('color') || 'deeppink'
        return initColor
    });

    function handleBoxClick(){
        const newColor = getRamdomColor();
        setColor(newColor)
        localStorage.setItem('color', newColor)
    }

    return (
        <div 
            className="color-box" 
            style={{backgroundColor: color}}
            onClick={handleBoxClick}
        >
        </div>
    );
}

export default ColorBox;