import React, { useState, useContext } from "react";
import LinkForm from "../linkForm/LinkForm";
import useFormValidation from "../../utils/hooks/useFormValidation";
import AuthContext from "../../context/AuthContext";

function EmailLink() {
  const [email, setEmail] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();
  let {sendPassword} = useContext(AuthContext)

  function handleChangeInput(e) {
    handleChange(e);
    if (email.length > 0) {
      setEmail("");
    }
  }
  return (
    <LinkForm
      type="send"
      buttonName="Отправить"
      error={!isValid}
      disabled={!isValid}
      onSubmit={sendPassword}
    >
      <label className="LinkForm__label">
        <h2 className="LinkForm__subtitlte">Ваш электронный адрес</h2>
        <input
          className="LinkForm__input"
          required
          value={values.email || ""}
          name="email"
          type="email"
          pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
          onChange={handleChangeInput}
        />
        <div
          className={`LinkForm__inputHidden ${
            errors.email ? "LinkForm__inputError" : ""
          }`}
        >
          {errors.email}
        </div>
      </label>
    </LinkForm>
  );
}

export default EmailLink;
