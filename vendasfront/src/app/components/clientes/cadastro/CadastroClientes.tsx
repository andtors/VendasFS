'use client'

import { useState } from "react";
import { Layout } from "../../layout/Layout"
import { ClienteForm } from "./Form"
import { ICliente } from "@/app/api/models/clientes/IClientes";


export const CadastroClientes: React.FC = () => {

  const [cliente, setCliente] = useState<ICliente>({
    
  });

  const handleSubmit = (cliente: ICliente) => {
    console.log(cliente)
  }
  return (
    <Layout titulo="Clientes">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit}/>
    </Layout>
  )
}

