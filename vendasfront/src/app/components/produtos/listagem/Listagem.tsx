'use client'

import { Layout } from "../../layout/Layout"
import { Loader } from "../../common/loader/Loader"
import { Tabela } from "./tabela/Tabela"
import Link from "next/link"
import { IProduto } from "@/app/api/models/produtos/IProduto"
import useSWR from "swr"
import { httpClient } from "@/app/api/http"
import { AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { useProdutoService } from "@/app/api/services"
import { useEffect, useState } from "react"
import { Alert } from "../../common/message/Message"

export const Listagem: React.FC = () => {

  const service = useProdutoService()
  const [messages, setMessages] = useState<Array<Alert>>([])

  const { data: result, error } = useSWR<AxiosResponse<IProduto[]>>
  ('/api/produtos',  (url: string) => httpClient.get(url))

  useEffect(() => {

    setLista(result?.data || [])
  }, [result])

  const [lista, setLista] = useState<IProduto[]>()

  const navigation = useRouter()

  if(!result){
    return(
      <Loader show={true} />
    )
  }

  const editar = (produto: IProduto) => {
    const url = `/cadastros/produtos?id=${produto.id}`
    navigation.push(url)
  }

  const deletar = (produto: IProduto) => {
    service.deletar(produto.id).then(response => {
      setMessages([
        {tipo: "success", texto:"Produto excluido com sucesso!"}
      ])
      const listaAlterada: IProduto[] | undefined = lista?.filter(p => p.id != produto.id)
      setLista(listaAlterada)
    })
  }

  return (
    <Layout titulo="Produtos" mensagens={messages}>
      <Link href='/cadastros/produtos'>
        <button className='button is-warning'>
          Novo
        </button>
      </Link>
      <br /> <br />
      <Tabela onEdit={editar} onDelete={deletar} produtos={lista || []} />
    </Layout>
  )
}

export default Listagem