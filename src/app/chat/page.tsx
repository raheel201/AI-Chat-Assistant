import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";

export default async function ChatPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/");
  }

  return (
    <main className="h-screen w-screen overflow-hidden">
      <ChatInterface />
    </main>
  );
}
