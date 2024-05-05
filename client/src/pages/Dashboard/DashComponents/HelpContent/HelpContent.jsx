import { useState } from "react";
import Modal from "../../../../components/modals/Modal";
import "./HelpContent.css";
import axios from "axios"

export default function HelpContent({ showModal, closeModal }) {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [object, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      object: object, // Assuming 'subject' is the subject of the help request
      message: description, // Assuming 'description' is the description of the help request
    };

    try {
      const response = await axios.post(`${BASE_URL}/help`, formData);
      closeModal();
    } catch (error) {
      console.error("Error sending help request:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div>
      {/* <button onClick={handleShowModal}>Show Modal</button> */}
      <Modal title="My Modal" show={showModal} onHide={closeModal} size="lg">
        <div className="form_container">
          <h1 className="text-center">Help request</h1>
          <br />
          <label>Request Subject</label>
          <input
            type="text"
            className="form-control"
            // placeholder="Text input"
            value={object}
            onChange={(e) => setSubject(e.target.value)}
          />
          <br />
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <div className="form-btn row d-flex justify-content-center gap-2">
            <button className="col col-md-3" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="col col-md-3"
              id="special-btn"
              onClick={handleSubmit}
            >
              send
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
