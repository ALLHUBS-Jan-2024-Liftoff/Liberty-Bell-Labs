import React from 'react'

export default function NavBar() {
  
  return ( 
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Kitchen Compass</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="/dashboard">Home</a>
        <a className="nav-link" href="/features">Features</a>
        <a className="nav-link" href="/pricing">Pricing</a>
        
      </div>
        {/* right side nav bar logout */}

        <ul class="nav navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link ms-3" href="/logout"><span className="glyphicon glyphicon-user"></span>Logout</a>
        </li>
        </ul>
    </div>
  </div>
</nav>

    

  )
}
