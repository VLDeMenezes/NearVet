import Screen from "@/components/Screen";
import { termsAndConditions } from "@/helpers/Terms";
import React from "react";

const Page = () => {
  return (
    <Screen>
      <h2 className="text-3xl text-detail">Terminos y condiciones de uso</h2>
      <section className="shadow-lg p-5 m-auto w-2/3 flex flex-col gap-2 my-2 cursor-default">
        {termsAndConditions.map((term) => (
          <div className="border rounded-md">
            <h3 className="text-xl text-detail">{term.title}</h3>
            <article className="w-2/3 m-auto text-lightText dark:text-darkHline p-2">
              {term.description}
            </article>
          </div>
        ))}
      </section>
    </Screen>
  );
};

export default Page;
