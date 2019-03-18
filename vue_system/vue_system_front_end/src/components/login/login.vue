<template>
    <div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button 
							type="primary" 
							@click="submitForm('loginForm')" 
							class="submit_btn" 
							size="small">登陆
						</el-button>
						<el-button 
							type="primary" 
							class="submit_btn" 
							@click="enroll" 
							size="small">注册
						</el-button>
				  	</el-form-item>
				</el-form>
				<div class='fotter_box'>
					<p class="tip">温馨提示：</p>
					<p class="tip">未登录过的新用户，请点击注册按钮</p>
					<p class="tip">注册过的用户可凭账号密码登录</p>
				</div>
	  		</section>
	  	</transition>
		<my-form></my-form>
  	</div>
</template>

<script>
import form from './form.vue'
    export default {
         data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		components: {
			'my-form':form
		},
		mounted(){
			this.showLogin = true;
			this.isHeight();
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let obj = {
							username: this.loginForm.username, 
							password: this.loginForm.password
						}
						let p = this.$store.dispatch('load',obj)
						p.then((data) => {
							if (data.data.status == '200') {
								localStorage.setItem('token',JSON.stringify(data.data.token))
								this.$message({
									type: 'success',
									message: data.data.msg
								});
								console.log(data.data)
								this.$router.push('home');
							}else if (data.data.status == '400') {
								this.$message({
									type: 'error',
									message: data.data.msg
								});
								
							}else if (data.data.status == '404') {
								this.$message({
									type: 'error',
									message: data.data.msg
								});
								
							}
						}) 
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
			enroll() {
				
			},
			isHeight() {
				let height = document.documentElement.clientHeight;
				let ele = document.getElementsByClassName('login_page')[0];
				ele.style.height = height + 'px';
			}
		}
	}
</script>

<style scoped lang='less'>
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -80px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		width: 320px;
		height: 210px;
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		background-color: #fff;
		.submit_btn{
			width: 80px;
			font-size: 16px;
			margin: 0 25px;
		}
		.fotter_box {
			margin-top: 30px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>