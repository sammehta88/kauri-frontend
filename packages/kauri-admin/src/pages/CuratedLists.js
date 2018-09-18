import React, { Component } from 'react';
import WebService from '../components/WebService';
import { ScaleLoader } from 'react-spinners';
import R, { CuratedList } from 'kauri-components';
import { CreateCuratedList, AddItemToList, AddHeader } from '../components/modals';
import styled from "styled-components";

const Sidebar = styled.div`
  padding: 20px;
  display: flex;
  background: #efefef;
  min-height: 100%;
`;

const Container = styled.div`
display: flex;
flex-direction: row;
position: relative;
`;

const ListContainer = styled.div`
display: flex;
flex: 5;
flex-direction: column;`;


class CuratedLists extends Component {
  constructor(props) {
    super(props)

    var ws = new WebService(props.config);

    this.state = {
      config: props.config,
      updateLoadingFlag: props.updateLoadingFlag,
      ws: ws,
      modal: null,
      selectedList: null,
    }
  }

  componentDidMount() {
    if (!window.localStorage.getItem('jwt')) {
      this.state.ws.authenticate()
        .then(() => this.fetchLists())
    } else {
      this.fetchLists();
    }
  }

  fetchLists() {
    this.state.ws.executeQuery('getAllCuratedList', {}, 1000)
      .then(res => this.setState({ content: res }));
  }

  async createListReq(payload) {
    await this.state.ws.executeQuery('createCuratedList', {}, 1000, payload)
    this.setState({ modal: null });
    this.fetchLists();
  }

  async removeListReq(payload) {
    await this.state.ws.executeQuery('removeCuratedList', {}, 1000, payload)
    this.fetchLists();
  }

  async removeResourceFromListReq(payload) {
    await this.state.ws.executeQuery('removeResourceFromCuratedList', {}, 1000, payload)
    this.fetchLists();
  }

  async addToListReq(payload) {
    await this.state.ws.executeQuery('addResourceToCuratedList', {}, 1000, payload)
    this.setState({ modal: null });
    this.fetchLists();
  }

  async searchArticles(payload) {
    const articles = await this.state.ws.executeQuery('searchArticles', { nameContains: payload.val, latest_version: true, status_in: ["PUBLISHED"] }, 10, payload);
    return articles;
  }

  async searchRequests(payload) {
    const requests = await this.state.ws.executeQuery('searchRequests', { nameContains: payload.val }, 10, payload);
    return requests;
  }

  async searchCollections(payload) {
    const collections = await this.state.ws.executeQuery('searchCollections', { nameContains: payload.val }, 10, payload);
    return collections;
  }

  async addHeaderToList(payload) {
    await this.state.ws.executeQuery('addHeaderToCuratedList', {}, 10, payload);
    this.setState({ modal: null });
    this.fetchLists();
  }

  async removeHeader(payload) {
    await this.state.ws.executeQuery('addHeaderToCuratedList', {}, 10, { id: payload, resource: null });
    this.fetchLists();
  }

  async editCuratedList(list) {
    await this.state.ws.executeQuery('editCuratedList', {}, 10, list);
    await this.fetchLists();
  }

  render() {
    const { content } = this.state;
    return (
      <div className="curatedLists" style={{ paddingBottom: 50 }}>
        <h1 className="Title">Curated Lists</h1>
        <Container>
          <ListContainer>
          {content && content.map(i => <CuratedList
            routeChangeAction={this.props.routeChangeAction}
            key={i.id} content={i}
            Link={({children}) => children}
          />)}
          </ListContainer>
          <Sidebar>Here you will edit the content</Sidebar>
        </Container>
        {!content && <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}><ScaleLoader /></div>}
        <CreateCuratedList
          createList={payload => this.createListReq(payload)}
          show={this.state.modal === 'CreateCuratedList'}
          closeModal={() => this.setState({ modal: null })} />
        {this.state.modal === 'AddItemToList' && <AddItemToList
          show={true}
          selectedList={this.state.selectedList}
          closeModal={() => this.setState({ modal: null })}
          searchArticles={payload => this.searchArticles(payload)}
          searchRequests={payload => this.searchRequests(payload)}
          searchCollections={payload => this.searchCollections(payload)}
          addItem={payload => this.addToListReq(payload)} />}
        {this.state.modal === 'AddHeader' && <AddHeader
          show={true}
          selectedList={this.state.selectedList}
          closeModal={() => this.setState({ modal: null })}
          searchArticles={payload => this.searchArticles(payload)}
          searchRequests={payload => this.searchRequests(payload)}
          searchCollections={payload => this.searchCollections(payload)}
          addHeader={payload => this.addHeaderToList(payload)}
          addItem={payload => this.addToListReq(payload)} />}
      </div>
    );
  }
}


export default CuratedLists;