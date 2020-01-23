import React from 'react';
import { Link } from 'react-router-dom';

const BotonRegistro = (props) => {
    const { session } = props;
    console.log(session);
    const { obtenerUsuario } = session.session;
    console.log(obtenerUsuario);
    const { rol } = obtenerUsuario;
    console.log(rol);

    if(rol !== 'ADMINISTRADOR') return null;

    return(
        <Link to="/registro" className="btn btn-warning ml-md-2 mt-2 mt-md-0">
            Crear Usuarios
        </Link> 
    );
};

export default BotonRegistro;