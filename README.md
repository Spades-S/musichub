### MusicHub

> 每次搜歌要切三个平台（qq、虾米、网易云），是在太麻烦了，做了一个hub，将三个平台的搜索结果集中起来，点击条目跳转相应平台

#### Demo地址：[MusicHub](http://111.230.25.17/)

#### 工程结构
```
-- musichub
    -- App
        -- build   => webpack配置文件
        -- config  => 工程配置文件
        -- src     => 前端源文件目录
        -- static  => 静态资源文件目录
        -- index.html  => htmlwebpackplugin 模板文件
        -- package.json  =>  依赖文件
    -- Server
        -- config  => 工程配置文件
        -- router  => 路由
        -- service => server服务
        -- spider  => 爬虫
        -- static  => 静态资源
        -- view    => 页面html文件
        -- package.json   => 依赖文件
```

#### 技术栈
* 前端(App)

    - vue + vue-router + webpack
    - 浏览器兼容：利用两套代码做了PC、mobile兼容，PC端用了Element组件、Mobile端用了cube-ui 组件
    - 代码风格检查：Eslint + airbnbbase


* 服务端(Server)

    - Koa：利用koa搭建了RESTful API服务器
    - request： spider使用request请求数据
    - 服务端渲染：解析UserAgent，判断当前设备类型：PC/Mobile，根据设备类型渲染对应页面

#### 快速使用
* 前端(App)
    - yarn (建议使用yarn安装依赖，依赖里有一个git仓库(对cube-ui做了修改)，npm 5.5.1 会报错
    - 开发模式运行: yarn run dev (需要将 App/src/view/desktop/components/Result.vue和App/src/view/desktop/components/Result.vue中  axios.defaults.baseURL 设置为 'http://localhost:3000/api/v1'
    - 打包：yarn run build，打包生成html文件将会在Server/view目录下，其他文件(css、js等)会在Server/static文件夹下(需要将 App/src/view/desktop/components/Result.vue和App/src/view/desktop/components/Result.vue中  axios.defaults.baseURL 设置为 '/api/v1'


#### Contribute
非常欢迎提issue、pr，非常感谢！

#### Thanks
[darknessomi/musicbox](https://github.com/darknessomi/musicbox)
