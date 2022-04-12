import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MainContext from "../../context/MainContext";
import AuthContext from "../../context/AuthContext";
import UserForm from "../userForm/UserForm";
// import Preloader from "../preloader/Preloader";

function AddCard({ id }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    image: null,
    title: null,
    price: null,
    description: null,
  });
  let { setAds, ads } = useContext(MainContext);
  let { authTokens } = useContext(AuthContext);
  let location = useLocation().pathname;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  function handleTitleChange(e) {
    const { value } = e.target;
    let errors = validationErrors;
    setTitle(value);

    if (value.length < 8) {
      errors.title = "Минимальное колличество символоа - 8";
    } else {
      errors.title = "" && setValidationErrors(errors);
    }
  }

  function handlePriceChange(e) {
    const { value } = e.target;
    let errors = validationErrors;
    setPrice(value);

    if (!value.length) {
      errors.price = "Это поле не дожно быть пустым";
    } else {
      errors.price = "" && setValidationErrors(errors);
    }
  }

  function handleDescriptionChange(e) {
    const { value } = e.target;
    let errors = validationErrors;
    setDescription(value);

    if (value.length < 8) {
      errors.description = "Минимальное колличество символоа - 8";
    } else {
      errors.description = "" && setValidationErrors(errors);
    }
  }

  // function addNewAd(e) {
  //   e.preventDefault();
  //   debugger
  //   handleAddAd({ image, title, price, description});
  // }

  const addCard = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api/ads/";
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", `${title}`);
    formData.append("price", `${price}`);
    formData.append("description", `${description}`);

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let newAd = await response.data;

    if (response.status === 201) {
      setAds([newAd.data, ...ads]);
      console.log(newAd);
      window.location.reload();
    }
  };
  return (
      <UserForm
        id={`${location === "/newAd" ? "" : id}`}
        title={`${
          location === "/newAd" ? "Добавить новый товар" : "Изменить товар"
        }`}
        buttonText={`${location === "/newAd" ? "Добавать" : "Изменить"}`}
        onSubmit={addCard}
        errors={
          title === null ||
          image === null ||
          price === null ||
          description === null ||
          validationErrors.title ||
          validationErrors.price ||
          validationErrors.description
        }
      >
        <div className="userForm__form-container userForm__form-box">
          <label className="userForm__label">
            <h2 className="userForm__subtitle">Название</h2>
            <input
              className="userForm__input"
              name="title"
              type="text"
              minLength="3"
              maxLength="30"
              onChange={handleTitleChange}
            />
            <div
              className={`input-hidden ${
                validationErrors.title ? "input-error" : ""
              }`}
            >
              {validationErrors.title}
            </div>
          </label>
          <label className="userForm__label">
            <h2 className="userForm__subtitle">Изображение</h2>
            <input
              name="image"
              className="userForm__input"
              type="file"
              onChange={handleImageChange}
            />
            <div
              className={`input-hidden ${image === null ? "input-error" : ""}`}
            >
              {image === null ? "Загрузите фотографию" : ""}
            </div>
          </label>
        </div>
        <div className="userForm__form-container">
          <label className="userForm__label">
            <h2 className="userForm__subtitle">Цена</h2>
            <input
              className="userForm__input"
              type="number"
              name="price"
              minLength="1"
              maxLength="30"
              onChange={handlePriceChange}
            />
            <div
              className={`input-hidden ${
                validationErrors.price ? "input-error" : ""
              }`}
            >
              {validationErrors.price}
            </div>
          </label>
          <label className="userForm__label">
            <h2 className="userForm__subtitle">Описание</h2>
            <input
              className="userForm__input"
              name="description"
              type="text"
              minLength="8"
              maxLength="30"
              onChange={handleDescriptionChange}
            />
            <div
              className={`input-hidden ${
                validationErrors.description ? "input-error" : ""
              }`}
            >
              {validationErrors.description}
            </div>
          </label>
        </div>
      </UserForm>
  );
}

export default AddCard;
