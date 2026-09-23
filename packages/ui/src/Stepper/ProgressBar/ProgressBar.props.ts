/** 1-based filled steps. `0` is empty, `stepCount` is complete. */
export type ProgressBarProps = {
  activeStep: number;
  stepCount: number;
  testID?: string;
};
