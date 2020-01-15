import React from 'react';

const Error = (props) => {

    let { error } = props;

    if(error.message) {
        error = error.message;
    }

    return(
        <p className="alert alert-danger p-2 text-center mb-2">
            {error}
        </p>
    );
}

export default Error;
