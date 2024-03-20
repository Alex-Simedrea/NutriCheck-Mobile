function mapNutriScoreToRange(nutriScore: string) {
  if (nutriScore === 'A') {
    return 100;
  } else if (nutriScore === 'B') {
    return 75;
  } else if (nutriScore === 'C') {
    return 50;
  } else if (nutriScore === 'D') {
    return 25;
  } else if (nutriScore === 'E') {
    return 0;
  } else if (nutriScore === 'UNKNOWN') {
    return -1;
  }
  return 0;
}

export default function getHealthScore(
  nutriScore: string,
  upVotes: number,
  downVotes: number,
): number {
  const mappedScore = mapNutriScoreToRange(nutriScore);

  if (mappedScore === -1) {
    return -1;
  }

  if (!upVotes && !downVotes) {
    return Math.round(mappedScore);
  }

  return Math.round(
    mappedScore * 0.85 + (upVotes / (upVotes + downVotes)) * 15,
  );
}
