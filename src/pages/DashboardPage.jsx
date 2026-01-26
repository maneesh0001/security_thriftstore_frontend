import React, { useState, useEffect } from 'react';
import { DollarSign, Users2, ShoppingBag, AlertTriangle } from 'lucide-react';
import StatCard from '../Components/admin/StatCard';
import BarChartCard from '../Components/admin/BarChartCard';
import PieChartCard from '../Components/admin/PieChartCard';
import RecentOrdersCard from '../Components/admin/RecentOrdersCard';
import StockAlertCard from '../Components/admin/StockAlertCard';
import { getDashboardStats, getRecentOrders, getSalesData, getCategorySales, getStockAlerts } from '../api/admin/dashboardApi';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [salesData, setSalesData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [stockAlerts, setStockAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch all dashboard data in parallel
            const [statsRes, ordersRes, salesRes, categoryRes, alertsRes] = await Promise.all([
                getDashboardStats(),
                getRecentOrders(),
                getSalesData(),
                getCategorySales(),
                getStockAlerts()
            ]);

            setStats(statsRes);
            setRecentOrders(ordersRes.orders || []);
            setSalesData(salesRes);
            setCategoryData(categoryRes);
            setStockAlerts(alertsRes.alerts || []);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            // Set fallback data if API fails
            setStats({
                totalRevenue: { value: 0, change: 0, changeType: 'positive' },
                newCustomers: { value: 0, change: 0, changeType: 'positive' },
                totalOrders: { value: 0, change: 0, changeType: 'positive' },
                pendingOrders: { value: 0, change: 0, changeType: 'positive' }
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Stat Cards with Real Data */}
            <StatCard 
                title="Total Revenue" 
                value={`Rs. ${stats?.totalRevenue?.value?.toLocaleString() || '0'}`} 
                change={`${stats?.totalRevenue?.change > 0 ? '+' : ''}${stats?.totalRevenue?.change || '0'}%`} 
                changeType={stats?.totalRevenue?.changeType || 'positive'} 
                icon={<DollarSign size={20} />} 
            />
            <StatCard 
                title="New Customers" 
                value={stats?.newCustomers?.value?.toLocaleString() || '0'} 
                change={`${stats?.newCustomers?.change > 0 ? '+' : ''}${stats?.newCustomers?.change || '0'}%`} 
                changeType={stats?.newCustomers?.changeType || 'positive'} 
                icon={<Users2 size={20} />} 
            />
            <StatCard 
                title="Total Orders" 
                value={stats?.totalOrders?.value?.toLocaleString() || '0'} 
                change={`${stats?.totalOrders?.change > 0 ? '+' : ''}${stats?.totalOrders?.change || '0'}%`} 
                changeType={stats?.totalOrders?.changeType || 'positive'} 
                icon={<ShoppingBag size={20} />} 
            />
            <StatCard 
                title="Pending Orders" 
                value={stats?.pendingOrders?.value?.toLocaleString() || '0'} 
                change={`${stats?.pendingOrders?.change > 0 ? '+' : ''}${stats?.pendingOrders?.change || '0'}%`} 
                changeType={stats?.pendingOrders?.changeType || 'positive'} 
                icon={<AlertTriangle size={20} />} 
            />

            {/* Chart Cards with Real Data */}
            <BarChartCard
                title="Monthly Sales"
                description="Sales performance over the last 6 months"
                data={salesData?.monthlyData || []}
            />
            <PieChartCard
                title="Sales by Category"
                description="Breakdown of sales across product categories"
                data={categoryData?.categories || []}
            />

            {/* Table/List Cards with Real Data */}
            <RecentOrdersCard orders={recentOrders} />
            <StockAlertCard alerts={stockAlerts} />

        </div>
    );
};

export default DashboardPage;
