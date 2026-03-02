import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Messages from "../Messages";

function EditApplicant() {
  const { id } = useParams();

  const [applicantData, setApplicantData] = useState({});
  const [connectionData, setConnectionData] = useState({});
  const [message, setMessage] = useState("");

  const [applicant, setApplicant] = useState({
    Applicant_Name: "",
    Gender: "",
    District: "",
    State: "",
    Pincode: "",
    Ownership: "",
    GotId_Type: "",
    ID_Number: "",
    Category: "",
  });

  const [connection, setConnection] = useState({
    Applicant: "",
    Load_Applied: "",
    Date_Of_Application: "",
    Date_of_Approval: "",
    Modified_Date: "",
    Status: "",
    Reviewer_Id: "",
    Reviewer_Name: "",
    Reviewer_Comment: "",
  });

  const fetchApplicantData = async () => {
  try {
    const response = await fetch(`/api/update_applicant/${id}/`);
    const data = await response.json();
    setApplicantData(data.applicant);
    setConnectionData(data.connection);
  } catch (error) {
    console.error("Error fetching applicant data:", error);
  }
};


  useEffect(() => {
    fetchApplicantData();
  }, []);

 const handleChange = (e) => {
  const { name, value } = e.target;

  setApplicantData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setConnectionData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (Number(connectionData.Load_Applied) > 200) {
        setMessage("Load Applied cannot be greater than 200");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

   const response = await fetch(`/api/update_applicant/${id}/`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      applicant: applicantData,
      connection: connectionData,
    }),
  }
);



      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Update failed");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      setMessage("Applicant / Connection details updated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating applicant data:", error);
      setMessage("Server error while updating");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-md-3">
            {""}
            <Link to="/" className="btn btn-dark my-1">
              Go Back
            </Link>
          </div>
        </div>

        <hr />
        <h5>Edit Applicant Or Connection Details</h5>
        <hr />

        {message && <Messages variant="info">{message}</Messages>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="Applicant_name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Applicant_Name"
                  value={applicantData.Applicant_Name || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="Gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="Gender"
                  value={applicantData.Gender || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="District">
                <Form.Label>District</Form.Label>
                <Form.Control
                  type="text"
                  name="Districts"
                  value={applicantData.Districts || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="State">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="State"
                  value={applicantData.State || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="Pincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="number"
                  name="Pincode"
                  value={applicantData.Pincode || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="Ownership">
                <Form.Label>Ownership</Form.Label>
                <Form.Control
                  as="select"
                  name="Ownership"
                  value={applicantData.Ownership || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="INDIVIDUAL">Individual</option>
                  <option value="JOINT">Joint</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="GovtId_Type">
                <Form.Label>GovtId_Type</Form.Label>
                <Form.Control
                  as="select"
                  name="GotId_Type"
                  value={applicantData.GotId_Type || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="AADHAR">Aadhar</option>
                  <option value="VOTER_ID">VOter ID</option>
                  <option value="PAN">PAN</option>
                  <option value="PASSPORT">Passport</option>
                </Form.Control>

                <Form.Group controlId="Id_Number">
                  <Form.Label>Id_Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="Id_Number"
                    value={applicantData.Id_Number || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="Category"
                  value={applicantData.Category || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="Load_Applied">
                <Form.Label>Load_Applied</Form.Label>
                <Form.Control
                  type="text"
                  name="Load_Applied"
                  value={connectionData.Load_Applied || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="Date_Of_Application">
                <Form.Label>Date_Of_Application</Form.Label>
                <Form.Control
                  type="date"
                  name="Date_Of_Application"
                  value={connectionData.Date_Of_Application || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId=" Date_of_Approval">
                <Form.Label> Date_of_Approval</Form.Label>
                <Form.Control
                  type="date"
                  name="Date_of_Approval"
                  value={connectionData.Date_of_Approval || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="Status">
                <Form.Label>Status</Form.Label>
               <Form.Control as="select" name="Status" value={connectionData.Status || ""}>
  <option value="">Select Status</option>
  <option value="Connection Released">Connection Released</option>
  <option value="Approved">Approved</option>
  <option value="Pending">Pending</option>
  <option value="Rejected">Rejected</option>
</Form.Control>

              </Form.Group>

              <Form.Group controlId="Reviewer_Id">
                <Form.Label>Reviewer_Id</Form.Label>
                <Form.Control
                  type="number"
                  name="Reviewer_Id"
                  value={connectionData.Reviewer_Id || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="Reviewer_Name">
                <Form.Label>Reviewer_Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Reviewer_Name"
                  value={connectionData.Reviewer_Name || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="Reviewer_Comment">
                <Form.Label>Reviewer_Comment</Form.Label>
                <Form.Control
                  as="select"
                  name="Reviewer_Comment"
                  value={connectionData.Reviewer_Comment || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="Installation Pending ">
                    Installation Pending
                  </option>
                  <option value="Documents verification in progress">
                    Documents verification in progress
                  </option>
                  <option value="Installation completed">
                    Installation completed
                  </option>
                  <option value="KYC failed">KYC failed</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" className="mt-3 text-center" type="submit">
            Update
          </Button>

          <br />
          <br />
        </Form>
      </Container>
    </>
  );
}

export default EditApplicant;
