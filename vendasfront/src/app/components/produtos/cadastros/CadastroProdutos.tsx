'use client'

import { Layout, Input, InputMoney} from '@/app/components'
import { useEffect, useState } from 'react'
import { useProdutoService } from '../../../api/services/index'
import { IProduto } from '../../../api/models/produtos/IProduto'
import { converterEmBigDecimal, formatReal } from '@/app/api/util/money'
import { Alert } from '../../common/message/Message'
import * as yup from 'yup'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

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
  const [sku, setSku] = useState<string | undefined>("")
  const [preco, setPreco] = useState<string | undefined>("")
  const [nome, setNome] = useState<string | undefined>("")
  const [descricao, setDescricao] = useState<string | undefined>("")
  const [id, setId] = useState<string | undefined>("")
  const [cadastro, setCadastro] = useState<string | undefined>("")
  const [messages, setMessages] = useState<Array<Alert>>([])
  const [errors, setErrors] = useState<FormErros>({})
  const searchParams = useSearchParams()
  const queryId = searchParams.get('id')

  useEffect(() => {

    if(queryId){
      service.carregarProduto(queryId).then(produtoEncontrado => {
        setId(produtoEncontrado.id)
        setSku(produtoEncontrado.sku)
        setNome(produtoEncontrado.nome)
        setCadastro(produtoEncontrado.cadastro)
        setDescricao(produtoEncontrado.descricao)
        setPreco(String(produtoEncontrado.preco))

      })
    }

  }, [queryId])
  
  function submit() {
    const produto: IProduto = {
      sku, preco: converterEmBigDecimal(preco), nome, descricao, id
    }

    validationSchema.validate(produto)
      .then(obj => {
        setErrors({})
        if(id) {
          service.
            atualizar(produto)
            .then(response => {
              setMessages([{
                tipo: "success", texto: "Produto atualizado com sucesso!"
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

    <Layout titulo="Produtos" mensagens={messages}>
    {id &&
        <div className="columns">
            <Input label="Código:" 
                columnClasses="is-half" 
                value={id}
                id="inputId"
                disabled={true}
                />

            <Input label="Data Cadastro:" 
                columnClasses="is-half" 
                value={cadastro}
                id="inputDataCadastro"
                disabled
                />
        </div>
    }

    <div className="columns">
        <Input label="SKU: *" 
               columnClasses="is-half" 
               onChange={ e => setSku(e.target.value)}
               value={sku}
               id="inputSku"
               placeholder="Digite o SKU do produto" 
               error={errors.sku}
               />

        <InputMoney label="Preço: *" 
               columnClasses="is-half" 
               onChange={e => setPreco(e.target.value)}
               value={preco}
               id="inputPreco"
               placeholder="Digite o Preço do produto" 
               maxLength={16}
               error={errors.preco}
               />
   </div>

   <div className="columns">
        <Input label="Nome: *" 
               columnClasses="is-full" 
               onChange={e => setNome(e.target.value)}
               value={nome}
               id="inputNome"
               placeholder="Digite o Nome do produto"
               error={errors.nome}
            />
   </div>

   <div className="columns">
    <div className="field column is-full">
        <label className="label" htmlFor="inputDesc">Descrição: *</label>
        <div className="control">
            <textarea className="textarea" 
                id="inputDesc" value={descricao}
                onChange={ event => setDescricao(event.target.value) }
                placeholder="Digite a Descrição detalhada do produto" />
            {errors.descricao &&
                <p className="help is-danger">{errors.descricao}</p>
            }
        </div>
    </div>
   </div>

   <div className="field is-grouped">
        <div className="control is-link">
            <button onClick={submit} className="button is-success">
                { id ? "Atualizar" : "Salvar" }                        
            </button>
        </div>
        <div className="control">
            <Link href="/consultas/produtos">
                <button className="button">Voltar</button>
            </Link>
        </div>
   </div>

</Layout>
  )
}


