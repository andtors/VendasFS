'use client'

import { IVendas } from "@/app/api/models/vendas/IVendas";
import { Layout } from "..";
import { VendasForm } from "./VendasForm";
import { useVendaService } from "@/app/api/services/vendas.service";
import { Alert } from "../common/message/Message";
import { useState } from "react";

export const Vendas: React.FC = () => {

    const service = useVendaService()
    const [messages, setMessages] = useState<Alert[]>([])
    const [vendaRealizada, setVendaRealizada] = useState<boolean>(false)

    const handleSubmit = (venda: IVendas) => {
       service.realizarVenda(venda).then(response => {
            setVendaRealizada(true)
            setMessages([{
                texto:"Venda realizada com sucesso!", 
                tipo: "success"
            }])
       }).catch(error => {
        console.log(error)
        setMessages([{
            texto:"Ocorreu um erro! Entre em contato com a administração.", 
            tipo: "danger"
        }])
       })

    }

    const handleNovaVenda = () => {
        setVendaRealizada(false)
    }

    return (
        <Layout titulo="Vendas" mensagens={messages}>
            <VendasForm 
            onSubmit={handleSubmit}
            vendaRealizada={vendaRealizada}
            onNovaVenda={handleNovaVenda}/>
        </Layout>
    )
}