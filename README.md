## react 项目框架 

#### 一. 目录结构说明 ###
##### 一级目录
1. app/*  源代码
2. node_modules/*  依赖包
3. server.js  自动刷新热起服务器
4. webpack.config.js  webpack配置文件
5. bower_conponents/*  未知.. ==!

##### 二级目录
1. app/components/*  组件文件夹
2. app/configs/*  代码配置文件夹(暂时用作模拟接口数据
3. app/datas/*  数据文件夹(所有本地数据，比如图层图片数据、geojson数据等
4. app/images/*  项目里自引用的图片资源(非第三方包
5. app/js/*  每个页面的主要js文件
6. app/styles/*  每个页面的主要样式文件
7. app/libs/*  不能在node_modules里面引用的第三方style和js库
8. app/utils/*  自写的功能单元模块
9. app/index.html  入口页面

##### 三级目录
1. app/libs/styles/*  第三方样式库的所有资源
2. app/libs/js/*  第三方js库的所有资源
