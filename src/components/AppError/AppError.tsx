import { FC } from 'react';
import { Button } from 'antd';

import './AppError.scss';

export const AppError: FC<any> = ({ resetErrorBoundary }) => (
    <div className="app-error">
        <div className="app-error__content" role="alert">
            <h1>Ooops...</h1>
            <p>Something went wrong. Try refreshing the page</p>
            <Button onClick={resetErrorBoundary}>Reload</Button>
        </div>
    </div>
);
