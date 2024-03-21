import React, { useId } from 'react';

function Input({ label, name, id, type = 'text', onChange }) {
  const generatedId = useId();

  return (
    <React.Fragment>
      {label && <label htmlFor={id || generatedId}>{label}</label>}
      <input
        name={name}
        id={id || generatedId}
        type={type}
        onChange={onChange}
      />
    </React.Fragment>
  );
}

export default Input;
