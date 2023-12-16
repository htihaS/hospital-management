import React from 'react';
import { Layout, Flex } from 'antd';

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    // backgroundColor: '#0958d9',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
};

const flexContainerStyle: React.CSSProperties = {
    height: '100vh', // Set the height of the Flex container to 100%
};

const DefaultLayout = (Component: any) => {
    const Style = () => {
        return (
            <Flex
                gap="middle"
                wrap="wrap"
                style={flexContainerStyle} // Apply the height style to the Flex container
            >
                <Layout style={layoutStyle}>
                    <Header style={headerStyle}>HOSPITAL OF CALIFORNIA </Header>
                    <Content style={contentStyle}><Component /></Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Flex>
        );
    };

    return Style;
};

export default DefaultLayout;
