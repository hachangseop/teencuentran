"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  QUESTIONS,
  Answers,
  calculateScore,
  getFindings,
  getTier,
} from "@/lib/diagnosis";

type Phase = "quiz" | "result";

export default function DiagnosisQuiz() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const question = QUESTIONS[index];
  const progress = ((index + (phase === "result" ? 1 : 0)) / QUESTIONS.length) * 100;

  const score = useMemo(() => calculateScore(answers), [answers]);
  const tier = useMemo(() => getTier(score), [score]);
  const findings = useMemo(() => getFindings(answers), [answers]);

  function choose(value: string) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
    } else {
      setPhase("result");
    }
  }

  function back() {
    if (phase === "result") {
      setPhase("quiz");
      setIndex(QUESTIONS.length - 1);
    } else if (index > 0) {
      setIndex(index - 1);
    }
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setPhase("quiz");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-8 md:py-12">
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm font-medium text-slate-500">
          <span>
            {phase === "result"
              ? "Resultado"
              : `Pregunta ${index + 1} de ${QUESTIONS.length}`}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {phase === "quiz" ? (
        <div key={question.id}>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
            {question.dimension}
          </p>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            {question.title}
          </h1>
          {question.subtitle && (
            <p className="mt-2 text-slate-500">{question.subtitle}</p>
          )}

          <div className="mt-8 flex flex-col gap-4">
            {question.options.map((opt) => {
              const selected = answers[question.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => choose(opt.value)}
                  className={`btn-touch w-full border-2 text-left ${
                    selected
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                      : "border-slate-200 bg-white text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/50"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            {(index > 0) && (
              <button
                onClick={back}
                className="text-[15px] font-medium text-slate-500 hover:text-slate-800"
              >
                ← Pregunta anterior
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
            Tu diagnóstico
          </p>
          <div className={`mt-6 rounded-3xl border-2 ${tier.ring} bg-white p-8 text-center`}>
            <p className="text-7xl font-extrabold tracking-tight md:text-8xl">
              {score}
              <span className="text-2xl font-medium text-slate-400">/100</span>
            </p>
            <p className={`mt-3 text-2xl font-extrabold ${tier.color}`}>
              {tier.label}
            </p>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-slate-600">
              {tier.description}
            </p>
          </div>

          <h2 className="mt-10 text-xl font-extrabold">
            Tus 3 arreglos más urgentes
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {findings.map((f, i) => (
              <div
                key={f.dimension}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold">
                    <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-sm text-white">
                      {i + 1}
                    </span>
                    {f.dimension}
                  </p>
                  <span className="text-sm font-semibold text-slate-400">
                    {f.score}/{f.maxScore}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-slate-600">{f.fix}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <Link
              href={`/beta?score=${score}`}
              className="btn-touch bg-emerald-600 text-white hover:bg-emerald-700 text-center"
            >
              Quiero arreglarlo en automático
            </Link>
            <button
              onClick={restart}
              className="text-[15px] font-medium text-slate-500 hover:text-slate-800"
            >
              Repetir el diagnóstico
            </button>
            {(index > 0 || phase === "result") && (
              <button
                onClick={back}
                className="text-[15px] font-medium text-slate-500 hover:text-slate-800"
              >
                ← Revisar mis respuestas
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
