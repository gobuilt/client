import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchCollections } from './actions'

const dashboardContainerStyles = {
  border: '1px solid black'
}

const dashboardTitleStyles = {
  position: 'relative'
}

const collectionsContainerStyles = {
  display: 'flex',
  flexDirection: 'column'
}

const collectionTileSyles = {
  display: 'flex',
  justifyContent: 'space-around',
  border: '1px solid black',
  margin: '10px'
}

const infoTileStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
}

const newButtonStyle = {
  position: 'absolute',
  right: '30px',
  top: '10px',
  fontSize: '20px'
}

const mapStateToProps = ({ dashboard }) => ({
  dashboard,
  isAdmin: true // toggle on and off manually for now, will be hooked up to redux store later
})

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchCollections()
  }

  render() {
    const { dashboard, isAdmin } = this.props

    return (
      <div className="dashboard-container" style={dashboardContainerStyles}>
        <div style={dashboardTitleStyles}>
          <h1>Dashboard</h1>
          {isAdmin && <button style={newButtonStyle}>new collection</button>}
        </div>

        <div style={collectionsContainerStyles}>
          {dashboard
            ? dashboard.map(({ id, name, description, maxTeam }) => (
                <div
                  className="dashboard-collection-container"
                  style={collectionTileSyles}
                  key={id}
                >
                  <Link to={`/collection/${id}`}>
                    <h2>{name}</h2>
                  </Link>

                  <div style={infoTileStyles}>
                    <p>{description}</p>
                    <p>Max members per team: {maxTeam}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  { fetchCollections }
)(Dashboard)
