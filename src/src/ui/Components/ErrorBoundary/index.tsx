import React, {ErrorInfo} from 'react';
import {ReactComponent as WarningIcon} from '../../../assets/svg/errorPage/warningIcon.svg';
import {Button} from '../../Common/SimpleComponents/Button';
import {RouteContext} from 'react-router5/dist/types';
import './index.less';

interface IState {
  hasError: boolean;
}

interface IProps {
  route: RouteContext;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //@todo: реализовать логирование ошибок
    this.setState({hasError: true});
  }

  handleReload = () => {
    const routerConst = this.props.route.router.getDependencies()?.routerConst;
    this.props.route.router.navigate(routerConst.HOME.fullName);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="Error-Boundary">
          <WarningIcon />
          <div className="Error-text">
            Произошла ошибка при загрузке страницы
          </div>
          <Button onClick={this.handleReload} whiteTheme>
            Перейти на главную
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
