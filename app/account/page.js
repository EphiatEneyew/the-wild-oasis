import { auth } from "../_lib/auth";

export const metadata = {
  title: "account",
}

export default async function Page() {
  const session = await auth();
    return (
    <div>
        <h1 className="text-pink-200 text-2xl px-4">Welcom, {session.user.name}</h1>
    </div>
    );
}