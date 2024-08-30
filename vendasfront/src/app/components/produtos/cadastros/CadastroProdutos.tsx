'use client'

import { Layout, Input, Message } from '@/app/components'
import { useState } from 'react'
import { useProdutoService } from '../../../api/services/index'
import { IProduto } from '../../../api/models/produtos/IProduto'
import { converterEmBigDecimal } from '@/app/api/util/money'
import { Alert } from '../../common/message/Message'
import * as yup from 'yup'
import Link from 'next/link'

const msgCampoObrigatorio = "Campo Obrigatório"

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msgCampoObrigatorio),
  nome: yup.string().trim().required(msgCampoObrigatorio),
  descricao: yup.string().trim().required(msgCampoObrigatorio),
  preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00 (zero)")
})

interface FormErros {
  sku?: string;
  nome?: string;
  preco?: string;
  descricao?: string;
}

export const CadastroProdutos = () => {

  const service = useProdutoService()
  const [sku, setSku] = useState<string>("")
  const [preco, setPreco] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [descricao, setDescricao] = useState<string>("")
  const [id, setId] = useState<string | undefined>("")
  const [cadastro, setCadastro] = useState<string | undefined>("")
  const [messages, setMessages] = useState<Array<Alert>>([])
  const [errors, setErrors] = useState<FormErros>({})

  function submit() {
    const produto: IProduto = {
      sku, preco: converterEmBigDecimal(preco), nome, descricao, id
    }

    validationSchema.validate(produto)
    .then(obj => {

      setErrors({})

      if (id) {
        service.
          atualizar(produto)
          .then(response => {
            setMessages([{
              tipo: "success", texto:"Produto atualizado com sucesso!"
            }])
          })
      } else {
        service
          .salvar(produto)
          .then(produtoResposta => {
            setId(produtoResposta.id)
            setCadastro(produtoResposta.cadastro)
            setMessages([{
              tipo: "success", texto: "Produto salvo com sucesso!"
            }])
          })
      }
    })  
    .catch(err => {
      const field = err.path
      const message = err.message

      setErrors({
        [field]: message
      })
    })
  }

  return (

    <Layout titulo='Cadastro de produtos' mensagens={messages}>
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
          placeholder='Digite o código SKU do produto'
          error={errors.sku}
          />
        <Input label='Preço: *'
          value={preco}
          columnClasses='is-half'
          ForAndId='Preco'
          onChange={setPreco}
          placeholder='Digite o preço do produto'
          currency
          maxChar={16}
          error={errors.preco}
        />

      </div>
      <div className="columns">
        <Input label='Nome: *'
          value={nome}
          columnClasses='is-full'
          ForAndId='Nome'
          onChange={setNome}
          placeholder='Digite o nome do produto' 
          error={errors.nome}
          />

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
            { errors.descricao &&
              <p className='help is-danger'>{errors.descricao}</p>
            }
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
          <Link href='/consultas/produtos'>
          <button className='button is-link is-light'>
            Voltar
          </button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}


