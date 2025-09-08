import { Link } from "react-router-dom"

interface CardProps {
  title: string
  text: string
  buttonText: string
  buttonLink: string
  secondButtonLink: string
  secondButtonText: string
}

function Card({ title, text, buttonText, buttonLink, secondButtonLink, secondButtonText }: CardProps) {
  return (
    <div className="card text-center mb-4">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <Link className="nav-link active" to={buttonLink}>{buttonText}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/link">Link</Link>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <Link to={secondButtonLink} className="btn btn-primary">{secondButtonText}</Link>
      </div>
    </div>
  )
}

export default Card
