import {httpClient} from '@/app/api/http/index'
import {ICliente} from '@/app/api/models/clientes/IClientes'
import { Axios, AxiosResponse } from 'axios'

const resourcedURL: string = '/api/clientes'

export const useClienteService = () => {

    const salvar = async (cliente: ICliente): Promise<ICliente> => {

        const response: AxiosResponse<ICliente> = await httpClient.post<ICliente>(resourcedURL, cliente)

        return response.data
    }

    const atualizar = async (cliente: ICliente) : Promise<void> => {
        
        const url : string = `${resourcedURL}/${cliente.id}`

        await httpClient.put<ICliente>(url, cliente)
    }

    const carregarCliente = async (id: string | null) : Promise<ICliente> => {
        const url : string = `${resourcedURL}/${id}`
        const response: AxiosResponse<ICliente> = await httpClient.get(url)
        return response.data;
    }

    const deletar = async (id: string) : Promise<void> => {
        const url : string = `${resourcedURL}/${id}`
        await httpClient.delete(url)
    }

    return {
        salvar,
        atualizar,
        carregarCliente,
        deletar
    }
}