import {IErrorsModule} from '../ErrorsModule/interfaces';
import {ErrorsModule} from '../ErrorsModule';
import {Container} from 'inversify';

const errorModuleContainer = new Container({defaultScope: 'Singleton'});
const ERROR_MODULE = Symbol.for('ErrorModuleContainer');
errorModuleContainer.bind<IErrorsModule>(ERROR_MODULE).to(ErrorsModule);

export {ERROR_MODULE, errorModuleContainer};
