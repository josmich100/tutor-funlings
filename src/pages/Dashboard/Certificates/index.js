import React from "react"
import CertificateComp from "./CertificateComp"
import CertificateList from "./CertificateList"

const Certificates = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <CertificateComp />
        <CertificateList />
      </div>
    </React.Fragment>
  )
}

Certificates.propTypes = {}

export default Certificates
