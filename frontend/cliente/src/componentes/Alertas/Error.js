import React from 'react';

const Error = (props) => {

    const { error } = props;

    return(
        <p className="alert alert-danger p-2 text-center mb-2">
            {error}
        </p>
    );
}

export default Error;
