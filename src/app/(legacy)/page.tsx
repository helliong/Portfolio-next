import { redirect } from "next/navigation";

/** Redirects the legacy root URL to the default localized home page. */
export default function Home() {
  redirect("/en");
}
