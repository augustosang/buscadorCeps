import { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import api from './Services/api';
import './App.css'

export default function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if(input  === '') {
      alert('Preencha o campo com algum CEP');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput(''); 

      // console.log(response.data);
    } catch (error) {
      alert('CEP não encontrado');
      setInput('');
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador de CEPs</h1>

      <div className='containerInput'>
        <input 
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch
            size={25}
            color="#000"
          />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>Logradouro: {cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    </div>
  )
}
