'use client'

import { Layout } from '@/app/components'
import { useState } from 'react'

type Props = {}

export const CadastroProdutos = (props: Props) => {

  const [sku, setSku] = useState("")
  const [preco, setPreco] = useState("")
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")

  function submit() {
    const produto = {
      sku, preco, nome, descricao
    }
    console.log(produto)
  }

  return (
    <Layout titulo='Cadastro de produtos' >
      <div className="columns">
        <div className='field is-half column'>
          <label className='label' htmlFor='inputSku'>SKU: *</label>
          <div className="control">
            <input className='input'
              id="inputSku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder='Digite o SKU do produto' />
          </div>
        </div>
        <div className='field is-half column'>
          <label className='label' htmlFor='inputPreco'>Preço: *</label>
          <div className="control">
            <input className='input'
              id="inputPreco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder='Digite o preço do produto' />
          </div>
        </div>
      </div>
      <div className="columns">
        <div className='field is-full column'>
          <label className='label' htmlFor='inputNome'>Nome: *</label>
          <div className="control">
            <input className='input'
              id="inputNome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder='Digite o nome do produto' />
          </div>
        </div>
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


