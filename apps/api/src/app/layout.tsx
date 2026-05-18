import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
