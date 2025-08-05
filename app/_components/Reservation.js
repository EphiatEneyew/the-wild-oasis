import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getSettings, getBookedDatesByCabinId } from "@/app/_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";


export default async function Reservation({cabin}) {
    
    const session = await auth()
    const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)]);
    
  return (
    <div >
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector settings={settings} cabin={cabin} bookedDates={bookedDates}/>
            {session?.user ? (<ReservationForm cabin={cabin} user={session.user} settings={settings}/>) : <LoginMessage /> }
        </div>
        
    </div>
  )
}
