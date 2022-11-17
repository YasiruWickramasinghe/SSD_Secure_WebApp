import React, { useState } from "react";
import { useEffect } from "react";
import { addFile } from "../../api/api";
import { success } from "../AlerBox";
import FormAlert from "../Alert/FormAlert";
import LoadingButton from "../Button/LoadingButton";
import jwt_decode from "jwt-decode";

import "./styles.css";

const FileFormModal = (props) => {
  const [data, setData] = useState({ message: "", file: "", userid: "" });
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const token = localStorage.getItem("token");
  let user = "";
  token ? (user = jwt_decode(token)) : (user = null);

  useEffect(() => {
    props.items && setData(props.items);
  }, [props.items]);

  const handleChange = ({ currentTarget: input }) => {
    setError("");
    setData({ ...data, [input.name]: input.value, userid: user.id });
  };

  const handleFile = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    setError("");
    setloading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("message", data.message);
    formData.append("userid", data.userid);

    try {
      let res;
      res = await addFile(formData);
      await success(res.data.message);
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
            <h3 className="Auth-form-title">Upload File</h3>
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
                name="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFile}
                className="form-control mt-1"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              {error && <FormAlert message={error} />}
              {!loading ? (
                <button type="submit" className="btn btn-secondary">
                  Upload
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
