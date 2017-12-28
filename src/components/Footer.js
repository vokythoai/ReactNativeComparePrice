import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';


export default class FooterApp extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="apps" />
          </Button>
          <Button>
            <Icon name="camera" />
          </Button>
          <Button active>
            <Icon active name="navigate" />
          </Button>
          <Button>
            <Icon name="person" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}