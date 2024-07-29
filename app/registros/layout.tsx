export default function RegistrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-start justify-start gap-4 py-8 md:py-10">
      <div style={{width:'inherit'}} className="max-w-lg text-left justify-start md:py-10">
        {children}
      </div>
    </section>
  );
}
