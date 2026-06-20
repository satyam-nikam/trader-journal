export default function MainContent ({
    children,
}:{children: React.ReactNode}) {
    return (
        <main className="ml-64 mt-15 p-5 min-h-screen bg-[#f2f2f2] text-[#2c2c2c]">
            {children}
        </main>
    )
}