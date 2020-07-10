<template>
    <div class="login">
        <div class="left">
            <div class="header">
                <img class="logo" src="@/assets/img/login_logo.png" alt="">
                <span class="left_t1">黑马面面</span>
                <div class="left_border"></div>
                <span class="left_t2">用户登录</span>
            </div>
            <el-form :model='form' class="form">
                <el-form-item>
                    <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="请输入密码" :show-password='true'></el-input>
                </el-form-item>
                <el-form-item>
                   <el-row>
                       <el-col :span='16'>
                            <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
                       </el-col>
                       <el-col  :span='8'><img class="captcha" src="@/assets/img/captcha.png" alt=""></el-col>
                   </el-row>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="form.isTrue">
                        我已阅读并同意<el-link type='primary'>用户协议</el-link> 和<el-link type='primary'>隐私条款</el-link>
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary">登录</el-button><br>
                    <el-button class="btn" type="primary">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <img src="@/assets/img/login_right.png" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                phone:'',
                password:'',
                code:'',
                isTrue:''
            }
        }
    }
}
</script>

<style lang='less'>
    .login{
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-around;
        background: linear-gradient(to right,#1493fa, #01c6fa);
        .left{
            width: 478px;
            height: 550px;
            padding: 48px;
            background: #f5f5f5;
            .header{
                display: flex;
                align-items: center;
                .logo{
                    width: 22px;
                    height: 17px;
                   

                }
                .left_t1{
                    padding: 0 15px;
                    font-size: 24px;
                    font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #0c0c0c;
                }
                .left_border{
                        width: 1px;
                        height: 28px;
                        background: #c7c7c7;
                }
                .left_t2{
                    padding-left: 15px;
                    font-size: 22px;
                    font-family: PingFangSC Regular, PingFangSC Regular-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #0c0c0c;
                }

            }
            .form{
                width: 100%;
                margin-top: 20px;
                .captcha{
                    width: 100%;
                    height:40px
                }
                .btn{
                    width: 100%;
                    height: 40px;
                    margin-top: 20px;
                }
            }
                    }
    }
    
</style>