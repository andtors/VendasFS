import { ICliente } from "@/app/api/models/clientes/IClientes"
import { useFormik } from 'formik'
import { Input } from "../../common/input/Input";
import { useState } from "react";

interface ClienteFormProps {
    cliente: ICliente;
    onSubmit: (cliente: ICliente) => void;
}


const formScheme: ICliente = {
    cadastro: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    endereco: '',
    id: '',
    nome: '',
    telefone: ''
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSubmit }) => {

    const [nome, setNome] = useState("")

    const formik = useFormik<ICliente>({
        initialValues: { ...formScheme, ...cliente },
        onSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.id &&
                <div className="columns">
                    <Input
                        ForAndId="id"
                        label="ID:"
                        columnClasses="is-half"
                        value={formik.values.id}
                        disabled
                    />
                    <Input
                        ForAndId="cadastro"
                        label="Data Cadastro:"
                        columnClasses="is-half"
                        value={formik.values.cadastro}
                        disabled
                    />
                </div>
            }
            <div className="columns">
                <Input
                    ForAndId="nome"
                    label="Nome: *"
                    columnClasses="is-full"
                    onChange={setNome}
                    value={formik.values.nome}
                />
            </div>
            <div className="columns">
                <Input
                    ForAndId="cpf"
                    label="CPF: *"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.cpf}
                />
                <Input
                    ForAndId="dataNascimento"
                    label="Data de Nascimento: *"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.dataNascimento}
                />
            </div>
            <div className="columns">
                <Input
                    ForAndId="endereco"
                    label="Endereço: *"
                    columnClasses="is-full"
                    onChange={formik.handleChange}
                    value={formik.values.endereco}
                />
            </div>
            <div className="columns">
                <Input
                    ForAndId="email"
                    label="E-mail: *"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <Input
                    ForAndId="telefone"
                    label="Telefone: *"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.telefone}
                />
            </div>

            <div className="field is-grouped">
                <div className="control is-link">
                    <button type="submit" className="button">
                        {formik.values.id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            </div>
        </form>
    )
}