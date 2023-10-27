interface loginInterface {
  account: string
  password: string
}
interface loginInterface2 {
  mobile: string
  captcha: string
}
interface FormInterface {
  phone: string
  verificationCode: string
  name: string
  password: string
}
interface GitCode {
  mobile: string
  event: string
}
interface resetInterface {
  mobile: string
  captcha: string
  newpassword: string
}

const explore = {
  //账密登录
  login_password(loginMsg: loginInterface) {
    return getFetchData({
      url: `/user/login`,
      method: 'post',
      body: {
        account: loginMsg.account,
        password: loginMsg.password
      }
    })
  },
  // 手机号登录
  login_mobile(loginMsg: loginInterface2) {
    return getFetchData({
      url: `/user/mobilelogin`,
      method: 'post',
      body: loginMsg
    })
  },
  // 找回密码
  resetPassword(form: resetInterface) {
    return getFetchData({
      url: `/user/resetpwd`,
      method: 'post',
      body: form
    })
  },

  //注册
  register(registerMsg: FormInterface) {
    console.log(registerMsg)

    return getFetchData({
      url: `/user/register`,
      method: 'post',
      body: {
        username: registerMsg.name,
        password: registerMsg.password,
        mobile: registerMsg.phone,
        code: registerMsg.verificationCode
      }
    })
  },
  //验证码
  gitCode(form: GitCode) {
    return getFetchData({
      url: `/sms/send`,
      method: 'post',
      body: form
    })
  }
}
export default explore
