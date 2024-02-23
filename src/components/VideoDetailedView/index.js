import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

class VideoDetailedView extends Component {
  state = {
    videoDetailed: {},
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response.ok)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        description: data.video_details.description,
        id: data.video_details.id,
        thumbnailUrl: data.video_details.thumbnail_url,
        publishedAt: data.video_details.published_at,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscribeCount: data.video_details.channel.subscribe_count,
        },
      }
      this.setState({videoDetailed: updatedData})
    }
  }

  render() {
    const {videoDetailed} = this.state
    const {
      description,
      id,
      thumbnailUrl,
      publishedAt,
      title,
      videoUrl,
      viewCount,
      channel,
    } = videoDetailed

    return (
      <div className='details'>
        <Header />
        <div className='structure'>
          <Sidebar />
          <div>
            <ReactPlayer url={videoUrl} controls width='100%' />
            <p> {channel.name}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoDetailedView
