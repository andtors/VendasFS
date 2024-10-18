export interface IDashboardData {
    produtos?: number;
    clientes?: number;
    vendas?: number;
    vendaPorMes?: VendaPorMes[]
}

export interface VendaPorMes {
    mes?: number;
    valor?: number;
}