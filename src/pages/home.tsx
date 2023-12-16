import React from 'react';
import { Button } from 'antd';
import DefaultLayout from '~/common/defaultLayout';

const Home = () => (
    <div className="App">
        <Button type="primary">Button</Button>
    </div>
);

export default DefaultLayout(Home);