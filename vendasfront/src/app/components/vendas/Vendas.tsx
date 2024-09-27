'use client'

import { IVendas } from "@/app/api/models/vendas/IVendas";
import { Layout } from "..";
import { VendasForm } from "./VendasForm";

export const Vendas: React.FC = () => {

    const handleSubmit = (venda: IVendas) => {
        console.log(venda)
    }

    return (
        <Layout titulo="Vendas">
            <VendasForm onSubmit={handleSubmit} />
        </Layout>
    )
}