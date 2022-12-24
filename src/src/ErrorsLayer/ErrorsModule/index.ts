import {injectable} from 'inversify';
import {action, makeObservable, observable} from 'mobx';
import {IErrorsModule} from './interfaces';

@injectable()
export class ErrorsModule implements IErrorsModule {
  constructor() {
    makeObservable(this, {
      error: observable,
      setError: action,
      deleteError: action,
    });
  }
  error?: string;

  setError = (error: string) => {
    this.error = error;
  };

  deleteError = () => (this.error = undefined);
}
