import {Link} from 'react-router-dom'
import IsDark from '../../context/IsDark'
import './index.css'

const TrendingVideoCard = props => {
  const {eachTrending} = props
  const {id, title, publishedAt, channel, thumbnailUrl, viewCount} =
    eachTrending
  const {name} = channel
  return (
    <Link to={`/home/${id}`} className="lassi">
      <li className="classes">
        <img src={thumbnailUrl} alt="url" className="section" />
        <div className="apple">
          <h1 className="ps"> {title} </h1>
          <p> {name}</p>
          <div className="box">
            <p> {viewCount}</p>
            <p className="ss"> {publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideoCard
