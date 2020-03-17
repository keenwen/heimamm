<template>
  <el-dialog class="reg_dialog" title="用户注册" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="nickname" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="code" label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col class="imgbox" :span="5" :offset="2">
            <img class="codeimg" @click="changeimg" :src="imgUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="logincode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.logincode" autocomplete="off"></el-input>
          </el-col>
          <el-col class="imgbox" :span="5" :offset="2">
            <el-button
              :plain="true"
              :disabled="time!==0"
              @click="getCode"
              class="reg_bnt"
            >{{time === 0 ? '获取验证码' : time  }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onsubmit ">注册</el-button>
    </div>
  </el-dialog>
</template>

<script>
var checkPhone = function(rule, value, callback) {
  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机格式不正确"));
  }
};
var checkEmail = function(rule, value, callback) {
  var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱不正确"));
  }
};
import { apiGetCode } from "../../../api/register.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "67px",
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        logincode: "",
        code: ""
      },
      rules: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" }
        ]
      },
      //   imgUrl:"http://127.0.0.1/heimamm/public/captcha?type=sendsms&t="+Math.random()*999//随机数
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now(), //时间戳
      timer: "",
      time: 0
    };
  },
  methods: {
    onsubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            message: "注册成功",
            type: "success"
          });
        } else {
          this.$message.error("注册失败");
        }
      });
    },
    changeimg() {
      this.imgUrl =
        process.env.VUE_APP_ONLINEURL + "/captcha?type=sendsms&t=" + Date.now(); //时间戳
    },
    getCode() {
      this.time = 1;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time == 0) {
          clearInterval(this.timer);
        }
      }, 1000);

      // 获取验证码
      apiGetCode({
        code: this.form.code,
        phone: this.form.phone
      })
        .then(res => {
          console.log(res);
        })
        .then(err => {
          console.log(err);
        });
      this.$message({
        message: "获取验证码成功",
        type: "success"
      });

      //   this.$axios({
      //     url: process.env.VUE_APP_ONLINEURL + "/sendsms",
      //     method: "post",
      //     withCredentials: true, // 跨域请求时 需要设置
      //     data: {
      //       code: this.form.code,
      //       phone: this.form.phone
      //     }
      //   })
      //     .then(res => {
      //       console.log(res);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    }
  }
};
</script>

<style lang="less">
.reg_dialog {
  .el-dialog__header {
    text-align: center;
    padding: 0px;
    height: 53px;
    line-height: 53px; // 设置背景为渐变色
    background: linear-gradient(to right, #0dc1ef, #1394fc);
    .el-dialog__title {
      color: #fff;
    }
  }
  .imgbox {
    height: 41px;
    text-align: right;
    .codeimg {
      width: 143px;
      height: 41px;
    }
  }
  .reg_bnt {
    width: 143px;
    height: 41px;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>