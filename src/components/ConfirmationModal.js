import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const baseUrl = process.env.REACT_APP_BASEURL;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "250px",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, id }) => {
  const [device, setDevice] = useState([]);
  const [error, setError] = useState("");

  const fetchDevice = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/device/get/${id}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setDevice(data);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchDevice();
  }, [id]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >
      <h2 className="text-2xl font-bold text-center">
        Are you sure? <br /> You want to delete?
      </h2>
      <div className="text-center font-semibold py-2">
        {device.equipmentName}
      </div>
      <div className="flex justify-center items-center gap-10 py-2">
        <div>
          HTM <span>{device.htm}</span>
        </div>
        <div>
          Model <span>{device.model}</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 py-2">
        <button
          className="bg-bgColor text-secondColor rounded-lg px-10 py-2 font-bold min-w-36"
          onClick={onRequestClose}
        >
          Cancel
        </button>
        <button
          className="bg-delBtn text-white rounded-lg px-10 py-2 font-bold"
          onClick={onConfirm}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
