'use client'

import { VendaPorMes } from '@/app/api/models/dashboard/IDashboard';
import { Card } from 'primereact/card'
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { MESES } from '@/app/api/util/meses/index'

interface DashboardProps {
    clientes?: number;
    produtos?: number;
    vendas?: number;
    vendasPorMes?: VendaPorMes[];
}


export const Dashboard: React.FC<DashboardProps> = ({
    clientes,
    produtos,
    vendas,
    vendasPorMes
}) => {

    const carregaDadosGrafico = () => {
        const labels: string[] = vendasPorMes?.map(vm => MESES[ vm.mes - 1])
        const valores = vendasPorMes?.map(vm => vm.valor)
        
        const dadosGrafico = {
            labels: labels,
            datasets:[
                {
                    label: "Valor mensal",
                    backgroundColor: "#42A5F5",
                    data: valores
                }
            ]
        }

        setChartData(dadosGrafico)
    }

    useEffect(carregaDadosGrafico, [])

    const [chartData, setChartData] = useState({})

    const produtoCardStyle = {
        background: "red",
        color: "white"
    }

    const clienteCardStyle = {
        background: "blue",
        color: "white"
    }

    const vendaCardStyle = {
        background: "green",
        color: "white"
    }

    return (
        <div className="p-fluid">
            <div className="p-grid">
                <div className="p-col">
                    <Card title="Produtos" style={produtoCardStyle}>
                        <p className='p-m-0'>
                            {produtos}
                        </p>
                    </Card>
                </div>

                <div className="p-col">
                    <Card title="Clientes" style={clienteCardStyle}>
                        <p className='p-m-0'>
                            {clientes}
                        </p>
                    </Card>
                </div>
                <div className="p-col" >
                    <Card title="Vendas" style={vendaCardStyle}>
                        <p className='p-m-0'>
                            {vendas}
                        </p>
                    </Card>
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col">
                <Chart 
                type="bar" 
                data={chartData} 
                style={{position: 'relative', width: '70%' }} 
                />
                </div>
            </div>
        </div>
    )
}