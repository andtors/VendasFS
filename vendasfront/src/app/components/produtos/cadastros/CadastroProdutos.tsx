'use client'

import { Layout, Input } from '@/app/components'
import { useState } from 'react'

type Props = {}

export const CadastroProdutos = (props: Props) => {

  const [sku, setSku] = useState<string>("")
  const [preco, setPreco] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [descricao, setDescricao] = useState<string>("")

  function submit() {
    const produto = {
      sku, preco, nome, descricao
    }
    console.log(produto)
  }

  return (
    <Layout titulo='Cadastro de produtos' >
      <div className="columns">
        <Input label='SKU: *' 
               value={sku} 
               columnClasses='is-half'
               ForAndId='Sku'
               onChange={setSku}/>
        <Input label='Preço: *' 
               value={preco} 
               columnClasses='is-half'
               ForAndId='Preco'
               onChange={setPreco}/>       
      </div>
      <div className="columns">
      <Input label='Nome: *' 
               value={nome} 
               columnClasses='is-full'
               ForAndId='Nome'
               onChange={setNome}/>    
      </div>
      <div className="columns">
        <div className='field is-full column'>
          <label className='label' htmlFor='inputDesc'>Descrição: *</label>
          <div className="control">
            <textarea className='textarea'
              id="inputDesc"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição do produto">
            </textarea>
          </div>
        </div>
      </div>
      <div className='field is-grouped'>
        <div className='control'>
          <button className='button is-link' onClick={submit}>
            Salvar
          </button>
        </div>
        <div className='control'>
          <button className='button is-link is-light'>
            Voltar
          </button>
        </div>
      </div>
    </Layout>
  )
}


