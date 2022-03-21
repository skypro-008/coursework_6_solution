import React, { useState, useContext } from "react";
import LinkForm from "../linkForm/LinkForm";
import useFormValidation from "../../utils/hooks/useFormValidation";
import AuthContext from "../../context/AuthContext";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();
  let {resetPassword} = useContext(AuthContext);

  function handleChangeInput(e) {
    handleChange(e);
    if (newPassword.length > 0) {
      setNewPassword("");
    }
  }
  return (
    <LinkForm
      type="submit"
      buttonName="Сохранить"
      onSubmit={resetPassword}
      error={!isValid}
      disabled={!isValid}
    >
      <label className="LinkForm__label">
        <h2 className="LinkForm__subtitlte">Новый пороль</h2>
        <input
          className="LinkForm__input"
          required
          value={values.current_password}
          id="password"
          name="current_password"
          type="password"
          minLength="8"
          onChange={handleChangeInput}
        />
        <div
          className={`LinkForm__inputHidden ${
            errors.password ? "LinkForm__inputError" : ""
          }`}
        >
          {errors.password}
        </div>
      </label>
      <label className="LinkForm__label">
        <h2 className="LinkForm__subtitlte">Повторить новый пороль</h2>
        <input
          className="LinkForm__input"
          required
          value={values.new_password}
          id="password"
          name="new_password"
          type="password"
          minLength="8"
          onChange={handleChangeInput}
        />
        <div
          className={`LinkForm__inputHidden ${
            errors.newPassword ? "LinkForm__inputError" : ""
          }`}
        >
          {errors.newPassword}
        </div>
      </label>
    </LinkForm>
  );
}

export default ChangePassword;
