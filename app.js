process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const path = require('path')
const express = require('express')
const compression = require('compression')
const serialize = require('serialize-javascript')
const favicon = require('serve-favicon')
const lru = require('lru-cache')
const proxy = require('http-proxy-middleware'); //引入代理中间件
const vueRenderer = require('vue-server-renderer')
const devServer = require('./build/dev-server')
var bodyParser = require('body-parser');
const resolve = file => path.resolve(__dirname, file)


const app = express()

const createRenderer = bundle => {
  // https://github.com/isaacs/node-lru-cache#options
  return vueRenderer.createBundleRenderer(bundle, {
    cache: lru({
      // max: 1000,
      // maxAge: 1000 * 60 * 15
      max: 0,
      maxAge: 0
    })
  })
}

const parseHTML = tmpl => {
  const placeholder = '{{ APP }}'
  const i = tmpl.indexOf(placeholder)
  return {
    head: tmpl.slice(0, i),
    tail: tmpl.slice(i + placeholder.length)
  }
}

const parseMeta = (head, context) => {
  const title = context.title || ''
  const description = context.description || ''
  const keywords = context.keywords || ''
  head = head.replace(/(<title>)(.*?)(<\/title>)/, `$1${title}$3`)
  head = head.replace(/(<meta name=description content=")(.*?)(">)/, `$1${description}$3`)
  head = head.replace(/(<meta name=keywords content=")(.*?)(">)/, `$1${keywords}$3`)
  return head
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: 0//cache && isProd ? 60 * 60 * 24 * 30 : 0
})

let indexHTML
let renderer

if (isProd) {
  renderer = createRenderer(fs.readFileSync(resolve('./dist/server-bundle.js'), 'utf-8'))
  indexHTML = parseHTML(fs.readFileSync(resolve('./dist/index.html'), 'utf-8'))
} else {
  devServer(app, {
    indexUpdated: index => {
      indexHTML = parseHTML(index)
    },
    bundleUpdated: bundle => {

      renderer = createRenderer(bundle)
    }
  })
  /**
   * proxy middleware options
   * 代理跨域配置
   * @type {{target: string, changeOrigin: boolean, pathRewrite: {^/api: string}}}
   */
  var options = {
    target: 'http://tservice.txslicai.com', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
      '^/StoreServices.svc': '/StoreServices.svc'
    }
  };
  var javaapi = {
    target: 'http://txsapi.zbjf.com', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
      '^/javaapi': '/'
    }
  }

  var exampleProxy = proxy(options);
  var javaapiProxy = proxy(javaapi);
  app.use('/StoreServices.svc', exampleProxy);
  app.use('/javaapi', javaapiProxy);
}

app.use(compression({
  threshold: 0
}))
app.use('/dist', serve('./dist'))
app.use('/public', serve('./public'))
app.use(favicon('./public/favicon.ico'))

// app.use('/assets', serve('./src/assets'))


const IMG = require('./node/img.js')
app.get("/verificationcode", (req, res) => {
  console.log(new Date());
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=UTF-8'
  });
  var vcode = new IMG.img();
  return res.end("data:image/Png;base64," + vcode.imgbase64)
})
// parses x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/getlist", (req, res, next) => {
  const obj = require("./node/getlist.js");
  obj.getlist(req, res, next);
  // return res.end(obj.getlist(req, res, next));
  //next();
  // return res.end("123")
});

const obj = require("./node/getlist.js");
function doAsync(req, res, next) {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      res.send('index');
    }, 2000);
  });
}
app.get("/test", doAsync);

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('the renderer is not ready, just wait a minute')
  }

  res.setHeader('Content-Type', 'text-html')

  //请求路径
  const context = {
    url: req.url,
  }
  const renderStream = renderer.renderToStream(context)
  renderStream.once('data', () => {
    res.write(parseMeta(indexHTML.head, context))
  })

  renderStream.on('data', chunk => {
    res.write(chunk)
  })

  renderStream.on('end', () => {
    //console.log("context.initialState:", context.initialState);
    if (context.initialState) {
      res.write(
        `<script>window.__INITIAL_STATE__=${
        serialize(context.initialState, { isJSON: true })
        }</script>`
      )
    }

    res.end(indexHTML.tail)
  })

  renderStream.on('error', err => {
    if (err && err.code == '404') {
      console.log(err)
      res.status(404).end('404, Page Not Found')
      return
    }
    res.status(500).end('500 Internal Error')
    console.log(err)
  })
})




const PORT = process.env.PORT || 8088
const HOST = process.env.HOST || 'localhost'


app.listen(PORT, HOST, () => {
  console.log(`server started at ${HOST}:${PORT} `)
})