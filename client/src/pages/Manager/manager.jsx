import React, { useEffect, useState } from "react";
import NavbarStd from "../../components/Navbars/NavbarStd";
import Modal from "../../components/Manager";

const Manager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isInsert, setIsInsert] = useState(false);

  const togglePopup = (item) => {
    setItems(item ? item : "");
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <NavbarStd />
      <div className="container">
        <h3 className="mt-2">
          <center>
            <strong>Manager Dashboard</strong>
          </center>
        </h3>
        {isOpen && (
          <Modal
            items={items}
            status={isInsert}
            changeIsInsert={setIsInsert}
            handleClose={togglePopup}
          />
        )}
        <button
          onClick={() => {
            togglePopup();
            setIsInsert(true);
          }}
          className="btn btn-secondary"
        >
          File Upload
        </button>
      </div>
    </div>
  );
};

export default Manager;
