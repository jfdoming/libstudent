import Heap from "./Heap";

const sumAssessment = (assessment, dropWorst, missingScore = null) => {
  const markHeap = new Heap(
    assessment.entries
      .filter(({ max }) => missingScore !== null || +max)
      .map(({ score, max }) => ({
        score,
        max,
        percentage: +max ? +score / +max : missingScore,
      })),
    "percentage"
  );
  for (let i = 0; i < dropWorst; ++i) {
    markHeap.deleteMin();
  }

  const remaining = markHeap.getAll();
  const totalScore = remaining.reduce(
    (rror, { percentage }) => rror + percentage,
    0
  );
  return {
    count: remaining.length,
    score: remaining.length ? totalScore / remaining.length : 0,
  };
};

const calculateTotals = (
  missingScore,
  assessments = [],
  gradingSchemeEntries = [],
  format
) => {
  const result = gradingSchemeEntries.reduce(
    (rror, { name, weight, dropWorst, bonus }) => {
      const { count, score } = sumAssessment(
        assessments[name],
        dropWorst,
        missingScore
      );
      const isBonus = "" + bonus === "true";
      const shouldCount = count !== 0;
      return {
        score:
          rror.score +
          +weight * !isBonus * (shouldCount ? score : missingScore || 0),
        max:
          rror.max +
          +weight * !isBonus * (shouldCount || missingScore !== null),
        bonusScore: rror.bonusScore + +weight * isBonus * score,
        bonusMax: rror.bonusMax + +weight * !isBonus,
      };
    },
    { score: 0, max: 0, bonusScore: 0, bonusMax: 0 }
  );
  return format(result) + "%";
};

export const calculateExpected = (
  missingScore,
  assessments = [],
  gradingSchemeEntries = []
) =>
  calculateTotals(
    missingScore,
    assessments,
    gradingSchemeEntries,
    ({ score, max, bonusScore, bonusMax }) =>
      max ? ((score / max + bonusScore / bonusMax) * 100).toFixed(2) : "??.??"
  );

export const calculateDesired = (target, assessments, gradingSchemeEntries) =>
  calculateTotals(
    null,
    assessments,
    gradingSchemeEntries,
    ({ score, max, bonusScore, bonusMax }) =>
      (
        (max && bonusMax !== max
          ? (target * bonusMax - score - bonusScore) / (bonusMax - max)
          : target) * 100
      ).toFixed(2)
  );
