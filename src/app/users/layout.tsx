
export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="ontainer mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 min-h-screen flex flex-col items-center">
      {children}
    </main>
  );
}