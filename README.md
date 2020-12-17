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
 
 这时候可以 `yarn serve` 启动项目，测试一下组件是否有 `bug`

// 启动前需要确保已经在 `vue.config.js` 中添加了新入口 `examples/main.js`

## dd-popup 组件效果
 ![Image text](https://github.com/da-dong-dong/dd-plugin/blob/master/MD_imgs/11.png)
