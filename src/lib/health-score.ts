function mapNutriScoreToRange(nutriScore: number) {
  const minNutriScore = -15;
  const maxNutriScore = 27;
  const minRange = 0;
  const maxRange = 100;

  return (
    ((nutriScore - minNutriScore) * (maxRange - minRange)) /
      (maxNutriScore - minNutriScore) +
    minRange
  );
}

export default function getHealthScore(
  nutriScore: number,
  upVotes: number,
  downVotes: number,
): number {
  const mappedScore = mapNutriScoreToRange(nutriScore);

  if (upVotes + downVotes === 0) {
    return Math.round(mappedScore);
  }

  return Math.round(
    mappedScore * 0.85 + (upVotes / (upVotes + downVotes)) * 15,
  );
}
