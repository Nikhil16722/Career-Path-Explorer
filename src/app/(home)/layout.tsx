// (home) route group layout — no extra wrapping needed,
// the root layout (src/app/layout.tsx) handles html/body/navbar/footer.

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
