import { IProduto } from "@/app/api/models/produtos/IProduto"
type Props = {}

interface TabelaProdutoProps {
    produtos: Array<IProduto>;
}

export const Tabela: React.FC<TabelaProdutoProps> = ({produtos}) => {
  return (
    <table className='table is-stripped is-hoverable is-fullwidth'>
        <thead>
            <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>SKU</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
           { 
                 produtos.map(produto => <ProdutoRow key={produto.id} produto={produto} />)
           }
        </tbody>
    </table>
  )
}

interface ProdutoRowProps {
    produto: IProduto;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto
}) => {
    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                <button className="button is-success mr-2">Editar</button>
                <button className="button is-danger">Deletar</button>
            </td>
        </tr>
    )
}

