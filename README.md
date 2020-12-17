# dd-plugin
这是使用vue-cli3进行开发插件，创建项目就不用多说啦
```ruby
vue create xxxx
```
#### 初始化
安装需要依赖包
```
yarn install
```

#### 运行项目
```
yarn serve
```
## 一：调整项目结构
首先需要创建一个 `_packages` 目录，用来存放组件
然后将 src 目录改为 `examples` 用作示例

## 二：修改配置
启动项目的时候，默认入口文件是 `src/main.js`

将 `src` 目录改为 `examples` 之后，就需要重新配置入口文件

在根目录下创建一个 `vue.config.js` 文件

``` javascript 
// vue.config.js

module.exports = {
  // 将 examples 目录添加为新的页面
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  }
}
```
完成这一步之后就可以正常启动项目了

vue-cli 3.x  提供了构建库的命令，所以这里不需要再为 packages 目录配置 webpack

## 三、开发组件
之前已经创建了一个 `packages` 目录，用来存放组件

该目录下存放每个组件单独的开发目录，和一个 `index.js` 整合所有组件，并对外导出

每个组件都应该归类于单独的目录下，包含其组件源码目录 `src`，和 `index.js` 便于外部引用

`popup/src/main.vue` 是组件的开发文件，具体代码这里就不展示了

需要注意的是，组件必须声明 `name`，这个 `name` 就是组件的标签

`popup/index.js` 用于导出单个组件，如果要做按需引入，也需要在这里配置

``` javascript 
// packages/popup/index.js

// 导入组件，组件必须声明 name
import Textarea from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
Textarea.install = function (Vue) {
    Vue.component(Textarea.name, Textarea)
}

export default Textarea
```

## 四、整合并导出组件
编辑 `packages/index.js` 文件，实现组件的全局注册

``` javascript 
// packages / index.js

// 导入单个组件
import popup from './popup/index'

// 以数组的结构保存组件，便于遍历
const components = [
    popup
]

// 定义 install 方法
const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    // 遍历并注册全局组件
    components.map(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // 导出的对象必须具备一个 install 方法
    install,
    // 组件列表
    ...components
}
```
到这里组件就已经开发完毕
 
可以在 `examples/main.js` 中引入该组件

``` javascript 
//引入
import ddPopup from '../packages/index'
Vue.use(ddPopup)
```
然后就能直接使用刚才开发的 textarea 组件

``` javascript 
//使用
<dd-popup title="呲呲呲" v-if="flag" @ok="ok" @cancel="cancel"/>
 ```
 
### 参数
 | 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| title | 内容 | String | '' |

### 事件events

| 事件名称 | 说明 | 回调方法 |
| ------ | ------ | ------ |
| ok | 确认按钮 | function |
| cancel | 取消按钮 | function |
 
 这时候可以 `yarn serve` 启动项目，测试一下组件是否有 `bug`

// 启动前需要确保已经在 `vue.config.js` 中添加了新入口 `examples/main.js`

### dd-popup 组件效果
 ![dd-popup text](https://github.com/da-dong-dong/dd-plugin/blob/master/MD_imgs/11.png)

 ## 五、打包组件

 vue-cli 3.x 提供了一个库[文件打包命令](https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93)

主要需要四个参数：

1. `target`: 默认为构建应用，改为 `lib` 即可启用构建库模式

2. `name`: 输出文件名

3. `dest`: 输出目录，默认为 `dist`，这里我们改为 `lib`

4. `entry`: 入口文件路径，默认为 `src/App.vue`，这里改为 `packages/index.js`

基于此，在 package.json 里的 scripts 添加一个 lib 命令

``` json
// pageage.json

{
  "scripts": {
   "lib": "vue-cli-service build --target lib --name dd-popup-plugin --dest lib packages/index.js"
  }
}
```
然后执行 `npm run lib` 命令，编译组件

打包后 目录结构文件
 ![img text](https://github.com/da-dong-dong/dd-plugin/blob/master/MD_imgs/22.png)


 ### 没有npm账号怎么办？别急，教你

 ## 注册npm
 首先去npm注册一个[用户](https://www.npmjs.com/package/dd-popup)
核心操作就这么几步骤，一做就会
然后在本地添加用户：
``` cmd
npm adduser
username:
password:
email:
```
注册完后，npm官网的小姐姐会让你验证邮箱，验证完成后，需要退出登录重新登录
查看当前环境下的用户：
```
npm whoami
```
 ![npm text](https://github.com/da-dong-dong/dd-plugin/blob/master/MD_imgs/33.png)

登录：
```
npm login
```
发布：
```
npm publish
```

本人发布时候重新新建文件夹，这个文件只负责构建组件，另外一个负责上传npm组件
### 一：初始化package.json
``` js
npm init -y
```
 ![npm init text](https://github.com/da-dong-dong/dd-plugin/blob/master/MD_imgs/44.png)

 ### 二：首先需要在 package.json 添加组件信息

`name`: 包名，该名不能和已有的名称冲突；

`version`: 版本号，不能和历史版本号相同；

`description`: 简介；

`main`: 入口文件，应指向编译后的包文件；

`keyword`：关键字，以空格分割；

`author`：作者；

`private`：是否私有，需要修改为 false 才能发布到 npm；

`license`：开源协议。

 ![send text](https://github.com/da-dong-dong/dd-plugin/blob/master/MD_imgs/55.png)

在发布之前，一定要确保组件已经编译完毕，而且 package.json 中的入口文件（main）的路径正确

一切就绪，发布组件：
```
npm publish
```

emmmmmm....

### 最后查看npm
看看是否 推送上去

 ![npm send text](https://github.com/da-dong-dong/dd-plugin/blob/master/MD_imgs/66.png)

 #### 安装使用
　　

　安装：
```
npm install  dd-popup --save
或者
yarn add dd-popup
```

　使用：

　　`main.js` 全局引入

 ![ok text](https://github.com/da-dong-dong/dd-plugin/blob/master/MD_imgs/77.png)