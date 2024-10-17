import { Layout, Dashboard } from "./components";
import { useDashboardService } from "./api/services/dashboard.service";
import { IDashboardData } from "./api/models/dashboard/IDashboard";


export default async function Home() {
  
  const service = useDashboardService()
  const dashboard: IDashboardData = await service.get()

  return (
    <Layout titulo="Dashboard">
        <Dashboard clientes={dashboard.clientes} produtos={dashboard.produtos} vendas={dashboard.vendas}/>
    </Layout>
  );
}
