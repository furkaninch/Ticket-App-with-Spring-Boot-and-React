import React from 'react';

const Input = (props) => {
    const {label,onChange,type,name,error} = props;
    let className = 'form-control';

    if(error !== undefined){
        className += ' is-invalid';
    }
    return (
        <div className="form-group"> 
        <label>{label}</label>
        <input name={name} onChange={onChange} className={className} type={type}></input>
        <div className="invalid-feedback">
                        {error}
            </div>
    </div>
    );
};

export default Input;