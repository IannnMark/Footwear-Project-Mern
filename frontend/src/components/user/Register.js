import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

// import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";

const Register = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    town: "",
    city: "",
    email: "",
    password: "",
  });

  const { fname, lname, phone, address, town, city, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  // const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("fname", fname);
    formData.set("lname", lname);
    formData.set("phone", phone);
    formData.set("address", address);
    formData.set("town", town);
    formData.set("city", city);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">First Name</label>
              <input
                type="fname"
                id="fname_field"
                className="form-control"
                name="fname"
                value={fname}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Last Name</label>
              <input
                type="lname"
                id="lname_field"
                className="form-control"
                name="lname"
                value={lname}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Phone</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Address</label>
              <input
                type="address"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Town</label>
              <input
                type="town"
                id="towm_field"
                className="form-control"
                name="town"
                value={town}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">City</label>
              <input
                type="city"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
