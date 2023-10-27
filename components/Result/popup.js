import React, { useState } from "react";

// Styles for the popup menu and its content
const styles = {
  popupBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark transparent background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    width: "80vw",
    height: "80vh",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

const FullscreenPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.popupBackground} onClick={onClose}>
      <div
        style={styles.popupContent}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking on the content
      >
        <h2>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
            <div class="col-12">
              <button class="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
            <label for="exampleFormControlInput1" class="form-label">
              Please put in your email address and a broker will contact you
            </label>
          </div>
        </h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const App = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setPopupOpen(true)}>Open Popup</button>
      <FullscreenPopup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  );
};

export default App;
