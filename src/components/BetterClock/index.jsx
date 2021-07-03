import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useClock from '../../hooks/useClock';
import './style.scss'

Clock.propTypes = {};


function Clock(props) {
    const {timeString} = useClock()

    return (
        <div className="better-clock">
            <p className="better-clock__time">{timeString}</p>
        </div>
    );
}

export default Clock;