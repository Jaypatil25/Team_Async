import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const cardCls = "rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]";
const titleCls = "mb-1 text-sm font-semibold text-gray-800 dark:text-white/90";
const subCls = "mb-4 text-xs text-gray-500 dark:text-gray-400";

// ── 1. Risk Distribution Donut ──────────────────────────────────────────────
function RiskDonut() {
  const options: ApexOptions = {
    chart: { type: "donut", fontFamily: "Outfit, sans-serif", toolbar: { show: false } },
    colors: ["#12b76a", "#f79009", "#f04438"],
    labels: ["Low Risk", "Medium Risk", "High Risk"],
    legend: { position: "bottom", fontSize: "12px" },
    plotOptions: {
      pie: {
        donut: {
          size: "68%",
          labels: {
            show: true,
            total: { show: true, label: "Total Applications", fontSize: "11px", color: "#667085", formatter: () => "248" },
            value: { fontSize: "22px", fontWeight: 700, color: "#101828" },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v} apps` } },
  };
  return (
    <div className={cardCls}>
      <p className={titleCls}>Risk Distribution</p>
      <p className={subCls}>By application risk level</p>
      <Chart options={options} series={[142, 74, 32]} type="donut" height={280} />
    </div>
  );
}

// ── 2. Loan Volume Trend ────────────────────────────────────────────────────
function LoanVolumeTrend() {
  const options: ApexOptions = {
    chart: { type: "area", fontFamily: "Outfit, sans-serif", toolbar: { show: false }, zoom: { enabled: false } },
    colors: ["#465fff", "#12b76a"],
    stroke: { curve: "smooth", width: [2, 2] },
    fill: { type: "gradient", gradient: { opacityFrom: 0.3, opacityTo: 0 } },
    dataLabels: { enabled: false },
    legend: { position: "top", horizontalAlign: "right", fontSize: "12px" },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: ["#667085"], fontSize: "12px" } } },
    grid: { borderColor: "#f2f4f7", xaxis: { lines: { show: false } } },
    tooltip: { shared: true, intersect: false },
  };
  const series = [
    { name: "Submitted", data: [28, 35, 30, 42, 38, 50, 47, 60, 55, 68, 72, 80] },
    { name: "Approved",  data: [18, 22, 20, 28, 25, 34, 30, 42, 38, 48, 52, 58] },
  ];
  return (
    <div className={cardCls}>
      <p className={titleCls}>Loan Volume Trend</p>
      <p className={subCls}>Applications submitted vs approved</p>
      <Chart options={options} series={series} type="area" height={260} />
    </div>
  );
}

// ── 3. Sector-wise Exposure ─────────────────────────────────────────────────
function SectorExposure() {
  const options: ApexOptions = {
    chart: { type: "bar", fontFamily: "Outfit, sans-serif", toolbar: { show: false } },
    colors: ["#465fff"],
    plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Manufacturing", "Trading", "Services", "FMCG", "Others"], axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `₹${(v / 10000000).toFixed(0)}Cr`, style: { colors: ["#667085"], fontSize: "11px" } } },
    grid: { borderColor: "#f2f4f7", xaxis: { lines: { show: false } } },
    tooltip: { y: { formatter: (v: number) => `₹${(v / 10000000).toFixed(2)} Cr` } },
  };
  const series = [{ name: "Exposure", data: [85000000, 62000000, 74000000, 48000000, 31000000] }];
  return (
    <div className={cardCls}>
      <p className={titleCls}>Sector-wise Exposure</p>
      <p className={subCls}>Total loan exposure by industry (₹ Cr)</p>
      <Chart options={options} series={series} type="bar" height={260} />
    </div>
  );
}

// ── 4. NPA Risk Prediction ──────────────────────────────────────────────────
function NPARisk() {
  const options: ApexOptions = {
    chart: { type: "area", fontFamily: "Outfit, sans-serif", toolbar: { show: false }, zoom: { enabled: false } },
    colors: ["#f04438"],
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { colorStops: [{ offset: 0, color: "#f04438", opacity: 0.35 }, { offset: 100, color: "#f04438", opacity: 0.02 }] } },
    dataLabels: { enabled: false },
    markers: { size: 4, colors: ["#f04438"], strokeColors: "#fff", strokeWidth: 2, hover: { size: 6 } },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 40, labels: { formatter: (v: number) => `${v}%`, style: { colors: ["#667085"], fontSize: "12px" } } },
    grid: { borderColor: "#f2f4f7", xaxis: { lines: { show: false } } },
    annotations: {
      yaxis: [{ y: 25, borderColor: "#f79009", label: { text: "Warning threshold", style: { color: "#f79009", fontSize: "11px" } } }],
    },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  };
  const series = [{ name: "Default Probability", data: [8, 10, 9, 12, 15, 14, 18, 22, 20, 28, 25, 30] }];
  return (
    <div className={cardCls}>
      <p className={titleCls}>NPA Risk Prediction</p>
      <p className={subCls}>Estimated default probability over time</p>
      <Chart options={options} series={series} type="area" height={260} />
    </div>
  );
}

// ── 5. Cash Flow Stability ──────────────────────────────────────────────────
function CashFlow() {
  const options: ApexOptions = {
    chart: { type: "line", fontFamily: "Outfit, sans-serif", toolbar: { show: false }, zoom: { enabled: false } },
    colors: ["#12b76a", "#465fff"],
    stroke: { curve: "smooth", width: [2, 2] },
    dataLabels: { enabled: false },
    legend: { position: "top", horizontalAlign: "right", fontSize: "12px" },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `₹${(v / 100000).toFixed(0)}L`, style: { colors: ["#667085"], fontSize: "11px" } } },
    grid: { borderColor: "#f2f4f7", xaxis: { lines: { show: false } } },
    tooltip: { shared: true, intersect: false, y: { formatter: (v: number) => `₹${(v / 100000).toFixed(1)}L` } },
  };
  const series = [
    { name: "Inflows",  data: [420000, 480000, 460000, 510000, 490000, 540000, 520000, 580000, 560000, 610000, 590000, 640000] },
    { name: "Outflows", data: [380000, 400000, 420000, 440000, 430000, 460000, 450000, 490000, 480000, 520000, 510000, 550000] },
  ];
  return (
    <div className={cardCls}>
      <p className={titleCls}>Cash Flow Stability</p>
      <p className={subCls}>Inflow vs outflow from bank statement analysis</p>
      <Chart options={options} series={series} type="line" height={260} />
    </div>
  );
}

// ── 6. Debt vs Profitability Scatter ────────────────────────────────────────
function DebtVsProfit() {
  const options: ApexOptions = {
    chart: { type: "scatter", fontFamily: "Outfit, sans-serif", toolbar: { show: false }, zoom: { enabled: false } },
    colors: ["#12b76a", "#f79009", "#f04438"],
    dataLabels: { enabled: false },
    legend: { position: "top", horizontalAlign: "right", fontSize: "12px" },
    xaxis: {
      title: { text: "Total Debt (₹ Cr)", style: { color: "#667085", fontSize: "11px" } },
      labels: { formatter: (v: string) => `₹${Number(v) / 10000000}Cr`, style: { colors: ["#667085"], fontSize: "11px" } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: {
      title: { text: "Net Profit (₹ Cr)", style: { color: "#667085", fontSize: "11px" } },
      labels: { formatter: (v: number) => `₹${v / 10000000}Cr`, style: { colors: ["#667085"], fontSize: "11px" } },
    },
    grid: { borderColor: "#f2f4f7" },
    annotations: {
      xaxis: [{ x: 50000000, borderColor: "#d0d5dd", label: { text: "Debt midpoint", style: { fontSize: "10px", color: "#98a2b3" } } }],
      yaxis: [{ y: 10000000, borderColor: "#d0d5dd", label: { text: "Profit midpoint", style: { fontSize: "10px", color: "#98a2b3" } } }],
    },
    tooltip: { x: { formatter: (v: number) => `Debt: ₹${(v / 10000000).toFixed(1)}Cr` }, y: { formatter: (v: number) => `Profit: ₹${(v / 10000000).toFixed(1)}Cr` } },
  };
  const series = [
    { name: "Low Risk",    data: [[10000000,18000000],[15000000,22000000],[8000000,14000000],[20000000,25000000]] },
    { name: "Medium Risk", data: [[35000000,12000000],[42000000,8000000],[50000000,15000000],[38000000,6000000]] },
    { name: "High Risk",   data: [[70000000,2000000],[85000000,-1000000],[65000000,1000000],[90000000,-3000000]] },
  ];
  return (
    <div className={cardCls}>
      <p className={titleCls}>Debt vs Profitability</p>
      <p className={subCls}>Each point represents a company — color by risk</p>
      <Chart options={options} series={series} type="scatter" height={280} />
    </div>
  );
}

// ── 7. GST Consistency Heatmap ──────────────────────────────────────────────
function GSTHeatmap() {
  const options: ApexOptions = {
    chart: { type: "heatmap", fontFamily: "Outfit, sans-serif", toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ["#f04438"],
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.6,
        radius: 4,
        colorScale: {
          ranges: [
            { from: 0, to: 2,  name: "Consistent", color: "#12b76a" },
            { from: 3, to: 5,  name: "Minor mismatch", color: "#f79009" },
            { from: 6, to: 10, name: "High inconsistency", color: "#f04438" },
          ],
        },
      },
    },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    grid: { borderColor: "#f2f4f7" },
    legend: { position: "top", horizontalAlign: "right", fontSize: "12px" },
    tooltip: { y: { formatter: (v: number) => `Mismatch score: ${v}` } },
  };
  const series = [
    { name: "GSTR-1",  data: [1, 2, 4, 1, 7, 3, 2, 8, 5, 2, 1, 3] },
    { name: "GSTR-3B", data: [2, 1, 3, 5, 6, 2, 4, 9, 3, 1, 2, 4] },
    { name: "GSTR-9",  data: [0, 1, 2, 1, 3, 1, 2, 4, 2, 1, 0, 2] },
  ];
  return (
    <div className={cardCls}>
      <p className={titleCls}>GST Consistency Heatmap</p>
      <p className={subCls}>Filing mismatch intensity by month</p>
      <Chart options={options} series={series} type="heatmap" height={220} />
    </div>
  );
}

// ── 8. Customer Concentration ───────────────────────────────────────────────
function CustomerConcentration() {
  const categories = ["Reliance Industries", "Tata Motors", "Infosys Ltd", "HDFC Bank", "Wipro Ltd"];
  const options: ApexOptions = {
    chart: { type: "bar", fontFamily: "Outfit, sans-serif", toolbar: { show: false } },
    colors: ["#f04438", "#f04438", "#f79009", "#465fff", "#465fff"],
    plotOptions: { bar: { horizontal: true, borderRadius: 5, barHeight: "55%", distributed: true } },
    dataLabels: { enabled: true, formatter: (v: number) => `${v}%`, style: { fontSize: "11px", colors: ["#fff"] } },
    legend: { show: false },
    xaxis: { min: 0, max: 60, categories, labels: { formatter: (v: string) => `${v}%`, style: { colors: ["#667085"], fontSize: "11px" } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: ["#344054"], fontSize: "12px" } } },
    grid: { borderColor: "#f2f4f7", xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
    annotations: { xaxis: [{ x: 40, borderColor: "#f04438", label: { text: "40% threshold", style: { color: "#f04438", fontSize: "10px" } } }] },
    tooltip: { y: { formatter: (v: number) => `${v}% of revenue` } },
  };
  return (
    <div className={cardCls}>
      <p className={titleCls}>Customer Concentration</p>
      <p className={subCls}>Top 5 customers by revenue contribution — <span className="text-error-500">red = &gt;40%</span></p>
      <Chart options={options} series={[{ name: "Revenue %", data: [48, 42, 28, 15, 10] }]} type="bar" height={240} />
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────
export default function CreditDashboardCharts() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Row 1 */}
      <div className="col-span-12 md:col-span-5"><RiskDonut /></div>
      <div className="col-span-12 md:col-span-7"><LoanVolumeTrend /></div>

      {/* Row 2 */}
      <div className="col-span-12 md:col-span-6"><SectorExposure /></div>
      <div className="col-span-12 md:col-span-6"><NPARisk /></div>

      {/* Row 3 */}
      <div className="col-span-12 md:col-span-6"><CashFlow /></div>
      <div className="col-span-12 md:col-span-6"><DebtVsProfit /></div>

      {/* Row 4 */}
      <div className="col-span-12 md:col-span-6"><GSTHeatmap /></div>
      <div className="col-span-12 md:col-span-6"><CustomerConcentration /></div>
    </div>
  );
}
