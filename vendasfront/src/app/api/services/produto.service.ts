import { httpClient } from "../http";
import { IProduto } from '../models/produtos/IProduto'
import { Axios, AxiosResponse } from "axios";

const resourcedURL: string = "/api/produtos"

export const useProdutoService = () => {

    const salvar = async (produto: IProduto) : Promise<IProduto> => {

        const response: AxiosResponse<IProduto> = await httpClient.post(resourcedURL, produto)

        return response.data
    }

    return {
        salvar
    }
}