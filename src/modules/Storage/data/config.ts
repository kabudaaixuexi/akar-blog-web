/**
 * key
 * 1 上传文件
 * 2 新建文件夹
 * 3 删除文件夹
 * 4 文件夹重命名
 * 5 打开文件
 * 6 删除文件
 * 7 文件重命名
 */
export const initialMenu = [
  {
    text: '上传文件',
    svg: `<path d="M682.666667 85.333333l213.333333 213.333334v597.674666a42.368 42.368 0 0 1-42.368 42.325334H170.368A42.666667 42.666667 0 0 1 128 896.341333V127.658667C128 104.277333 146.986667 85.333333 170.368 85.333333H682.666667z m-128 426.666667h128l-170.666667-170.666667-170.666667 170.666667h128v170.666667h85.333334v-170.666667z" p-id="2383" fill="#515151"></path>`,
    key: 1
  },
  {
    text: '新建文件夹',
    svg: `<path d="M529.664 213.333333H896a42.666667 42.666667 0 0 1 42.666667 42.666667v597.333333a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h316.330667l85.333333 85.333333zM469.333333 512H341.333333v85.333333h128v128h85.333334v-128h128v-85.333333h-128V384h-85.333334v128z" p-id="2597" fill="#515151"></path>`,
    key: 2
  }
]
export const portfolioMenu = [
  {
    text: '删除文件夹',
    svg: `<path d="M529.664 213.333333H896a42.666667 42.666667 0 0 1 42.666667 42.666667v597.333333a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h316.330667l85.333333 85.333333zM341.333333 512v85.333333h341.333334v-85.333333H341.333333z" p-id="2811" fill="#515151"></path>`,
    key: 3
  },
  {
    text: '文件夹重命名',
    svg: `<path d="M960.576 240l-88 88-176.064-176L784.576 64l47.424 47.424V64l128 128h-47.424zM512 704l-255.488 64L320 512l332.8-315.968 176 176zM192 256v576h576V608l128-112V960H64V128h486.4L396.8 256H192z" p-id="4696" fill="#515151"></path>`,
    key: 4
  }
]

export const packageMenu = [
  {
    text: '打开文件',
    svg: `<path d="M682.666667 85.333333l213.333333 213.333334v597.674666a42.368 42.368 0 0 1-42.368 42.325334H170.368A42.666667 42.666667 0 0 1 128 896.341333V127.658667C128 104.277333 146.986667 85.333333 170.368 85.333333H682.666667z m-213.333334 554.666667v85.333333h85.333334v-85.333333h-85.333334z m85.333334-70.186667A149.418667 149.418667 0 0 0 512 277.333333a149.376 149.376 0 0 0-146.474667 120.021334l83.712 16.768A64 64 0 1 1 512 490.666667a42.666667 42.666667 0 0 0-42.666667 42.666666V597.333333h85.333334v-27.52z" p-id="3239" fill="#515151"></path>`,
    key: 5
  },
  {
    text: '删除文件',
    svg: `<path d="M896 498.090667A298.666667 298.666667 0 0 0 522.88 938.666667H170.368A42.666667 42.666667 0 0 1 128 896.341333V127.658667C128 104.277333 146.986667 85.333333 170.368 85.333333H682.666667l213.333333 213.333334v199.424zM768 981.333333a213.333333 213.333333 0 1 1 0-426.666666 213.333333 213.333333 0 0 1 0 426.666666z m-55.168-97.792a128 128 0 0 0 170.709333-170.709333l-170.709333 170.666667z m-60.373333-60.373333l170.709333-170.666667a128 128 0 0 0-170.709333 170.709334z" p-id="3453" fill="#515151"></path>`,
    key: 6
  },
  {
    text: '文件重命名',
    svg: `<path d="M896 650.368v245.973333a42.368 42.368 0 0 1-42.368 42.325334H170.368A42.666667 42.666667 0 0 1 128 895.701333V384h256a42.666667 42.666667 0 0 0 42.666667-42.666667V85.333333h426.752c23.509333 0 42.581333 19.413333 42.581333 42.325334v160.64l-383.957333 384-0.256 180.821333 181.162666 0.256L896 650.368z m33.194667-274.56l60.330666 60.330667L657.664 768l-60.416-0.085333 0.085333-60.245334 331.861334-331.861333zM128 298.666667l213.333333-213.205334V298.666667H128z" p-id="3025" fill="#515151"></path>`,
    key: 7
  },
  // {
  //   text: '下载文件',
  //   svg: `<path d="M682.666667 85.333333l213.333333 213.333334v597.674666a42.368 42.368 0 0 1-42.368 42.325334H170.368A42.666667 42.666667 0 0 1 128 896.341333V127.658667C128 104.277333 146.986667 85.333333 170.368 85.333333H682.666667z m-128 426.666667V341.333333h-85.333334v170.666667H341.333333l170.666667 170.666667 170.666667-170.666667h-128z" p-id="3667" fill="#515151"></path>`,
  //   key: 8
  // },
]
