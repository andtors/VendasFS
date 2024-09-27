import { ICliente } from "../clientes/IClientes";
import { IProduto } from "../produtos/IProduto";

export interface IVendas {
    cliente?: ICliente
    produtos?: Array<IProduto>
    formaPagamento?: string
    total: number
}