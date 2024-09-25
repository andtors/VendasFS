import {httpClient} from '@/app/api/http/index'
import {ICliente} from '@/app/api/models/clientes/IClientes'
import { Axios, AxiosResponse } from 'axios'
import { IPage } from '../models/common/IPage'

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

    const find = async (nome: string = '', cpf: string = '', page: number = 0, size: number = 10) : Promise<IPage<ICliente>> => {
            const url = `${resourcedURL}?nome=${nome}&cpf=${cpf}&page=${page}&size=${size}`
            const response: AxiosResponse<IPage<ICliente>> = await httpClient.get(url)
            return response.data
    }

    return {
        salvar,
        atualizar,
        carregarCliente,
        deletar,
        find
    }
}