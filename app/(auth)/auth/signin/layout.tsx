export default function Layout({
  children,
  dialog,
}: { children: React.ReactNode; dialog: React.ReactNode }) {
  return (
    <main className="grid h-dvh place-items-center">
      {children}
      {dialog}
    </main>
  )
}
