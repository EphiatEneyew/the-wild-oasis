import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationProvider";

const josfin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap"
})


export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default : "Welcome / The Wild Oasis",
  }, 
  description: 
          "Lexurious cabin hotel, located in the heart of the Italian Dolomites surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html >
      <body className= { `${josfin.className} bg-primary-950
         text-primary-100 min-h-screen flex flex-col`} >
        <Header />

        <div className="flex-1 px-8 py-10">
          <ReservationProvider>
             <main className="max-w7xl">{children}</main>
          </ReservationProvider>
          
        </div>
        
      </body>
    </html>
  )
}
