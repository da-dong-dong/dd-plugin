<template>
	<div class="bigBox">
		<div class="box">
			<div class="text">确定需要{{title}}吗</div>
			<div class="but">
				<div class="cancel" @click="cancel">取消</div>
				<div class="ok" @click="ok">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'dd-popup',
		props:['title'],
		data() {
			return {
				
			};
		},
		methods:{
			cancel(){
				this.$emit('cancel')
			},
			ok(){
				this.$emit('ok')
			}
		}
	}
</script>

<style lang="scss">
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		color: #8d8d8d;
		.box{
			background-color: #FFFFFF;
			width: 300px;
			position: absolute;
			top:50%;
			left: 50%;
			transform: translate(-50%,-50%);
			//margin: 50% auto;
			border-radius: 15px;
			.text{
				padding: 30px;
				height: 100px;
				line-height: 100px;
				font-size: 20px;
				text-align: center;
			}
			.but{
				display: flex;
				text-align: center;
				height: 80px;
				line-height: 80px;
				border-top: 1px solid #f9f9f9;
				.cancel{
					width: 50%;
				}
				.ok{
					width: 50%;
					border-left: 1px solid #f9f9f9;
					color: #FF0000;
				}
			}
		}
	}
</style>
