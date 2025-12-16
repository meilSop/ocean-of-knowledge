# Element-ui 的按需加载的配置

## 安装依赖

- 借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的

```js
npm install babel-plugin-component -D
```

## label.config.js 配置文件添加配置信息

```js
module.exports = {
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: '../packages/theme-chalk/src',
        ext: '.scss'
      },
      'element-ui'
    ]
  ]
}
```

## 创建按需加载的文件 element-ui-plugin.js

```js
import Vue from 'vue'
import {
  // Pagination,
  Dialog,
  // Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,
  Input,
  InputNumber,
  // Radio,
  // RadioGroup,
  // RadioButton,
  Checkbox,
  // CheckboxButton,
  CheckboxGroup,
  // Switch,
  Select,
  Option,
  // OptionGroup,
  Button,
  // ButtonGroup,
  // Table,
  // TableColumn,
  DatePicker,
  // TimeSelect,
  // TimePicker,
  Popover,
  Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  // Tag,
  // Tree,
  // Alert,
  // Slider,
  // Icon,
  // Row,
  // Col,
  // Upload,
  // Progress,
  // Spinner,
  // Badge,
  // Card,
  // Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  // Timeline,
  // TimelineItem,
  // Link,
  // Divider,
  // Image,
  // Calendar,
  // Backtop,
  // PageHeader,
  // CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

const components = [
  Dialog,
  Input,
  InputNumber,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Button,
  DatePicker,
  Tooltip,
  Form,
  FormItem,
  Tabs,
  TabPane,
  ColorPicker,
  Popover
]

components.forEach((item) => {
  Vue.use(item)
})

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
```

## 在 main.js 中引入按需加载文件

```js
import './element-ui-plugin.js'
```

## 若要修改 element-ui 的主题色， 需要创建 variable.scss 文件

```js
$--color-primary: #ff9429;
```

## 在 vue.config.js 添加引入的配置

```js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/variable.scss";
        `
      }
    }
  }
})
```
