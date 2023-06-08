import Sidebar from "../components/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterProvider from "./lib/Toast";
import getCurrentUser from "./actions/getCurrentUser";
import Providers from "./providers/Providers";
import getReminders from "./actions/getReminders";
import ReduxProvider from "./providers/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const reminders = await getReminders();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ToasterProvider />
        <ReduxProvider>
          <Providers>
            <Sidebar currentUser={currentUser} reminders={reminders}>
              {children}
            </Sidebar>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
