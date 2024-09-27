import { IVendas } from "@/app/api/models/vendas/IVendas"
import { useFormik } from "formik"
import { AutoComplete } from 'primereact/autocomplete'

interface VendaFormProps {
    onSubmit: (venda: IVendas) => void
}

const formScheme: IVendas = {
    cliente: {},
    produtos: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendaFormProps> = ({
    onSubmit
}) => {

    const formik = useFormik<IVendas>({
        onSubmit,
        initialValues: formScheme
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="cliente">Cliente: *</label>
                <AutoComplete 
                    id="cliente"
                    name="cliente"/>
                </div>
            </div>
        </form>
    )
}