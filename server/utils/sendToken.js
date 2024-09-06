const sendToken = (statusCode, user, res) => {
    const token = user.getJWTToken();
    const editedUser = user.toObject();
    delete editedUser.password;
    user = editedUser;
  
    //options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      sameSite: "none",
      secure: true,
      httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  export default sendToken;
  