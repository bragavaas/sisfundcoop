"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Card from "@/components/card";
import { BsFileTextFill, BsFillGiftFill, BsFillPeopleFill } from "react-icons/bs";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">

        <br />
        <h1 className={title()}>
          FundCoop
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Sistema de Brindes
        </h2>
      </div>
      <div className="flex flex-row w-full gap-3.5 items-center">
          <Link href="/campanhas">
            <Card
              icon={BsFileTextFill}
              iconColor="blue"
              backgroundColor="#E7EDFF"
              title="Campanhas"
              info=""
            />
          </Link>
          <Link href="/registros">
            <Card
              icon={BsFillGiftFill}
              iconColor="blue"
              backgroundColor="#E7EDFF"
              title="Participantes"
              info=""
            />
          </Link>
        </div>
    </section>
  );
}
