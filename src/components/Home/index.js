import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import IsDark from '../../context/IsDark'
import Sidebar from '../Sidebar'
import HomeItem from '../HomeItem'
import './index.css'

class Home extends Component {
  state = {
    searchInput: '',
    homePageList: [],
  }

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachData => ({
        id: eachData.id,
        publishedAt: eachData.published_at,
        thumbnailUrl: eachData.thumbnail_url,
        title: eachData.title,
        viewCount: eachData.view_count,
        channel: {
          name: eachData.channel.name,
          profileImageUrl: eachData.channel.profile_image_url,
        },
      }))
      this.setState({homePageList: updatedData})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSearch = () => {
    this.getItem()
  }

  render() {
    const {searchInput, homePageList} = this.state
    return (
      <IsDark.Consumer>
        {value => {
          const {isDark} = value
          const chillar = isDark ? 'reverse-background' : 'reserve'

          return (
            <div>
              <Header />
              <div className="extra">
                <div>
                  <Sidebar />
                </div>
                <div className="container8">
                  <div className="backside">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="light"
                      className="logo"
                    />
                    <p> Buy Nxt Watch Premium prepaid plans with UPI </p>
                    <button type="button" className="but">
                      GET IT NOW
                    </button>
                  </div>
                  <div className={chillar}>
                    <div className="cross">
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.onChangeSearchInput}
                        className="inputs"
                        placeholder="search"
                      />
                      <button type="button" onClick={this.onChangeSearch}>
                        <AiOutlineSearch size={50} className="search" />
                      </button>
                    </div>
                    <ul className="police">
                      {homePageList.map(eachData => (
                        <HomeItem eachDetails={eachData} key={eachData.id} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </IsDark.Consumer>
    )
  }
}

export default Home
