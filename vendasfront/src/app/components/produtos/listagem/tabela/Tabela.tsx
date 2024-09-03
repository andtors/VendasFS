import { IProduto } from "@/app/api/models/produtos/IProduto"
import { useState } from "react";
type Props = {}

interface TabelaProdutoProps {
    produtos: Array<IProduto>;
    onEdit: (produto: IProduto) => void;
    onDelete: (produto: IProduto) => void;
}

export const Tabela: React.FC<TabelaProdutoProps> = ({ produtos, onEdit, onDelete }) => {
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
                    produtos.map(
                        produto => <ProdutoRow
                            key={produto.id}
                            produto={produto}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />)
                }
            </tbody>
        </table>
    )
}

interface ProdutoRowProps {
    produto: IProduto;
    onEdit: (produto: IProduto) => void;
    onDelete: (produto: IProduto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto,
    onEdit,
    onDelete
}) => {

    const [deletando, setDeletando] = useState<boolean>(false)

    const onDeleteClick = (produto: IProduto) => {
        if (deletando) {
            onDelete(produto)
            setDeletando(false)
        } else {
            setDeletando(true)
        }
    }

    const cancelaDelete = () => setDeletando(false)

    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                {!deletando &&
                    <button onClick={e => onEdit(produto)}
                        className="button is-success is-rounded is-small mr-2 ">Editar</button>
                }
                <button onClick={e => onDeleteClick(produto)}
                    className="button is-danger is-rounded is-small mr-2">
                        { deletando ? "Confirma" : "Deletar"}
                    </button>

                {deletando &&
                    <button onClick={e => cancelaDelete()}
                        className="button is-rounded is-small">Cancelar</button>
                }
            </td>
        </tr>
    )
}

