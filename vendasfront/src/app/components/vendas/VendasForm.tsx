import { ICliente } from "@/app/api/models/clientes/IClientes"
import { IPage } from "@/app/api/models/common/IPage"
import { IVendas } from "@/app/api/models/vendas/IVendas"
import { useFormik } from "formik"
import { AutoComplete, AutoCompleteChangeParams, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete'
import { useState } from "react"
import { useClienteService } from "@/app/api/services"
import {Button} from 'primereact/button'

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
                <Button type="submit" label="Finalizar"/>
            </div>
        </form>
    )
}