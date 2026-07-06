import MessagesList from "@/components/admin/MessagesList";

export default function MessagesPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-cyan-400">
          Messages
        </h1>

        <p className="text-gray-400 mt-2">
          View and manage all contact form messages.
        </p>

      </div>

      <MessagesList />

    </div>
  );
}