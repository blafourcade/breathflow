export const metadata = {
  title: "BreathFlow API",
  description: "Backend for the BreathFlow breathwork app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
