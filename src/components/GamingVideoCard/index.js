import {Link} from 'react-router-dom'
import './index.css'

const GamingVideoCard = props => {
  const {eachGameDetails} = props
  const {id, thumbnailUrl, viewCount, title} = eachGameDetails

  return (
    <Link to={`/home/${id}`} className="lassi">
      <li className="list-container">
        <img src={thumbnailUrl} alt="game" className="alt-game" />
        <p> {title}</p>
        <p>
          <span> {viewCount}</span> Watching Worldwide
        </p>
      </li>
    </Link>
  )
}

export default GamingVideoCard
