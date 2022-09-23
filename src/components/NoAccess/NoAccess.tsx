import { FC } from 'react';
import { Col, Row } from 'antd';

const NoAccess: FC = () => (
    <Row justify="center">
        <Col>
            <h1>В доступі відмовленно</h1>
        </Col>
    </Row>
);

export default NoAccess;
