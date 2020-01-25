import React from 'react';
import { Query } from 'react-apollo';
import { TOP_VENDEDORES } from './../../queries';
import Bparalelas from './../Spinners/Bparalelas';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'; 

const Vendedores = () => {
    return (
        <Query query={TOP_VENDEDORES}>
            {
                ({loading, error, data}) => {
                    if (loading) return (<Bparalelas/>);
                    if(error) return `Error ${error.message}`;

                    console.log(data);
                    const vendedoresGrafica = [];
                    const { topVendedores } = data;
                    console.log(topVendedores);

                    topVendedores.map((vendedor, index) => {
                        console.log(vendedor)
                        return(
                            vendedoresGrafica[index] = {
                                ...vendedor.vendedor[0],
                                total: vendedor.total
                            }
                        );
                        
                    })
                    
                    console.log(vendedoresGrafica);

                    return(
                        <BarChart 
                            width={1000} 
                            height={300} 
                            data={vendedoresGrafica}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="nombre"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="total" fill="#6148b9" />
                            
                        </BarChart>
                    );
                }
            }
        </Query>
    );
}

export default Vendedores;