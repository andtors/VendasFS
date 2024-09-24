'use client'

import { Layout } from "../../layout/Layout"
import { Input, InputCPF } from "../../common/input/Input"
import { useFormik } from "formik"
import { DataTable } from 'primereact/datatable'
import { ICliente } from "@/app/api/models/clientes/IClientes"
import { useState } from "react"
import { Column } from 'primereact/column'

interface ConsultaClientesForm {
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {

    const [clientes, setClientes] = useState<ICliente[]>([
        {id: "1", nome:"Fulano", email:"fulano@email.com", cpf: "000.000.000.00"}
    ])

    const handleSubmit = (filtro: ConsultaClientesForm) => {
        console.log(filtro)
    }

    const { handleSubmit: formikSubmit, values: filtro, handleChange } = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: {
            nome: "",
            cpf: ""
        }
    })

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
                        <button className="button is-success">
                            Consultar
                        </button>
                    </div>
                </div>
            </form>
            <div className="columns">
                <div className="is-full">
                    <DataTable value={clientes}>
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