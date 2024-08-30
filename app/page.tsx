// "use client";
import { signIn } from "@/auth";
import { Locale } from "@/utils/i18n/config";
import { setUserLocale } from "@/utils/i18n/locale";
import { useTranslations } from "next-intl";
import Image from "next/image";
// import { useTransition } from "react";

export default function Home() {
  // const t = useTranslations("Index");

  // const [isPending, startTransition] = useTransition();

  // function onChange(value: string) {
  //   const locale = value as Locale;
  //   startTransition(() => {
  //     setUserLocale(locale);
  //   });
  // }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div>{t("title")}</div> */}
      {/* <button onClick={() => onChange("de")}>Change lang</button> */}
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </main>
  );
}
