const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#FF0000' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
   //2.css/less实现按需加载(先安装插件 cnpm install babel-plugin-import -D)
   babel:{
    plugins:[
      [
        "import",
         {
           "libraryName":"antd",
           "libraryDirectory":"es",
           "style":true  //设置为true即为less / css预编译为css
         }
      ]
    ]
  }
};