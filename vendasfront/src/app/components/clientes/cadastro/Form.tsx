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
                    <Input id="id" 
                            name="id"
                            label="Código: "
                            autoComplete="off" 
                            disabled
                            columnClasses="is-half"
                            value={formik.values.id} />

                    <Input id="cadastro" 
                        name="cadastro"
                        label="Data Cadastro: "
                        autoComplete="off" 
                        disabled
                        columnClasses="is-half"
                        value={formik.values.cadastro} />
            </div>   
            }
           <div className="columns">
               <Input id="nome" 
                      name="nome"
                      label="Nome: *"
                      autoComplete="off" 
                      columnClasses="is-full"
                      onChange={formik.handleChange} 
                      value={formik.values.nome} 
                      error={formik.errors.nome}
                      />
           </div>   
           <div className="columns">
               <Input id="cpf" 
                      name="cpf"
                      label="CPF: *"
                      autoComplete="off" 
                      columnClasses="is-half"
                      onChange={formik.handleChange} 
                      value={formik.values.cpf} 
                      error={formik.errors.cpf}
                      />

                <Input id="dataNascimento" 
                      name="dataNascimento"
                      label="Data Nascimento: *"
                      autoComplete="off" 
                      columnClasses="is-half"
                      onChange={formik.handleChange} 
                      value={formik.values.dataNascimento} 
                      error={formik.errors.dataNascimento}
                      />
           </div> 
           <div className="columns">
               <Input id="endereco" 
                      name="endereco"
                      label="Endereço: *"
                      autoComplete="off" 
                      columnClasses="is-full"
                      onChange={formik.handleChange} 
                      error={formik.errors.endereco}
                      value={formik.values.endereco} />
           </div>  
           <div className="columns">
               <Input id="email" 
                      name="email"
                      label="Email: *"
                      autoComplete="off" 
                      columnClasses="is-half"
                      onChange={formik.handleChange} 
                      error={formik.errors.email}
                      value={formik.values.email} />

                <Input id="telefone" 
                      name="telefone"
                      label="Telefone: *"
                      autoComplete="off" 
                      columnClasses="is-half"
                      onChange={formik.handleChange} 
                      error={formik.errors.telefone}
                      value={formik.values.telefone} />
           </div>   
           <div className="field is-grouped">
               <div className="control is-link">
                    <button type="submit" className="button is-success">
                        { formik.values.id ? "Atualizar" : "Salvar" }                        
                    </button>
                </div>
                <div className="control">
                    <button type="button" 
                            className="button">
                        Voltar                        
                    </button>
                </div>
            </div>          
        </form>
    )
}