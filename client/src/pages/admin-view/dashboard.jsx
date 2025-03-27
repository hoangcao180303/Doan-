
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

import OrderCount from "@/components/admin-view/countOrder";
import TotalSoldQuantity from "@/components/admin-view/sold-amount";
import OverallAverageRating from "@/components/admin-view/average-review";
import TotalIncome from "@/components/admin-view/total-income";
import RevenueChart from "@/components/admin-view/revenue-chart";

function AdminDashboard() {
  



  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <div className="flex justify-between items-end mb-4 p-2">
        <TotalIncome/>
        <OrderCount/>
        <TotalSoldQuantity/>
        <OverallAverageRating/>
      </div>
      <RevenueChart/>
        
        
    </Card>
  );

}

export default AdminDashboard;