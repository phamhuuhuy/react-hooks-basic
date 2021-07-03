import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useClock from '../../hooks/useClock';

Clock.propTypes = {};


function Clock(props) {
    const {timeString} = useClock()

    return (
        <p style={{fontSize: 42}}>{timeString}</p>
    );
}

export default Clock;