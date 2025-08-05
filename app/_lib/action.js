"use server";
import { supabase } from './supabase';

import {auth, signIn, signOut} from "./auth";
import { revalidatePath } from 'next/cache';
import { getBookings } from './data-service';
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
    const session = await auth();
    if (!session) throw new Error ("You must be logged in");

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid nationalID");

    const updateData = { nationality, countryFlag, nationalID };

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId)
        
    
      if (error) {
        console.log(error);
        throw new Error('Guest could not be updated');
      }
    revalidatePath('/account/profile')
 }

export async function createBooking(bookingdata, formData) {

  const session = await auth();
  if (!session) throw new Error ("You must be logged in");

   const newBooking = {
    ...bookingdata,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extrasPrice: 0,
    totalPrice: bookingdata.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "uncorfimed",
 }

 console.log(newBooking)

 const { error } = await supabase
    .from('bookings')
    .insert([newBooking])

  if (error){
    console.error(error)
    throw new Error('Booking could not be created');

  } 

  revalidatePath(`/cabins/${bookingdata.cabinId}`)
  redirect("account/resevations/thankyou")
    
}


export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error ("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingId = guestBookings.map((booking) => booking.id);

  if(!guestBookingId.includes(bookingId)) throw new Error ("You are not allowed to delete this booking");
  
  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) 
    throw new Error('Booking could not be deleted');

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
   const session = await auth();
   if (!session) throw new Error ("You must be logged in");
  const reservationId = formData.get("reservationId");
  console.log(typeof(reservationId));
   

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingId = guestBookings.map((booking) => String(booking.id));

  if(!guestBookingId.includes(reservationId)) throw new Error ("You are not allowed to Update this booking");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  const updatedFields = {
    numGuests,
    observations
   }

  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', reservationId)
    //console.log(formData)

  if (error) 
    throw new Error('Booking could not be updated');

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect("/account/reservations");
  
}

export async function signInAction() {
    await signIn("google", { redirectTo: "/account"});
}

export async function signOutAction() {
    await signOut({ redirectTo: "/"})
}