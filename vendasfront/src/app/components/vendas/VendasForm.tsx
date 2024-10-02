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

interface VendaFormProps {
    onSubmit: (venda: IVendas) => void
}

const formScheme: IVendas = {
    cliente: null,
    produtos: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendaFormProps> = ({
    onSubmit
}) => {

    const service = useClienteService()
    const produtoService = useProdutoService()
    const [codigoProduto, setCodigoProduto] = useState<string>('')
    const [produto, setProduto] = useState<IProduto>(null)
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
        produtoService.carregarProduto(codigoProduto)
            .then(produtoEncontrado => setProduto(produtoEncontrado))
            .catch(error => console.log(error))
    }

    const handleAddProduto = () => {
        const produtosJaAdicionados = formik.values.produtos
        produtosJaAdicionados?.push(produto)
        setProduto(null)
        setCodigoProduto('')
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
                        <InputText id="qtdProduto" />
                            <label htmlFor="qtdProduto">QTD</label>
                    </span>
                    </div>
                    <div className="p-col-2">
                       <Button  label="Adicionar" onClick={handleAddProduto}/>
                    </div>
                </div>

                <Button type="submit" label="Finalizar" />
            </div>
        </form>
    )
}