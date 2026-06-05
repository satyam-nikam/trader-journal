import MainContent from "@/components/layout/MainContent";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}:{
    children: React.ReactNode;
}) {    
    return (
        <div className="min-h-screen bg-[#f2f2f2]">
            <Sidebar />
            <Navbar />

            <MainContent>
                {children}
            </MainContent>
        </div>
    )
}