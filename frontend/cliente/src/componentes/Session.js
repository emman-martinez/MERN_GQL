import React from 'react';
import { Query } from 'react-apollo';
import { USUARIO_ACTUAL } from './../queries';
import Grow from './Spinners/Grow';

const Session = Component => props => {
    return(
        <Query
            query={USUARIO_ACTUAL}
        >
            {
                ({loading, error, data, refetch}) => {
                    if(loading) return <Grow/>;
                    return <Component {...props} refetch={refetch} session={data}/>;
                }
            }
        </Query>
    );
};

export default Session;