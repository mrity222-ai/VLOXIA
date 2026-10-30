import Link from "next/link";
import { CheckCircle, ArrowRight, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Thank You | VLOXIA Systems LLP",
  description: "Your enquiry has been received. VLOXIA Systems LLP will be in touch within 24 hours.",
};

export default function ThankYouPage() {
  return (
    <main >
    <section >
      <div >
          <CheckCircle aria-hidden="true" />
        </div>
        <h1>Thank You for Your Enquiry!</h1>
        <p>
          We have received your message and our energy experts will get back to you within <strong>24 business hours</strong>.
        </p>
        <p>
          For urgent matters, call or WhatsApp us directly:
        </p>
        <div >
          <a href="tel:+918178810456">
            <Phone aria-hidden="true" /> +91 8178810456
          </a>
          <a href="mailto:vloxiasystems@gmail.com">
            <Mail aria-hidden="true" /> vloxiasystems@gmail.com
          </a>
        </div>
        <Link href="/" >
          Back to Home <ArrowRight aria-hidden="true" />
        </Link>
    </section>
    </main>
  );
}
