import React from 'react';

const Button = (props) => {
    const{disabled,onClick,spinner,text} = props;
    return (
        <button disabled={disabled} onClick={onClick} className="btn btn-primary">
            { spinner && <span className="spinner-border spinner-border-sm"></span>}
        {text}</button>
    );
};

export default Button;