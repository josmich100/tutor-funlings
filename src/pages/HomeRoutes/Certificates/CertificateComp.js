import { get, ref } from "firebase/database";
import { getFirebaseBackend } from "helpers/firebase_helper";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";

const CertificateComp = (props) => {
  const [hasProfile, setHasProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const checkProfile = async () => {
    const firebaseBackend = getFirebaseBackend();

    // Access the auth property
    const authInstance = firebaseBackend.auth;
    const dbInstance = firebaseBackend.db;
    const currUser = authInstance.currentUser;

    console.log(currUser);

    if (currUser) {
      const profileRef = ref(dbInstance, `student/profiles/${currUser.uid}`);
      const snapshot = await get(profileRef);
      const profile = snapshot.val();

      if (profile) {
        setHasProfile(true);
        setUserProfile(profile);
      } else {
        //setHasProfile(false)

        return <Redirect to="/profile" />;
      }
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);
  return (
    <React.Fragment>
      {" "}
      <Card className="p-3">
        <CardBody className="pt-4">
          <Row>
            <Col
              xs="4"
              className="p-20 mx-2 mb-2 border border-3 border-secondary"
            >
              <i className="bx bx-award p-3" />
            </Col>

            <Col>
              <Row>
                <h5 className="mt-2">
                  Congratulations, {userProfile?.username}!
                </h5>
                <p>
                  You have been awarded the Young Animator certificate for
                  successfully completing the Minecraft module.
                </p>
              </Row>

              <Row>
                <Col>
                  <Button
                    type="button"
                    color="primary"
                    className="btn-sm my-2 me-2"
                    // onClick={handleShareCertificate}
                  >
                    View & Share
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="button"
                    color="transparent"
                    className="btn-sm text-primary my-2 me-2"
                    // onClick={handleDownloadCertificate}
                  >
                    Download
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

CertificateComp.propTypes = {};

export default CertificateComp;
