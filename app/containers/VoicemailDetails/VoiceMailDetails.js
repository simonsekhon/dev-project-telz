/*
 * VoiceMail Details
 */

import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Loader, Container, Divider } from 'semantic-ui-react'

// actions
import { getVoiceMailDetails } from './actions';

// styles
import './style.scss';


class VoiceMailDetails extends React.Component {

  componentDidMount() {
    const token = sessionStorage.getItem('claimstoken');
    if (!token) {
      this.props.history.push('/')
    } else {
      this.props.getVoiceMailDetails(token)
    }
  }

  renderTags = (data) => {
    if (!data.length) {
      return <div><Icon name='tag' />No Tags</div>
    }
    return data.map(tag => {
      return <div key={tag}><Icon name='tag' />{tag}</div>
    })
  }

  renderVoiceMailData = (vmData) => {
    let voiceMailData = [];
    if (vmData && vmData.length) {
      voiceMailData = vmData.map(vm => {
        return (
          <Card id="voice-card" key={vm.VoicemailId}>
            <Card.Content>
              <Card.Header><Icon name='circle' color={vm.Status === 'new' ? 'green' : 'red'} /> {vm.FromCnam}</Card.Header>
              <Card.Meta>{vm.From}</Card.Meta>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                Duration: {vm.Duration}
              </Card.Description>
              <Card.Description>
                Date: {vm.Date}
              </Card.Description>
              <Card.Description>
                ID: {vm.VoicemailId}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {this.renderTags(vm.Tags)}
            </Card.Content>
          </Card>
        )
      })
    }
    return (
      <div>
        <h1>Voicemail Messages</h1>
        <Divider section id='divider-section' />
        {voiceMailData.length ? voiceMailData : <h1>No Voicemails</h1>}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Container id='container'>
          {this.props.loading ? <Loader active inverted inline='centered' /> : this.renderVoiceMailData(this.props.voiceMailData)}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    voiceMailData: state.voicemailDetails.voiceMailData,
    loading: state.voicemailDetails.loading,
    errMsg: state.voicemailDetails.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVoiceMailDetails: (token) => dispatch(getVoiceMailDetails(token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceMailDetails);
