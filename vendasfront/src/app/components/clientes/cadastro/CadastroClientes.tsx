'use client'

import { useState } from "react";
import { Layout } from "../../layout/Layout"
import { ClienteForm } from "./Form"
import { ICliente } from "@/app/api/models/clientes/IClientes";
import { useClienteService } from "@/app/api/services/cliente.service";
import { Alert } from "../../common/message/Message";


export const CadastroClientes: React.FC = () => {

  const [cliente, setCliente] = useState<ICliente>({})
  const [messages, setMessages] = useState<Array<Alert>>([])
  const service = useClienteService()

  const handleSubmit = (cliente: ICliente) => {
    if (cliente.id) {
      service.atualizar(cliente)
        .then(response => {
          setMessages([{
            tipo: "success", texto: "Cliente atualizado com sucesso!"
          }])
        })
    } else {
      service.salvar(cliente)
        .then(clienteSalvo => {
          setCliente(clienteSalvo)
          setMessages([{
            tipo: "success", texto: "Cliente cadastrado com sucesso!"
          }])
        })
    }
  }
  return (
    <Layout titulo="Clientes" mensagens={messages}>
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  )
}

