'use client'

import { Layout } from "../../layout/Layout"
import { Input, InputCPF } from "../../common/input/Input"
import { useFormik } from "formik"
import { DataTable, DataTablePageParams } from 'primereact/datatable'
import { ICliente } from "@/app/api/models/clientes/IClientes"
import { useState } from "react"
import { Column } from 'primereact/column'
import { IPage } from "@/app/api/models/common/IPage"
import { useClienteService } from "@/app/api/services"

interface ConsultaClientesForm {
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {

    const service = useClienteService()
    const [loading, setLoading] = useState<boolean>(false)

    const [clientes, setClientes] = useState<IPage<ICliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 10,
        totalElements: 0
    })

    const handleSubmit = (filtro: ConsultaClientesForm) => {
        handlePage(null)
    }

    const { handleSubmit: formikSubmit, values: filtro, handleChange } = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: {
            nome: "",
            cpf: ""
        }
    })

    const handlePage = (e: DataTablePageParams) => {
        setLoading(true)
        service.find(filtro.nome, filtro.cpf, e?.page, e?.rows)
            .then(result => {
                setClientes({
                    ...result, first: e?.first
                })
            })
            .finally(() => setLoading(false))
        
    }

    return (
        <Layout titulo="Clientes">

            <form onSubmit={formikSubmit}>
                <div className="columns">
                    <Input
                        id="nome" name="nome"
                        value={filtro.nome} label="Nome"
                        autoComplete="off"
                        onChange={handleChange}
                        columnClasses="is-half" />

                    <InputCPF
                        id="cpf" name="cpf"
                        value={filtro.cpf}
                        onChange={handleChange}
                        label="CPF"
                        columnClasses="is-half" />

                </div>
                <div className="field is-grouped">
                    <div className="control is-link">
                        <button className="button is-success" onClick={(e) => handleSubmit}>
                            Consultar
                        </button>
                    </div>
                </div>
            </form>
            <br />
            <div className="columns">
                <div className="is-full">
                    <DataTable 
                    value={clientes.content} 
                    totalRecords={clientes.totalElements} 
                    lazy paginator 
                    first={clientes.first} 
                    rows={clientes.size} 
                    onPage={handlePage}
                    loading={loading}
                    emptyMessage="Nenhum registro encontrado."
                    >
                        <Column field="id" header="Código"/>
                        <Column field="nome" header="Nome"/>
                        <Column field="cpf" header="CPF"/>
                        <Column field="email" header="E-mail"/>
                    </DataTable>
                </div>
            </div>
        </Layout>
    )
}