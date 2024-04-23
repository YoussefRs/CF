import Modal from "../../../../components/modals/Modal";
import "./HelpContent.css";

export default function HelpContent({ showModal, closeModal }) {
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
          />
          <br />
          <label>Description</label>
          <textarea className="form-control" rows="3"></textarea>
          <br />
          <div className="form-btn row d-flex justify-content-center gap-2">
            <button className="col col-md-3">Cancel</button>
            <button className="col col-md-3" id="special-btn">
              send
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
