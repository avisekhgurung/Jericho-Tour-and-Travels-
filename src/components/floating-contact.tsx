import { MessageCircle, Phone } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-3 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl sm:h-14 sm:w-14"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="size-5 sm:size-6" />
      </a>
      <a
        href="tel:+919876543210"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl sm:h-14 sm:w-14"
        title="Call Now"
      >
        <Phone className="size-5 sm:size-6" />
      </a>
    </div>
  );
}
