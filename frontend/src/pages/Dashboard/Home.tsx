import PageMeta from "../../components/common/PageMeta";
import CreditDashboardCharts from "../../components/ecommerce/CreditDashboardCharts";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard | Credify — Intelligent Credit Risk Engine"
        description="AI-powered credit intelligence platform for smarter corporate lending decisions."
      />
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Credit Risk Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Portfolio-level risk intelligence and analytics</p>
      </div>
      <CreditDashboardCharts />
    </>
  );
}
