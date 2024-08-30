import { Layout } from "../../layout/Layout"
import { Tabela } from "./tabela/Tabela"
import Link from "next/link"
import { IProduto } from "@/app/api/models/produtos/IProduto"

type Props = {}

export const Listagem: React.FC = (props: Props) => {

    const produtos: IProduto[] = [{
        id: "1", sku: "HGGG", nome: "Impressora", preco: 250.00,
    }]

  return (
    <Layout titulo="Produtos">
        <Tabela produtos={produtos}/>
       <Link href='/cadastros/produtos'>
       <button className='button is-warning'>
            Novo
        </button>
        </Link>
        <br />
    </Layout>
  )
}

export default Listagem