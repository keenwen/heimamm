<template>
  <div class="login">
    <div class="leftbox">
      <div class="title">
        <img class="titleimg" src="../../assets/title-logo.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>
      <!-- 使用表单结构 -->
      <el-form class="loginform" ref="form" :rules="rules" :model="form" label-width="0px">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="logincode">
          <!-- 使用栅格系统 -->
          <el-row>
            <el-col :span="16">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="form.logincode"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="loginCode" src="../../assets/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck" class="checkboxheight" >
          <el-checkbox class="textColor" v-model="form.isCheck" >
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="loginbtn" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="loginbtn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="rightimg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        passowrd: "",
        logincode: "",
        isCheck: []
      },
      // 验证规则
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "密码长度为5~10字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "验证码不能为空！", trigger: "blur" },
          { min: 4, max: 4, message: "验证码错误", trigger: "blur" }
        ],
        isCheck:[{type:"array", required:true,message:"请确认条款并阅读用户协议",trigger:"change"}]
      }
    };
  },
  methods: {
    //点击登录
    onSubmit() {
      // 调用form的验证方法
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            message:"登陆成功！",
            type:"success"
          })
        } else {
      this.$message.error('登录失败！');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  display: flex;

  justify-content: space-around;

  align-items: center;
  .leftbox {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;

    box-sizing: border-box;
    .title {
      display: flex;

      align-items: center;
      .titleimg {
        width: 22px;
        height: 17px;
      }
      .titlename {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 16px;
        margin-right: 14px;
      }
      .titleline {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .titlelogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .loginform {
      margin-top: 29px;
    }
    .loginCode {
      width: 100%;
      height: 40px;
    }
    .checkboxheight {
      .el-checkbox__label {
        line-height: 20px;
      }
      .textColor {
        color: gray;
      }

      .el-form-item__content {
        line-height: 20px;
      }
    }

    .loginbtn {
      width: 100%;
    }
  }
  .rightimg {
    width: 633px;
    height: 435px;
  }
}
</style>
