export enum AnalysisVerdict {
  DEEPFAKE = 'DEEPFAKE',
  LIKELY_REAL = 'LIKELY_REAL',
  UNCERTAIN = 'UNCERTAIN'
}

export interface AnalysisResult {
  verdict: AnalysisVerdict;
  summary: string;
  anomalies: string[];
}
