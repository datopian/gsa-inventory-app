import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({label, selected, styleClass,id,name, handleRadio}) => {

    return (
        <div className={`form-group ${styleClass}`}>
            <input
                    type="radio"
                    className="usa-radio__input" 
                    value={selected}
                    defaultChecked={selected}
                    onChange={handleRadio}
                    name={name}
                    id={id}/>

                <label className="usa-radio__label" htmlFor={id}>
                    {label}
                </label>
        </div>
    )
};

Radio.propTypes = {
    styleClass: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

Radio.defaultProps = {
    styleClass: ''
};

export default Radio;