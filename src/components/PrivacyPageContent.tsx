"use client";

import Footer from "@/components/Footer";
import { usePreferences } from "@/components/PreferencesProvider";
import PreferenceControls from "@/components/PreferenceControls";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Explains the limited personal data and browser storage used by the portfolio. */
export default function PrivacyPageContent() {
  const { localizedHref, t } = usePreferences();
  return (
    <main id="privacy-top" className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <Link href={localizedHref("/")} className="legal-brand" aria-label="Portfolio home">
            <Image src="/logoWhite.svg" alt="EY" width={52} height={36} className="footer-logo-dark" />
            <Image src="/logoBlack.svg" alt="EY" width={52} height={36} className="footer-logo-light" />
          </Link>
          <div className="legal-header-actions">
            <PreferenceControls compact />
            <Link href={localizedHref("/")} className="legal-back-link"><ArrowLeft size={15} aria-hidden="true" /> {t("back to portfolio", "РЅР°Р·Р°Рґ Рє РїРѕСЂС‚С„РѕР»РёРѕ")}</Link>
          </div>
        </header>

        <article className="legal-content">
          <div className="legal-title">
            <span>legal / 01</span>
            <h1>{t("privacy policy", "РїРѕР»РёС‚РёРєР° РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё")}</h1>
            <p>{t("Last updated: August 14, 2026", "РћР±РЅРѕРІР»РµРЅРѕ: 14 Р°РІРіСѓСЃС‚Р° 2026")}</p>
          </div>

          <div className="legal-sections">
            <section>
              <h2>01 / {t("overview", "РѕР±Р·РѕСЂ")}</h2>
              <p>
                {t("This portfolio is operated by Egor Yakovlev. This policy explains what information is handled when you browse the site or send a project request.", "Р­С‚Рѕ РїРѕСЂС‚С„РѕР»РёРѕ Р•РіРѕСЂР° РЇРєРѕРІР»РµРІР°. Р—РґРµСЃСЊ РѕРїРёСЃР°РЅРѕ, РєР°РєРёРµ РґР°РЅРЅС‹Рµ РѕР±СЂР°Р±Р°С‚С‹РІР°СЋС‚СЃСЏ РїСЂРё РїСЂРѕСЃРјРѕС‚СЂРµ СЃР°Р№С‚Р° Рё РѕС‚РїСЂР°РІРєРµ Р·Р°СЏРІРєРё.")}
              </p>
            </section>

            <section>
              <h2>02 / {t("information you provide", "РїСЂРµРґРѕСЃС‚Р°РІР»СЏРµРјС‹Рµ РґР°РЅРЅС‹Рµ")}</h2>
              <p>
                {t("If you use the contact form, the site processes your name, email address, project type and message so that your enquiry can be delivered and answered. Please do not include sensitive personal information in your message.", "РџСЂРё РѕС‚РїСЂР°РІРєРµ С„РѕСЂРјС‹ СЃР°Р№С‚ РѕР±СЂР°Р±Р°С‚С‹РІР°РµС‚ РёРјСЏ, email, С‚РёРї РїСЂРѕРµРєС‚Р° Рё СЃРѕРѕР±С‰РµРЅРёРµ, С‡С‚РѕР±С‹ РґРѕСЃС‚Р°РІРёС‚СЊ Р·Р°СЏРІРєСѓ Рё РѕС‚РІРµС‚РёС‚СЊ РЅР° РЅРµС‘. РќРµ СѓРєР°Р·С‹РІР°Р№С‚Рµ РІ СЃРѕРѕР±С‰РµРЅРёРё С‡СѓРІСЃС‚РІРёС‚РµР»СЊРЅС‹Рµ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ.")}
              </p>
            </section>

            <section>
              <h2>03 / {t("browser storage", "С…СЂР°РЅРёР»РёС‰Рµ Р±СЂР°СѓР·РµСЂР°")}</h2>
              <p>
                {t("The site uses local browser storage to remember your cookie preference, selected language and theme, and a short contact-form cooldown. These records stay on your device. Advertising and analytics cookies are not used.", "РЎР°Р№С‚ РёСЃРїРѕР»СЊР·СѓРµС‚ Р»РѕРєР°Р»СЊРЅРѕРµ С…СЂР°РЅРёР»РёС‰Рµ Р±СЂР°СѓР·РµСЂР°, С‡С‚РѕР±С‹ РїРѕРјРЅРёС‚СЊ РІС‹Р±РѕСЂ cookies, СЏР·С‹Рє, С‚РµРјСѓ Рё РєРѕСЂРѕС‚РєСѓСЋ РїР°СѓР·Сѓ С„РѕСЂРјС‹ РѕР±СЂР°С‚РЅРѕР№ СЃРІСЏР·Рё. Р­С‚Рё Р·Р°РїРёСЃРё РѕСЃС‚Р°СЋС‚СЃСЏ РЅР° РІР°С€РµРј СѓСЃС‚СЂРѕР№СЃС‚РІРµ. Р РµРєР»Р°РјРЅС‹Рµ Рё Р°РЅР°Р»РёС‚РёС‡РµСЃРєРёРµ cookies РЅРµ РёСЃРїРѕР»СЊР·СѓСЋС‚СЃСЏ.")}
              </p>
            </section>

            <section>
              <h2>04 / {t("service providers", "РїРѕСЃС‚Р°РІС‰РёРєРё СѓСЃР»СѓРі")}</h2>
              <p>
                {t("Contact requests are delivered using Resend. Hosting providers may process limited technical data, such as IP addresses and request logs, for security and reliable delivery. Their own privacy terms apply.", "Р—Р°СЏРІРєРё РґРѕСЃС‚Р°РІР»СЏСЋС‚СЃСЏ С‡РµСЂРµР· Resend. РҐРѕСЃС‚РёРЅРі-РїСЂРѕРІР°Р№РґРµСЂС‹ РјРѕРіСѓС‚ РѕР±СЂР°Р±Р°С‚С‹РІР°С‚СЊ РѕРіСЂР°РЅРёС‡РµРЅРЅС‹Рµ С‚РµС…РЅРёС‡РµСЃРєРёРµ РґР°РЅРЅС‹Рµ, РЅР°РїСЂРёРјРµСЂ IP-Р°РґСЂРµСЃР° Рё Р¶СѓСЂРЅР°Р»С‹ Р·Р°РїСЂРѕСЃРѕРІ, РґР»СЏ Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё Рё РЅР°РґС‘Р¶РЅРѕР№ СЂР°Р±РѕС‚С‹. РџСЂРёРјРµРЅСЏСЋС‚СЃСЏ РёС… СЃРѕР±СЃС‚РІРµРЅРЅС‹Рµ СѓСЃР»РѕРІРёСЏ РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё.")}
              </p>
            </section>

            <section>
              <h2>05 / {t("retention and security", "С…СЂР°РЅРµРЅРёРµ Рё Р±РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ")}</h2>
              <p>
                {t("Enquiry data is kept only as long as reasonably necessary to respond and protect the site. Reasonable safeguards are used, but no internet transmission or storage method is completely secure.", "Р”Р°РЅРЅС‹Рµ Р·Р°СЏРІРєРё С…СЂР°РЅСЏС‚СЃСЏ С‚РѕР»СЊРєРѕ СЃС‚РѕР»СЊРєРѕ, СЃРєРѕР»СЊРєРѕ СЂР°Р·СѓРјРЅРѕ РЅРµРѕР±С…РѕРґРёРјРѕ РґР»СЏ РѕС‚РІРµС‚Р° Рё Р·Р°С‰РёС‚С‹ СЃР°Р№С‚Р°. РџСЂРёРјРµРЅСЏСЋС‚СЃСЏ СЂР°Р·СѓРјРЅС‹Рµ РјРµСЂС‹ Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё, РЅРѕ РЅРё РѕРґРёРЅ СЃРїРѕСЃРѕР± РїРµСЂРµРґР°С‡Рё РёР»Рё С…СЂР°РЅРµРЅРёСЏ РґР°РЅРЅС‹С… РІ РёРЅС‚РµСЂРЅРµС‚Рµ РЅРµ РіР°СЂР°РЅС‚РёСЂСѓРµС‚ Р°Р±СЃРѕР»СЋС‚РЅСѓСЋ Р·Р°С‰РёС‚Сѓ.")}
              </p>
            </section>

            <section>
              <h2>06 / {t("your choices", "РІР°С€ РІС‹Р±РѕСЂ")}</h2>
              <p>
                {t("You can decline optional storage in the cookie notice and clear this site's local storage in your browser at any time. You may also ask to access, correct or delete personal information connected with an enquiry, subject to applicable law.", "Р’С‹ РјРѕР¶РµС‚Рµ РѕС‚РєР»РѕРЅРёС‚СЊ РЅРµРѕР±СЏР·Р°С‚РµР»СЊРЅРѕРµ С…СЂР°РЅРµРЅРёРµ РґР°РЅРЅС‹С… Рё РІ Р»СЋР±РѕР№ РјРѕРјРµРЅС‚ РѕС‡РёСЃС‚РёС‚СЊ Р»РѕРєР°Р»СЊРЅРѕРµ С…СЂР°РЅРёР»РёС‰Рµ СЃР°Р№С‚Р° РІ Р±СЂР°СѓР·РµСЂРµ. РўР°РєР¶Рµ РјРѕР¶РЅРѕ Р·Р°РїСЂРѕСЃРёС‚СЊ РґРѕСЃС‚СѓРї, РёСЃРїСЂР°РІР»РµРЅРёРµ РёР»Рё СѓРґР°Р»РµРЅРёРµ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С…, СЃРІСЏР·Р°РЅРЅС‹С… СЃ Р·Р°СЏРІРєРѕР№, РІ СЂР°РјРєР°С… РїСЂРёРјРµРЅРёРјРѕРіРѕ Р·Р°РєРѕРЅР°.")}
              </p>
            </section>

            <section>
              <h2>07 / {t("contact", "РєРѕРЅС‚Р°РєС‚С‹")}</h2>
              <p>
                {t("For privacy questions or requests, email", "РџРѕ РІРѕРїСЂРѕСЃР°Рј РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё РїРёС€РёС‚Рµ РЅР°")}{" "}
                <a href="mailto:saoffabg@gmail.com">saoffabg@gmail.com</a>.
              </p>
            </section>
          </div>
        </article>

        <Footer topHref="#privacy-top" />
      </div>
    </main>
  );
}

