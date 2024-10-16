import { httpClient } from "../http";
import { IVendas } from "../models/vendas/IVendas";

const resourcedURL = '/api/vendas'

export const useVendaService = () => {

    const realizarVenda = async (venda: IVendas) : Promise<void> => {
        await httpClient.post<IVendas>(resourcedURL, venda)
    }

    return {
        realizarVenda
    }
}