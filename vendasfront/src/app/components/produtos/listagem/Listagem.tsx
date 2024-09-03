'use client'

import { Layout } from "../../layout/Layout"
import { Loader } from "../../common/loader/Loader"
import { Tabela } from "./tabela/Tabela"
import Link from "next/link"
import { IProduto } from "@/app/api/models/produtos/IProduto"
import useSWR from "swr"
import { httpClient } from "@/app/api/http"
import { AxiosResponse } from "axios"


type Props = {}

export const Listagem: React.FC = (props: Props) => {


  const { data: result, error } = useSWR<AxiosResponse<IProduto[]>>
  ('/api/produtos',  url => httpClient.get(url))

  if(!result){
    return(
      <Loader show={true} />
    )
  }

  return (
    <Layout titulo="Produtos">
      <Link href='/cadastros/produtos'>
        <button className='button is-warning'>
          Novo
        </button>
      </Link>
      <br />
      <Tabela produtos={result?.data || []} />
    </Layout>
  )
}

export default Listagem