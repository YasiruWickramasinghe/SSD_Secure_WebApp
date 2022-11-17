import React, { useState } from "react";
import { useEffect } from "react";
import { addFile, updateFile } from "../../api/api";
import { success } from "../AlerBox";
import FormAlert from "../Alert/FormAlert";
import LoadingButton from "../Button/LoadingButton";

import "./styles.css";

const FileFormModal = (props) => {
  const [data, setData] = useState({ message: "", file: "" });
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    props.items && setData(props.items);
  }, [props.items]);

  const handleChange = ({ currentTarget: input }) => {
    setError("");
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    setError("");
    setloading(true);
    e.preventDefault();
    try {
      let res;
      props.status
        ? (res = await addFile(data))
        : (res = await updateFile(props.items._id, data));
      success(res.data.message);
      setloading(false);

      window.location = "/";
    } catch (error) {
      setloading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content form-group">
            <h3 className="Auth-form-title">
              {props.status ? "Insert Message" : "Update Message"}
            </h3>
            <div className="form-group mt-3">
              <label>Message</label>
              <textarea
                className="form-control mt-1"
                rows="3"
                name="message"
                value={data.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group mt-3">
              <label>File Upload</label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="title"
                value={data.file}
                // onChange={handlePhoto}
                className="form-control mt-1"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              {error && <FormAlert message={error} />}
              {!loading ? (
                <button type="submit" className="btn btn-secondary">
                  {props.status ? "Upload" : "Update"}
                </button>
              ) : (
                <LoadingButton />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileFormModal;
