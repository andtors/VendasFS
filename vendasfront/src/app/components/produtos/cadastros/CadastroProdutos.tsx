'use client'

import { Layout, Input } from '@/app/components'
import { useState } from 'react'
import { useProdutoService } from '../../../api/services/index'
import { IProduto } from '../../../api/models/produtos/IProduto'

type Props = {}

export const CadastroProdutos = (props: Props) => {

  const service = useProdutoService()
  const [sku, setSku] = useState<string>("")
  const [preco, setPreco] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [descricao, setDescricao] = useState<string>("")
  const [id, setId] = useState<string | undefined>("")
  const [cadastro, setCadastro] = useState<string | undefined>("")

  function submit() {
    const produto: IProduto = {
      sku, preco: parseFloat(preco), nome, descricao, id
    }

    if (id) {
      service.
        atualizar(produto)
        .then(response => console.log("Atualizado!"))
    } else {
      service
        .salvar(produto)
        .then(produtoResposta => {
          setId(produtoResposta.id)
          setCadastro(produtoResposta.cadastro)
        })
    }


  }

  return (

    <Layout titulo='Cadastro de produtos' >
      {id &&
        <div className="columns">
          <Input label='Código:'
            value={id}
            columnClasses='is-half'
            ForAndId='inputId'
            disabled={true}
          />
          <Input label='Data cadastro:'
            value={cadastro}
            columnClasses='is-half'
            ForAndId='inputDataCadastro'
            disabled={true}
          />
        </div>
      }
      <div className="columns">
        <Input label='SKU: *'
          value={sku}
          columnClasses='is-half'
          ForAndId='Sku'
          onChange={setSku}
          placeholder='Digite o código SKU do produto' />
        <Input label='Preço: *'
          value={preco}
          columnClasses='is-half'
          ForAndId='Preco'
          onChange={setPreco}
          placeholder='Digite o preço do produto'
        />

      </div>
      <div className="columns">
        <Input label='Nome: *'
          value={nome}
          columnClasses='is-full'
          ForAndId='Nome'
          onChange={setNome}
          placeholder='Digite o nome do produto' />

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
            {id ? "Atualizar" : "Salvar"}
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


