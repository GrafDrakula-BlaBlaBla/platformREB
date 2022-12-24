export interface IErrorsModule {
  error?: string;
  setError: (error: string) => void;
  deleteError: () => void;
}
