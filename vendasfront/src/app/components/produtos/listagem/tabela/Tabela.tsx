import { IProduto } from "@/app/api/models/produtos/IProduto"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { confirmDialog } from "primereact/confirmdialog"
import Link from "next/link"

interface TabelaProdutoProps {
    produtos: Array<IProduto>;
    onEdit: (produto: IProduto) => void;
    onDelete: (produto: IProduto) => void;
}



export const Tabela: React.FC<TabelaProdutoProps> = ({ produtos, onEdit, onDelete }) => {

    const actionTemplate = (registro: IProduto) => {
        return (
            <div>
                <Link href={`/cadastros/produtos?id=${registro.id}`}>
                    <Button label="Editar"
                        className="p-button-rounded p-button-info"
                    />
                </Link>
    
                <Button label="Deletar"
                    className="p-button-rounded p-button-danger"
                    onClick={e => confirmDialog({
                        message: "Confirma a exclusão desse usuário?",
                        acceptLabel: "Sim",
                        rejectLabel: "Não",
                        accept() {
                            onDelete(registro)
                        },
                        header: "Confirmação"
                    })} />
            </div>
        )
    }

    return (

        <DataTable value={produtos} paginator rows={5}>
            <Column field="id" header="Código" />
            <Column field="sku" header="SKU" />
            <Column field="nome" header="Nome" />
            <Column field="preco" header="Preço" />
            <Column header="" body={actionTemplate}/>
        </DataTable>
    )
}




