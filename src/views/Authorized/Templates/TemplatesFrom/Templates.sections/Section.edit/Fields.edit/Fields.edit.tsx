import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../../../../store/hooks/useRedux';
import { Button, Col, Form, message, Row, Space } from 'antd';
import { getSections } from '../../../../../../../store/templates/templates.slice';
import * as Icon from '@ant-design/icons';

export const FieldsEdit: FC = () => {
    const dispatch = useAppDispatch();

    const { id: TEMPLATE_PAGE_ID } = useParams();
    const { SectionsData } = useAppSelector((state) => state.templates);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getSections());
    }, []);

    const fetchUpdate = async (values: any) => {
        setLoading(true);
        try {
            // const { data } = await axios.patch(`/api/legals/${TEMPLATE_PAGE_ID}`, values);
            // dispatch(Legal.update(data.legal));
            // message.success(data.message);
            // setLoading(false);
            // return;
        } catch (e: any) {
            setLoading(false);
            console.log('Error update sections page content =>', e);
            e.response.data.map((el: any) => message.error(el.msg));
            return;
        }
    };

    if (!SectionsData) {
        return <h1>Error. NO SECTIONS PAGE</h1>;
    }

    return (
        <Row gutter={[16, 24]}>
            <Col span={24} style={{ height: 'calc(100vh - 240px)', overflow: 'scroll' }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={fetchUpdate}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 24]}>
                        <Col className="gutter-row" span={24}>
                            <div
                                style={{
                                    marginBottom: 10,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <span>TEMPLATE FIELDS</span>
                            </div>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>CONTENT</Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};
