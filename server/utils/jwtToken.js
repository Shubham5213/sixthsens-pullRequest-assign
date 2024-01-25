//create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // //options for cookie
  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // }

  return res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None", 
      secure: true,
    })
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = sendToken;
