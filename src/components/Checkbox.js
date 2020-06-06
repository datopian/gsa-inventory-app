import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({label, selected, styleClass,id, onChange}) => {

    const handleChange = (event) => {
        const {checked} = event.target;
        //onChange(checked);
    };

    return (
        <div className={`form-group ${styleClass}`}>
            <input
                    type="checkbox"
                    className="usa-checkbox__input" 
                    value={selected}
                    defaultChecked={selected}
                    onChange={handleChange}
                    id={id}/>

            <label className="usa-checkbox__label" for={id}>
                {label}
            </label>
        </div>
    )
};

Checkbox.propTypes = {
    styleClass: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

Checkbox.defaultProps = {
    styleClass: ''
};

export default Checkbox;