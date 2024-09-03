import { httpClient } from "../http";
import { IProduto } from '../models/produtos/IProduto'
import { Axios, AxiosResponse } from "axios";

const resourcedURL: string = "/api/produtos"

export const useProdutoService = () => {

    const salvar = async (produto: IProduto) : Promise<IProduto> => {

        const response: AxiosResponse<IProduto> = await httpClient.post(resourcedURL, produto)


        return response.data
    }

    const atualizar = async (produto: IProduto) : Promise<void> => {
        
        const url : string = `${resourcedURL}/${produto.id}`

        await httpClient.put<IProduto>(url, produto)
    }

    const carregarProduto = async (id: string | null) : Promise<IProduto> => {
        const url : string = `${resourcedURL}/${id}`
        const response: AxiosResponse<IProduto> = await httpClient.get(url)
        return response.data;
    }

    const deletar = async (id: string) : Promise<void> => {
        const url : string = `${resourcedURL}/${id}`
        await httpClient.delete(url)
    }

    return {
        salvar,
        atualizar,
        carregarProduto,
        deletar
    }
}