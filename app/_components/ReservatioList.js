"use client"
import ReservationCard from "@/app/_components/ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/action";

export default function ReservatioList({Bookings}) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(Bookings, (currBookings, bookingId) => { return currBookings.filter(booking => booking.id !== bookingId)});

    async function deleteHandler(bookingId) {
        optimisticDelete(bookingId);
        await deleteReservation(bookingId);
    }
  return (
    <div>
        <ul className="space-y-6">
          {optimisticBookings.map((booking) => (
            <ReservationCard onDelete={deleteHandler} booking={booking} key={booking.id} />
          ))}
        </ul>
    </div>
  )
}
