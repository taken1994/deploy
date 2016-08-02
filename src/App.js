import React from 'react';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
class App extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  constructor(props) {
      super(props);
      this.state = {
        user: {},
        wait:true
      };
    }
  componentDidMount(){
    axios.get(`https://api.github.com/users/happypeter`)
    .then((res) => {
       this.setState({
         user: res.data,
         wait:false
       });
       console.log(res);
     });
  }
  render () {
    return(
      <div>
        {
          this.state.wait ? <CircularProgress /> :
          <div>
            <img src={this.state.user.avatar_url} />
            <br/>
            {this.state.user.name}<br/>
            {this.state.user.blog}
          </div>
        }
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
