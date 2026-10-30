import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import {
  EDUCATIONAL_TOPICS,
  WASTE_SEGREGATION_QUIZ,
  CLEANLINESS_DRIVE_TEMPLATE,
  EducationalTopic
} from '../data/educationalContent';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  Printer,
  ExternalLink,
  RotateCcw,
  Sparkles,
  TreePine,
  Recycle,
  ShoppingBag,
  Cpu,
  Flame,
  Droplets,
  Users,
  ChevronRight
} from 'lucide-react';

export const LearnPage: React.FC = () => {
  const { language, t } = useLanguage();

  // Active topic modal or selected detail
  const [selectedTopic, setSelectedTopic] = useState<EducationalTopic | null>(null);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = WASTE_SEGREGATION_QUIZ[currentQuizIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (currentQuestion.options[index].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < WASTE_SEGREGATION_QUIZ.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handlePrintTemplate = () => {
    window.print();
  };

  // Helper to pick matching icon
  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'wet-vs-dry-waste': return Recycle;
      case 'why-segregation-matters': return TreePine;
      case 'reduce-single-use-plastic': return ShoppingBag;
      case 'e-waste-disposal': return Cpu;
      case 'stop-public-waste-burning': return Flame;
      case 'protect-local-water-bodies': return Droplets;
      case 'organize-school-cleanliness-drive': return Users;
      default: return CheckCircle2;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Environmental Education & Action</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Learn Waste Segregation & Environmental Action
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Practical, actionable guidelines for Chennai and Tamil Nadu residents, school Eco-Clubs, and community organizers.
        </p>
      </div>

      {/* TOPICS GRID (8 CORE TOPICS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Tamil Nadu Waste Management Guidelines
          </h2>
          <span className="text-xs text-slate-500">8 Essential Topics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EDUCATIONAL_TOPICS.map((topic) => {
            const Icon = getTopicIcon(topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {topic.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1.5 group-hover:text-emerald-700 transition leading-snug">
                      {language === 'ta' ? topic.tamilTitle : topic.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {language === 'ta' ? topic.tamilSummary : topic.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Read Guide</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOPIC DETAIL MODAL */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                  {selectedTopic.category}
                </span>
                <h3 className="font-black text-xl text-slate-900 mt-1">
                  {language === 'ta' ? selectedTopic.tamilTitle : selectedTopic.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {language === 'ta' ? selectedTopic.tamilSummary : selectedTopic.summary}
            </p>

            {/* Key Action Points */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800">
                Action Steps & Guidelines
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {(language === 'ta' ? selectedTopic.tamilKeyPoints : selectedTopic.keyPoints).map((point, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chennai & Tamil Nadu Context */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 space-y-1">
              <span className="font-bold uppercase tracking-wider text-emerald-800 text-[10px]">
                Tamil Nadu Local Context
              </span>
              <p className="leading-relaxed">
                {selectedTopic.chennaiContext}
              </p>
            </div>

            {/* Official Source Link */}
            {selectedTopic.officialReferenceUrl && (
              <div className="pt-2 flex items-center justify-between text-xs">
                <a
                  href={selectedTopic.officialReferenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Official Reference: {selectedTopic.officialReferenceTitle}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedTopic(null)}
                className="px-5 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE WASTE SEGREGATION QUIZ */}
      <section className="bg-gradient-to-br from-slate-900 via-forest-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">
                Interactive Knowledge Check
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Waste Segregation Challenge for Students
            </h2>
          </div>

          {!quizFinished && (
            <span className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-emerald-400">
              Question {currentQuizIndex + 1} of {WASTE_SEGREGATION_QUIZ.length}
            </span>
          )}
        </div>

        {!quizFinished ? (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Item to Classify:
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {language === 'ta' ? currentQuestion.tamilQuestion : currentQuestion.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, idx) => {
                let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';

                if (isAnswered) {
                  if (option.isCorrect) {
                    btnStyle = 'bg-emerald-600/90 border-emerald-400 text-white font-bold ring-2 ring-emerald-400/50';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-900/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/50';
                  } else {
                    btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{language === 'ta' ? option.tamilLabel : option.label}</span>
                    {isAnswered && option.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                    )}
                    {isAnswered && selectedOption === idx && !option.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card upon answering */}
            {isAnswered && (
              <div className="bg-emerald-950/80 border border-emerald-700/60 p-4 rounded-2xl space-y-2 animate-in fade-in">
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Explanation
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {language === 'ta' ? currentQuestion.tamilExplanation : currentQuestion.explanation}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition"
                  >
                    {currentQuizIndex < WASTE_SEGREGATION_QUIZ.length - 1 ? 'Next Question →' : 'View Results'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl font-black">
              {score}/{WASTE_SEGREGATION_QUIZ.length}
            </div>
            <h3 className="text-2xl font-black text-white">
              Quiz Completed!
            </h3>
            <p className="text-xs text-slate-300">
              {score >= 4
                ? 'Excellent! You are a certified Eco-Steward ready to lead waste segregation in your school!'
                : 'Good effort! Review the guidelines above and try again to master waste segregation.'}
            </p>
            <div className="pt-2">
              <button
                onClick={handleRestartQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* START A CLEANLINESS DRIVE (PRINTABLE / DOWNLOADABLE BLUEPRINT) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">
              School & Community Action Kit
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Start a Cleanliness Drive in Your Ward
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              A comprehensive blueprint for Class 8-12 students, Eco-Clubs, and Residents Welfare Associations.
            </p>
          </div>

          <button
            onClick={handlePrintTemplate}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition printable-action self-start sm:self-auto"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print / Save Blueprint</span>
          </button>
        </div>

        <div className="space-y-6">
          {CLEANLINESS_DRIVE_TEMPLATE.phases.map((phase, idx) => (
            <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-emerald-800">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span>{phase.phase}</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 pl-8 list-disc">
                {phase.steps.map((step, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
