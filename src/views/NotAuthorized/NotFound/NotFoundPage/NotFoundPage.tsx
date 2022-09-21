// STYLES
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Logo } from '../../../../components/Logo/Logo';

import { IconPage404 } from '../../../../assets/images/svg/svg';
import { ArrowLeftOutlined } from '@ant-design/icons';

// STYLE
import './NotFoundPage.scss';

export const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    return (
        <section>
            <Logo boxClass={['logo__auth']} />
            <div className="auth">
                <div className="auth__wrapper page404">
                    <div className="auth__logo">
                        <IconPage404 />
                    </div>
                    <div className="auth__form page404__form">
                        <h2 className="auth__title">404 Error</h2>
                        <p className="auth__description">
                            We can't find the page that you are looking for.
                        </p>
                        <Button
                            type="primary"
                            onClick={() => navigate('/')}
                            icon={<ArrowLeftOutlined />}>
                            Go to back to Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
