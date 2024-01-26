<template>
  <div class="demo">
    <div class="header">
      <h1 style="text-align: center;">
        富文本编辑器
      </h1>
      <button @click="changeLang" class="btn">
        切换语言 --- {{ lang }}
      </button>
    </div>
    <div class="editor-wrap">
      <RichText
        ref="editor"
        class="editor-1"
        :data="data"
        :block-toolbar="['paragraph', 'h2', 'h3', 'h4', 'image', 'button', 'raw']"
        :initialized="onInitialized"

        :tool-config="toolConfig"
        :messages="messages[lang]"
        @changeData="editorChange"
      />
      <div
        id="editor-2"
        class="editor-2"
      >
        <RichTextRender :block-list="blockList"></RichTextRender>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import {
  RichText,
  RichTextRender
} from '../../components'

const illegalImages = ref([])
const isRun = ref(false)
let rangeSelection = null

const branchValidImage = () => {
  if (!isRun.value) {
    isRun.value = true
    const time = setTimeout(() => {
      isRun.value = false
      console.log('illegalImages', illegalImages)
      illegalImages.value = []
    }, 1000)
  }
}

function validateImages(file) {
  // 检查文件大小，这里假设最大为 5MB
  const maxSize = 3 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    branchValidImage()
    illegalImages.value.push(file.name)
    return false
  }
  return true
}

function uploadImage(files) {
  return new Promise((resolve, reject) => {
    const isValid = validateImages(files)

    if (isValid) {
      resolve({
        success: true,
        file: {
          url: 'https://editorjs.io/_nuxt/api-image_2x.aa04c3de.jpg'
        }
      })
    } else {
      reject('Invalid images')
    }
  })
}

const toolConfig = ref({
  image: {
    config: {
      customUpload: {
        uploadByCallback({ uploadSuccess }) {
          uploadSuccess({ url: 'https://editorjs.io/_nuxt/api-image_2x.aa04c3de.jpg' })
        }
      },
      uploader: {
        uploadByFile(file) {
          return uploadImage(file)
          // return Promise.resolve({
          //   success: true,
          //   file: {
          //     url: file
          //   }
          // })
        }
      },
      endpoints: {
        byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
        byUrl: 'http://localhost:8008/fetchUrl' // Your endpoint that provides uploading by Url
      }
    }
  },
  link: {
    config: {
      getSelection(selection) {
        // selection('https://baidu.com')
        rangeSelection = selection
      },
      searchLinkData(search) {
        const list = [
          { name: '首页', href: 'https://www.cms3-site004890001.ifonelab.net/', description: 'https://www.cms3-site004890001.ifonelab.net/' },
          { name: '首页1', href: 'https://www.cms3-site004890001.ifonelab.net/', description: 'https://www.cms3-site004890001.ifonelab.net/33333333333333333333333333333333333333333333' },
          { name: '首页2', href: 'https://www.cms3-site004890001.ifonelab.net/', description: 'https://www.cms3-site004890001.ifonelab.net/' },
          { name: '首页22', href: 'https://www.cms3-site004890001.ifonelab.net/', description: 'https://www.cms3-site004890001.ifonelab.net/' },
          { name: '首页221', href: 'https://www.cms3-site004890001.ifonelab.net/', description: 'https://www.cms3-site004890001.ifonelab.net/' },
          { name: '产品介绍页', href: 'https://www.cms3-site004890001.ifonelab.net/', description: 'https://www.cms3-site004890001.ifonelab.net/' }
        ]
        const result = list.filter((item) => item.name.includes(search))
        return Promise.resolve({
          items: result,
          success: true
        })
      }
    }
  }
})

const editorInstance = ref(null)

const blockList = ref([
  // {
  //   type: 'h2',
  //   data: {
  //     text: 'Editor.js',
  //     level: 2
  //   }
  // },
  {
    type: 'paragraph',
    data: {
      text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
    }
  },
  // {
  //   type: 'h2',
  //   data: {
  //     text: 'Key features',
  //     level: 3
  //   }
  // },
  {
    type: 'button',
    data: {
      text: '按钮',
      link: 'baidu.com'
    }
  },
  // {
  //   type: 'list',
  //   data: {
  //     style: 'unordered',
  //     items: [
  //       'It is a block-styled editor',
  //       'It returns clean data output in JSON',
  //       'Designed to be extendable and pluggable with a simple API'
  //     ]
  //   }
  // },
  // {
  //   type: 'h2',
  //   data: {
  //     text: 'What does it mean «block-styled editor»',
  //     level: 3
  //   }
  // },
  // {
  //   type: 'paragraph',
  //   data: {
  //     text: "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
  //   }
  // },
  // {
  //   type: 'paragraph',
  //   data: {
  //     text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
  //   }
  // },
  // {
  //   type: 'h2',
  //   data: {
  //     text: 'What does it mean clean data output',
  //     level: 3
  //   }
  // },
  // {
  //   type: 'paragraph',
  //   data: {
  //     text: 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
  //   }
  // },
  // {
  //   type: 'paragraph',
  //   data: {
  //     text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
  //   }
  // },
  // {
  //   type: 'paragraph',
  //   data: {
  //     text: 'Clean data is useful to sanitize, validate and process on the backend.'
  //   }
  // },
  {
    type: 'paragraph',
    data: {
      text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
    }
  },
  {
    type: 'image',
    data: {
      file: {
        url: 'https://codex.so/public/app/img/external/codex2x.png'
      },
      caption: '',
      withBorder: false,
      stretched: false,
      withBackground: false
    }
  }
])

const data = ref({
  time: 1591362820044,
  blocks: blockList.value,
  version: '2.18.0'
})

const editorChange = ({ json }) => {
  blockList.value = json.blocks
}

const messages = {
  zh: {
    ui: {
      blockTunes: {
        toggler: {
          'Click to tune': '操作'
        }
      },
      inlineToolbar: {
        converter: {
          'Convert to': '转换'
        }
      },
      toolbar: {
        toolbox: {
          Add: '添加'
        }
      },
      popover: {
        Filter: '功能搜索',
        'Nothing found': '无此结果'
      }
    },
    toolNames: {
      Text: '段落',
      List: '列表',
      H2: '标题H2',
      H3: '标题H3',
      H4: '标题H4',
      Button: '按钮',
      'Raw HTML': 'HTML 代码',
      Image: '图片',
      Bold: '加粗',
      Italic: '斜体',
      'Link Autocomplete': '链接',
      Strikethrough: '删除线',
      Color: '颜色',
      Underline: '下划线',
      Maker: '标记'
    },
    tools: {
      h2: {
        'Heading 2': '标题H2',
        'Heading 3': '标题H3',
        'Heading 4': '标题H4',
        Paragraph: '段落'
      },
      h3: {
        'Heading 2': '标题H2',
        'Heading 3': '标题H3',
        'Heading 4': '标题H4',
        Paragraph: '段落'
      },
      h4: {
        'Heading 2': '标题H2',
        'Heading 3': '标题H3',
        'Heading 4': '标题H4',
        Paragraph: '段落'
      },
      paragraph: {
        'Paragraph': '段落',
        'Heading 2': '标题H2',
        'Heading 3': '标题H3',
        'Heading 4': '标题H4',
        'Press Tab': '直接输入文本内容或点击 Tab 选择功能'
      },
      header: {
        'Heading 2': '标题H2',
        'Heading 3': '标题H3',
        'Heading 4': '标题H4'
      },
      link: {
        'Paste or search': '输入链接或者搜索站内页面'
      },
      raw: {
        'Enter HTML code': '请输入 HTML 代码'
      },
      image: {
        'Select an Image': '选择图片',
        'With border': '添加边框'
      },
      button: {
        'Button Text': '按钮文案',
        'Link Url': '跳转链接',
        Edit: '编辑',
        Save: '保存'
      }
    },
    blockTunes: {
      delete: {
        Delete: '删除',
        'Click to delete': '确认删除'
      },
      moveUp: {
        'Move up': '上移'
      },
      moveDown: {
        'Move down': '下移'
      },
      alignBlockTune: {
        'Align left': '左对齐',
        'Align center': '居中对齐',
        'Align right': '右对齐'
      }
    }
  },
  en: {
    ui: {
      blockTunes: {
        toggler: {
          'Click to tune': 'Function'
        }
      },
      inlineToolbar: {
        converter: {
          'Convert to': 'Convert to'
        }
      },
      toolbar: {
        toolbox: {
          Add: 'Add'
        }
      },
      popover: {
        Filter: 'Search',
        'Nothing found': 'No data'
      }
    },
    toolNames: {
      Text: 'Paragraph',
      List: 'List',
      H2: 'Heading 2',
      H3: 'Heading 3',
      H4: 'Heading 4',
      Button: 'Button',
      'Raw HTML': 'Raw HTML',
      Image: 'Image',
      Bold: 'Bold',
      Italic: 'Italic',
      'Link Autocomplete': 'Link',
      Strikethrough: 'Strikethrough',
      Color: 'Color',
      Underline: 'Underline',
      Maker: 'Mark'
    },
    tools: {
      h2: {
        'Heading 2': 'Heading 2',
        'Heading 3': 'Heading 3',
        'Heading 4': 'Heading 4',
        Paragraph: 'Paragraph'
      },
      h3: {
        'Heading 2': 'Heading 2',
        'Heading 3': 'Heading 3',
        'Heading 4': 'Heading 4',
        Paragraph: 'Paragraph'
      },
      h4: {
        'Heading 2': 'Heading 2',
        'Heading 3': 'Heading 3',
        'Heading 4': 'Heading 4',
        Paragraph: 'Paragraph'
      },
      paragraph: {
        'Heading 2': 'Heading 2',
        'Heading 3': 'Heading 3',
        'Heading 4': 'Heading 4',
        'Press Tab': 'Enter texts or press \'Tab\' to select a function'
      },
      header: {
        'Heading 2': 'Heading 2',
        'Heading 3': 'Heading 3',
        'Heading 4': 'Heading 4'
      },
      link: {
        'Paste or search': 'Enter URL or Search'
      },
      raw: {
        'Enter HTML code': 'Enter HTML code'
      },
      image: {
        'Select an Image': 'Select an Image',
        'With border': 'With border'
      },
      button: {
        'Button Text': 'Button Text',
        'Link Url': 'Link URL',
        Edit: 'Edit',
        Save: 'Save'
      }
    },
    blockTunes: {
      delete: {
        Delete: 'Delete',
        'Click to delete': 'Click to Delete'
      },
      moveUp: {
        'Move up': 'Move Up'
      },
      moveDown: {
        'Move down': 'Move Down'
      },
      alignBlockTune: {
        'Align left': 'Align Left',
        'Align center': 'Align Center',
        'Align right': 'Align Right'
      }
    }
  }
}

const editor = ref(null)
const lang = ref('zh')

// const updateDom = (mutationList, observer) => {
//   mutationList.forEach((mutation) => {
//     switch (mutation.type) {
//       case 'childList':
//         /* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
//            mutation.removedNodes */
//         console.log('childList', mutation)
//         break
//       case 'attributes':
//         /* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中，
//            该属性之前的值为 mutation.oldValue */
//         console.log('attributes', mutation)
//         break
//     }
//   })
// }

const onInitialized = (editor) => {
  editorInstance.value = editor
  editor.isReady.then(() => {
    document.querySelector('.ce-inline-toolbar__buttons')?.addEventListener('click', (ev) => {
      let dataSet = ev.target.dataset
      let { target } = ev
      // if (!dataSet.tool) {
      //   dataSet = ev.target.parentNode.dataset
      //   console.log(ev.target.parentNode)
      // }
      while (!dataSet.tool && target) {
        dataSet = target.parentNode.dataset
        target = target.parentNode
      }
      // ['bold', 'strikethrough', 'italic', 'Color', 'Maker', 'underline']
      if (rangeSelection && ['bold', 'strikethrough', 'italic', 'Color', 'Maker', 'underline'].includes(dataSet.tool)) {
        rangeSelection?.()
        rangeSelection = null
      }
    }, true)
  })
}

// 切换语言
const changeLang = () => {
  lang.value = lang.value === 'zh' ? 'en' : 'zh'
  editor.value.refreshEditor()
}
</script>

<style lang='scss'>
.editor-wrap {
  display: flex;
  padding-left: 70px;
}
.header {
  position: relative;
  .btn {
    position: absolute;
    left: 20px;
    top: 20px;
  }
}
.editor-1 {
  flex: 1;
//   overflow: hidden;
}
.editor-2 {
  flex: 1;
  overflow: hidden;
}
.codex-editor--narrow .ce-toolbar__actions {
  right: 0;
}
</style>
