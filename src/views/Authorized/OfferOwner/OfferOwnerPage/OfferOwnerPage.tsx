import { FC } from 'react';
import { Layout } from 'antd';
import * as Antd from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { OfferOwnerCreate } from '../OfferOwnerFrom/OfferOwner.create/OfferOwnerCreate';
import { useAppSelector } from '../../../../store/hooks/useRedux';
import { OfferOwnerDelete } from '../OfferOwnerFrom/OfferOwner.delete/OfferOwnerDelete';
import { OfferOwnerEdit } from '../OfferOwnerFrom/OfferOwner.edit/OfferOwnerEdit';

// STYLE
import './OfferOwnerPage.scss';

export const OfferOwnerPage: FC = () => {
    const data = useAppSelector((state) => state.offerOwner);

    return (
        <Layout className="content-layout">
            <div className="content-header">
                <span>Offer Owner</span>
                <OfferOwnerCreate />
            </div>
            <Content
                className="site-layout-background main_content"
                style={{
                    padding: 15,
                    margin: 0,
                    border: 'none',
                }}>
                <div>
                    <Antd.List
                        pagination={{
                            defaultPageSize: 10,
                            hideOnSinglePage: true,
                            showSizeChanger: false,
                        }}
                        dataSource={data.offerOwner}
                        renderItem={(offer) => {
                            return (
                                <Antd.Row
                                    style={{
                                        padding: '10px 20px',
                                        width: '100%',
                                        backgroundColor: '#383B46',
                                        marginBottom: '5px',
                                        alignItems: 'center',
                                        borderLeft: `5px solid ${offer.color}`,
                                    }}>
                                    <Antd.Col
                                        span={21}
                                        style={{ display: 'flex', alignItems: 'center' }}>
                                        <span
                                            className="dot"
                                            style={{
                                                backgroundColor: offer.color,
                                            }}></span>
                                        <span className="offer_owner__title">{offer.name}</span>
                                    </Antd.Col>

                                    <Antd.Col
                                        span={3}
                                        style={{ display: 'flex', justifyContent: 'end' }}>
                                        <Antd.Space size="small">
                                            <OfferOwnerEdit offerOwnerId={offer._id} />
                                            <OfferOwnerDelete offerOwnerId={offer._id} />
                                        </Antd.Space>
                                    </Antd.Col>
                                </Antd.Row>
                            );
                        }}
                    />
                </div>
            </Content>
        </Layout>
    );
};
