import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({label, selected, styleClass,id,name, onChange}) => {

    const handleChange = (event) => {
        const {checked} = event.target;
        //onChange(checked);
    };

    return (
        <div className={`form-group ${styleClass}`}>
            <input
                    type="radio"
                    className="usa-radio__input" 
                    value={selected}
                    defaultChecked={selected}
                    onChange={handleChange}
                    name={name}
                    id={id}/>

            <label className="usa-radio__label" for={id}>
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