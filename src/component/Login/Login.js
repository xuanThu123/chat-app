import React from "react";
import className from "classnames/bind";
import styles from "./LoginStyle.module.scss";
import { FaceIcon, GoogleIcon } from "./Icon";
import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/service";

const cx = className.bind(styles);
function Login() {
  const providerFB = new firebase.auth.FacebookAuthProvider();
  const providerGg = new firebase.auth.GoogleAuthProvider();
  const handleLoginWithFaceBtn = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(providerFB);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  const handleLoginWithGoogle = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(providerGg);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("modal")}></div>
      <div className={cx("login-box")}>
        <h2>Chat App</h2>
        <h3>Đăng nhập vào Chat App</h3>
        <div className={cx("login-btn")} onClick={handleLoginWithGoogle}>
          <GoogleIcon />
          <span className={cx("title")}>Tiếp tục với Google</span>
        </div>
        <div className={cx("login-btn")} onClick={handleLoginWithFaceBtn}>
          <FaceIcon />
          <span className={cx("title")}>Tiếp tục với Facebook</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
