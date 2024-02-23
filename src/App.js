import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import IsDark from './context/IsDark'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetailedView from './components/VideoDetailedView'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDark: false,
  }

  onChange = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  render() {
    const {isDark} = this.state
    return (
      <IsDark.Provider
        value={{
          isDark,
          onChanges: this.onChange,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/home/:id" component={VideoDetailedView} />
        </Switch>
      </IsDark.Provider>
    )
  }
}

export default App
