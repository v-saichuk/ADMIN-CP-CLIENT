import { FC } from 'react';
import { IconMaintenance } from '../../../../assets/images/svg/svg';
import { Logo } from '../../../../components/Logo/Logo';

// STYLE
import './ServicePage.scss';

export const ServicePage: FC = () => {
    return (
        <section>
            <Logo boxClass={['logo__auth']} />
            <div className="auth">
                <div className="auth__wrapper maintenance">
                    <div className="auth__logo">
                        <IconMaintenance />
                    </div>
                    <div className="auth__form maintenance__form">
                        <h2 className="auth__title">Our site is under maintenance</h2>
                        <p className="auth__description">
                            Our site is currently under scheduled maintenance. We will be back
                            shortly..
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
