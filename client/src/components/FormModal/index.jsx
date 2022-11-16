import React, { useState } from "react";
import { useEffect } from "react";
import { addNote, updateNote } from "../../api/api";
import { success } from "../AlerBox";
import FormAlert from '../Alert/FormAlert'
import LoadingButton from '../Button/LoadingButton'

import "./styles.css";

const FormModal = props => {
  const [data, setData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    props.items && setData(props.items);
  }, [props.items])

  const handleChange = ({ currentTarget: input }) => {
    setError('');
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    setError('')
    setloading(true)
    e.preventDefault();
    try {
      let res;
      props.status 
      ? res = await addNote(data)
      : res = await updateNote(props.items._id, data);
      success(res.data.message)
      setloading(false)

      window.location = "/";

    } catch (error) {
         setloading(false)
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
            <h3 className="Auth-form-title">{props.status ? 'Add Note': 'Update Note'}</h3>
            <div className="form-group mt-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="form-control mt-1"
                required
                placeholder="Enter Title"
              />
            </div>
            <div className="form-group mt-3">
              <label>Description</label>
              <textarea
                className="form-control mt-1"
                rows="3"
                name="description"
                value={data.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="d-grid gap-2 mt-3">
              {error && <FormAlert message={error}/>}
              {!loading ?<button type="submit" className="btn btn-danger">
                {props.status ? 'Add':'Update'}
              </button>:
              <LoadingButton/>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
