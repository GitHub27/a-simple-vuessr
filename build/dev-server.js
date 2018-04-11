const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
var webpackDevServer = require('webpack-dev-server')

const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.conf')
const serverConfig = require('./webpack.server.conf')


module.exports = (app, opt) => {
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )




  const clientCompiler = webpack(clientConfig)
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    },
    setup: function (app) {
      
    }
  })

  app.use(devMiddleware)
  clientCompiler.plugin('done', () => {
    //项目代码修改会触发 webpack build，通过 webpack-hot-middleware 热更新到浏览器
    //此处会重新读取模板html，将html放到renderer渲染器中
    console.log(">>>>> code changed")
    const fs = devMiddleware.fileSystem
    const filePath = path.join(clientConfig.output.path, 'index.html')
    if (fs.existsSync(filePath)) {
      const index = fs.readFileSync(filePath, 'utf-8')
      opt.indexUpdated(index)
    }
  })

  app.use(webpackHotMiddleware(clientCompiler))



  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename)
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    //监测server-bundle.js，当server-entry.js有变化，会生成新的server-bundle.js
    console.log(">>>>> server-entry.js changed")
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    opt.bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'))
  })
}