
import { Layout, Dashboard } from "./components";
import { useDashboardService } from "./api/services/dashboard.service";
import { IDashboardData } from "./api/models/dashboard/IDashboard";

interface HomeProps {
  dashboard: IDashboardData;
}

export default async function Home(props: HomeProps) {
  
  const service = useDashboardService()
  const dashboard: IDashboardData = await service.get()

  return (
   
    <Layout titulo="Dashboard">
        <Dashboard 
        clientes={dashboard.clientes} 
        produtos={dashboard.produtos} 
        vendas={dashboard.vendas}
        vendasPorMes={dashboard.vendaPorMes}/>
    </Layout>
  );
}
