import { ICliente } from "../clientes/IClientes";
import { IProduto } from "../produtos/IProduto";

export interface IVendas {
    cliente?: ICliente
    itens?: Array<IItemVenda>
    formaPagamento?: string
    total: number
}

export interface IItemVenda{
    produto?: IProduto
    quantidade: number | undefined
}