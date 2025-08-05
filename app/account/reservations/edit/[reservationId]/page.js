import Reservation from "@/app/_components/Reservation";
import ReservationEditForm from "@/app/_components/ReservationEditForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";




export default async function Page({params}) {
  const {id, numGuests, observations, cabinId} = await getBooking(params.reservationId);
  const {maxCapacity} = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{params.reservationId}
      </h2>

      <ReservationEditForm id={id} numGuests={numGuests} observations={observations} maxCapacity={maxCapacity}/>
    </div>
  );
}
