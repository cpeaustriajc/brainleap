export default function ProfileLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <main className="px-4 pt-2 rounded-lg col-start-2 row-span-2 border bg-background text-foreground">
      {children}
    </main>
  )
}
