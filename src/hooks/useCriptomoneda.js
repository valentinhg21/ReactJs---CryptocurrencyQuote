import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label =styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display:block;
`;

const Select = styled.select`
  width: 100%;
  display:block;
  padding: 1rem;
  -webkit-appearence: none;
  border-radius: none;
  font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, opciones ) => {
  // State del custom hook
  const [state, actualizarState]= useState(stateInicial);



  const SelectCripto = () => (
      <Fragment>
        <Label>{label}</Label>
        <Select
          onChange={ e => actualizarState(e.target.value)}
          value={state}
        >
          <option value="">- Seleccione -</option>
          {opciones.map(opcion => (
            <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
          ))}
        </Select>
      </Fragment>
  )

  // Retorna el state, interfaz y el fn que modifica el state
  return [state, SelectCripto, actualizarState];
}

export default useCriptomoneda;
