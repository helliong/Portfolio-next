import { redirect } from "next/navigation";

/** Redirects the legacy privacy URL to the default localized route. */
export default function PrivacyPage() {
  redirect("/en/privacy");
}
