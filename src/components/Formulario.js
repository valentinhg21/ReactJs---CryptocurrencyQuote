import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';

import Error from './Error.js';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios'



const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color:#FFF;
  transition: background-color .3s ease;
  &:hover{
    background-color: #326AC0;
    cursor: pointer;
  }
`






const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

  // State de criptomonedas listado
  const [listacripto, guardarCriptomonedas ] = useState([]);
  // State para  validacion
  const [ error, guardarError ] = useState(false);

  // Objeto de moneda
  const MONEDAS = [
    {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
    {codigo: 'MXN', nombre: 'Peso Mexicano'},
    {codigo: 'ARS', nombre: 'Peso Argentino'},
    {codigo: 'EUR', nombre: 'Euro'},
    {codigo: 'GBP', nombre: 'Libra Esterlina'}


  ]

  // Utilizar useMoneda
  const [moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '',MONEDAS );

  // utlizar useCriptomoneda
  const [criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

  // Ejecutar llamado a la API
  useEffect( () => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);

    guardarCriptomonedas(resultado.data.Data);
    }

    consultarAPI();
  }, [])

  //Cuándo el usuario hace SUBMIT
  const cotizarMoneda = e => {
    e.preventDefault();

    // Validar si ambos campos están llenos
    if(moneda === '' || criptomoneda === ''){
      guardarError(true);
      return
    }

    // pasar los datos al componente principal
    guardarError(false)
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  }

  return (
    <form
      onSubmit={cotizarMoneda }
    >
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null }
      <SelectMonedas />
      <SelectCripto />
      <Boton
        type="submit"
        value="Calcular"
      />
    </form>
  )
}



export default Formulario
