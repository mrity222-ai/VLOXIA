import { NextResponse } from "next/server";
import { getSystemSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSystemSettings();
    return new NextResponse(
      JSON.stringify({
        success: true,
        razorpayKeyId: settings.razorpayKeyId,
        socialLinks: {
          linkedin: settings.socialLinkedin || "",
          instagram: settings.socialInstagram || "",
          facebook: settings.socialFacebook || "",
          youtube: settings.socialYoutube || "",
          twitter: settings.socialTwitter || "",
          whatsapp: settings.socialWhatsapp || "+918178810456",
        },
        widgets: {
          enableWhatsApp: settings.enableWhatsAppWidget,
          enableAiBot: settings.enableAiBotWidget,
          whatsappNumber: settings.socialWhatsapp || "+918178810456",
          whatsappGreeting:
            settings.whatsappGreeting ||
            "Hi VLOXIA Team, I would like to inquire about clean energy solutions.",
          aiBotWelcomeMsg:
            settings.aiBotWelcomeMsg ||
            "Hello! I am VLOXIA's AI Energy Assistant. How can I assist you with Solar, EV Charging, or Batteries today?",
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to load public settings" },
      { status: 500 }
    );
  }
}
