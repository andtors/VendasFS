import { ICliente } from "@/app/api/models/clientes/IClientes"
import { IPage } from "@/app/api/models/common/IPage"
import { IItemVenda, IVendas } from "@/app/api/models/vendas/IVendas"
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
import { Dropdown } from "primereact/dropdown"
import { validationScheme } from "./validationSchema"

const formatadorMoney = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

interface VendaFormProps {
    onSubmit: (venda: IVendas) => void;
    vendaRealizada: boolean;
    onNovaVenda: () => void;
}

const formScheme: IVendas = {
    cliente: null,
    itens: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendaFormProps> = ({
    onSubmit,
    vendaRealizada,
    onNovaVenda
}) => {

    const formasPagamento: String[] = ["DINHEIRO", "CARTAO"]
    const service = useClienteService()
    const produtoService = useProdutoService()
    const [listaProdutos, setListaProdutos] = useState<IProduto[]>([])
    const [listaFiltradaProdutos, setListaFiltradaProdutos] = useState<IProduto[]>([])
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
        initialValues: formScheme,
        validationSchema: validationScheme
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
        if (codigoProduto) {
            produtoService.carregarProduto(codigoProduto)
                .then(produtoEncontrado => setProduto(produtoEncontrado))
                .catch(error => {
                    setMensagem("Produto não encontrado!")
                })
        }

    }

    const handleAddProduto = () => {

        const itensAdicionados = formik.values.itens

        const jaExisteOItemNaVenda = itensAdicionados?.some((iv: IItemVenda) => {
            return iv.produto.id === produto.id
        })

        if (jaExisteOItemNaVenda) {

            itensAdicionados?.forEach((iv: IItemVenda) => {
                if (iv.produto.id === produto.id) {
                    iv.quantidade = iv.quantidade + quantidadeProduto
                }
            })
        } else {
            itensAdicionados?.push({
                produto: produto,
                quantidade: quantidadeProduto
            })
        }


        setProdutosArray(true)
        setProduto(null)
        setCodigoProduto('')
        setQuantidadeProduto(0)

        const total = totalVenda()
        formik.setFieldValue("total", total)

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

    const handleProdutoAutocomplete = async (e: AutoCompleteCompleteMethodParams) => {
        if (!listaProdutos.length) {
            const produtosEncontrados = await produtoService.listar()
            setListaProdutos(produtosEncontrados)
        }

        const produtosEncotrados = listaProdutos.filter((produto: IProduto) => {
            return produto.nome?.toUpperCase().includes(e.query.toUpperCase())
        })

        setListaFiltradaProdutos(produtosEncotrados)
    }

    const totalVenda = () => {

        const totais: number[] = formik.values.itens?.map(iv => iv.quantidade * iv.produto.preco)

        if (totais.length) {
            return totais.reduce((somatoriaAtual = 0, valorItemAtual) => somatoriaAtual + valorItemAtual)
        } else {
            return 0
        }
    }

    const realizarNovaVenda = () => {
        onNovaVenda()   
        formik.resetForm()
        formik.setFieldValue('itens', [])
        formik.setFieldTouched('itens', false)
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
                    <small className="p-error p-d-block">
                        {formik.errors.cliente}
                    </small>
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
                        <AutoComplete
                            completeMethod={handleProdutoAutocomplete}
                            id="produto"
                            name="produto"
                            onChange={e => setProduto(e.value)}
                            suggestions={listaFiltradaProdutos} value={produto} field="nome" />

                    </div>
                    <div className="p-col-2">
                        <span className="p-float-label">
                            <InputText id="qtdProduto" value={quantidadeProduto} onChange={e => setQuantidadeProduto(parseInt(e.target.value))} />
                            <label htmlFor="qtdProduto">QTD</label>
                        </span>
                    </div>
                    <div className="p-col-2">
                        <Button disabled={disableAddProdutoButton()} type="button" label="Adicionar" onClick={handleAddProduto} />
                    </div>

                    <div className="p-col-12">
                        <DataTable value={formik.values.itens} emptyMessage="Nenhum produto adicionado...">
                            <Column body={(item: IItemVenda) => {

                                const handleRemoverItem = () => {
                                    const novaLista = formik.values.itens?.filter(iv => iv.produto.id != item.produto.id)

                                    formik.setFieldValue("itens", novaLista)
                                }


                                return (
                                    <Button label="Excluir" type="button" onClick={handleRemoverItem} />
                                )
                            }} />
                            <Column field="produto.id" header="Código" />
                            <Column field="produto.sku" header="SKU" />
                            <Column field="produto.nome" header="Produto" />
                            <Column field="produto.preco" header="Preço Unitário" />
                            <Column field="quantidade" header="QTD" />
                            <Column header="Total" body={(iv: IItemVenda) => {
                                const total = iv.produto.preco * iv.quantidade
                                const totalFormatado = formatadorMoney.format(total)
                                return (
                                    <div>
                                        {totalFormatado}
                                    </div>
                                )
                            }} />
                        </DataTable>
                        <small className="p-error p-d-block">
                            {formik.touched && formik.errors.itens}
                        </small>
                    </div>
                    <div className="p-col-6">
                        <div className="p-field">
                            <label htmlFor="formaPagamento" >Forma de Pagamento: *</label>
                            <Dropdown
                                id="formaPagamento"
                                options={formasPagamento}
                                value={formik.values.formaPagamento}
                                onChange={e => formik.setFieldValue("formaPagamento", e.value)}
                                placeholder="Selecione..."
                            />
                            <small className="p-error p-d-block">
                                {formik.touched && formik.errors.formaPagamento}
                            </small>
                        </div>
                    </div>
                    <div className="p-col-3">
                        <div className="p-field">
                            <label htmlFor="itens">Itens:</label>
                            <InputText disabled value={formik.values.itens?.length} />
                        </div>
                    </div>
                    <div className="p-col-3">
                        <div className="p-field">
                            <label htmlFor="total">Total:</label>
                            <InputText disabled value={formatadorMoney.format(formik.values.total)} />
                        </div>
                    </div>
                </div>
                {!vendaRealizada &&
                    <Button disabled={!produtosArray} type="submit" label="Finalizar" onClick={e => onSubmit(formik.values)} />
                }
                {vendaRealizada &&
                     <Button  type="button" label="Nova venda" className="p-button-success" onClick={realizarNovaVenda}/>
                }

            </div>
            <Dialog position="center" visible={!!mensagem} onHide={handleFecharDialogProdutoNaoEncontrado} header="Atenção" footer={dialogMensagemFooter}>
                {mensagem}
            </Dialog>
        </form>

    )
}