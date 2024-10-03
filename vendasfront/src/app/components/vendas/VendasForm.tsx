import { ICliente } from "@/app/api/models/clientes/IClientes"
import { IPage } from "@/app/api/models/common/IPage"
import { IVendas } from "@/app/api/models/vendas/IVendas"
import { useFormik } from "formik"
import { AutoComplete, AutoCompleteChangeParams, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete'
import { useState } from "react"
import { useClienteService, useProdutoService } from "@/app/api/services"
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { IProduto } from "@/app/api/models/produtos/IProduto"
import { Dialog } from "primereact/dialog"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

interface VendaFormProps {
    onSubmit: (venda: IVendas) => void
}

const formScheme: IVendas = {
    cliente: null,
    itens: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendaFormProps> = ({
    onSubmit
}) => {

    const service = useClienteService()
    const produtoService = useProdutoService()
    const [mensagem, setMensagem] = useState<string>('')
    const [codigoProduto, setCodigoProduto] = useState<string>('')
    const [produto, setProduto] = useState<IProduto>(null)
    const [produtosArray, setProdutosArray] = useState<boolean>(false)
    const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0)
    const [listaClientes, setListaClientes] = useState<IPage<ICliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 0,
        totalElements: 0
    })

    const formik = useFormik<IVendas>({
        onSubmit,
        initialValues: formScheme
    })

    const handleClienteAutocomplete = (e: AutoCompleteCompleteMethodParams) => {
        const nome = e.query
        service
            .find(nome, '', 0, 20)
            .then(clientes => setListaClientes(clientes))
    }

    const handleClienteChange = (e: AutoCompleteChangeParams) => {
        const clienteSelecionado: ICliente = e.value
        formik.setFieldValue("cliente", clienteSelecionado)
    }

    const handleCodigoProdutoSelect = (e) => {
        if(codigoProduto){
            produtoService.carregarProduto(codigoProduto)
            .then(produtoEncontrado => setProduto(produtoEncontrado))
            .catch(error => {
                setMensagem("Produto não encontrado!")
            })
        } 
       
    }

    const handleAddProduto = () => {

        const itensAdicionados = formik.values.itens
        itensAdicionados?.push({
            produto: produto,
            quantidade: quantidadeProduto
        })
        setProdutosArray(true)
        setProduto(null)
        setCodigoProduto('')
        setQuantidadeProduto(0)
        
    }

    const dialogMensagemFooter = () => {
        return (
            <div>
                <Button label="Ok" onClick={handleFecharDialogProdutoNaoEncontrado} />
            </div>
        )
    }

    const handleFecharDialogProdutoNaoEncontrado = () => {
        setMensagem('')
        setCodigoProduto('')
        setProduto(null)
    }

    const disableAddProdutoButton = () => {
        return !produto || !quantidadeProduto
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="cliente">Cliente: *</label>
                    <AutoComplete
                        suggestions={listaClientes.content}
                        completeMethod={handleClienteAutocomplete}
                        value={formik.values.cliente}
                        id="cliente"
                        name="cliente"
                        field="nome"
                        onChange={handleClienteChange}
                    />
                </div>

                <div className="p-grid">
                    <div className="p-col-2">
                        <span className="p-float-label">
                            <InputText
                                onBlur={handleCodigoProdutoSelect}
                                value={codigoProduto}
                                id="codigoProduto"
                                onChange={e => setCodigoProduto(e.target.value)} />
                            <label htmlFor="codigoProduto">Código</label>
                        </span>
                    </div>
                    <div className="p-col-6">
                        <AutoComplete value={produto} field="nome"/>
                    </div>
                    <div className="p-col-2">
                    <span className="p-float-label">
                        <InputText id="qtdProduto" value={quantidadeProduto} onChange={e => setQuantidadeProduto(parseInt(e.target.value))}/>
                            <label htmlFor="qtdProduto">QTD</label>
                    </span>
                    </div>
                    <div className="p-col-2">
                       <Button disabled={disableAddProdutoButton()} type="button" label="Adicionar" onClick={handleAddProduto}/>
                    </div>
            
                <div className="p-col-12">
                    <DataTable value={formik.values.itens}>
                        <Column field="produto.id" header="Código"/>
                        <Column field="produto.sku" header="SKU"/>
                        <Column field="produto.nome" header="Produto"/>
                        <Column field="produto.preco" header="UND"/>
                        <Column field="quantidade" header="QTD"/>
                    </DataTable>
                </div>
                </div>

                <Button disabled={!produtosArray} type="submit" label="Finalizar" />
            </div>
            <Dialog position="center" visible={!!mensagem} onHide={handleFecharDialogProdutoNaoEncontrado} header="Atenção" footer={dialogMensagemFooter}>
                {mensagem}
            </Dialog>
        </form>
       
    )
}