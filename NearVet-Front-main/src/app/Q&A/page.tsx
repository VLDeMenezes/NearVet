import ButtonCustom from "@/components/ButtonCustom";
import Screen from "@/components/Screen";
import { QuestionAndAnswers } from "@/helpers/QuestionAndAnswers";

const QA: React.FC = () => {
  return (
    <Screen>
      <h2 className="text-3xl text-detail">Preguntas frecuentes</h2>
      <section>
        <ul className="shadow-lg p-5 m-auto w-2/3 flex flex-col gap-2 my-2 cursor-default">
          {QuestionAndAnswers.map((item) => (
            <div className="border rounded-md">
              <li className="text-xl text-detail">{item.question}</li>
              <article className="w-2/3 m-auto text-lightText dark:text-darkHline p-2">
                {item.answer}
              </article>
            </div>
          ))}
        </ul>

        <ButtonCustom text="Tengo mas dudas"></ButtonCustom>
      </section>
    </Screen>
  );
};

export default QA;
