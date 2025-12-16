import{_ as s,c as n,o as a,V as l}from"./chunks/framework.e2d10ea7.js";const d=JSON.parse('{"title":"npm 发布过滤部分文件","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-module/node/publish/ignore.md","filePath":"knowledge-module/node/publish/ignore.md"}'),e={name:"knowledge-module/node/publish/ignore.md"},p=l(`<h1 id="npm-发布过滤部分文件" tabindex="-1">npm 发布过滤部分文件 <a class="header-anchor" href="#npm-发布过滤部分文件" aria-label="Permalink to &quot;npm 发布过滤部分文件&quot;">​</a></h1><h2 id="使用-gitignore-设置忽略文件" tabindex="-1">使用.gitignore 设置忽略文件 <a class="header-anchor" href="#使用-gitignore-设置忽略文件" aria-label="Permalink to &quot;使用.gitignore 设置忽略文件&quot;">​</a></h2><ul><li>.gitignore 设置的忽略文件，在 git 代码管理和 npm publish 都会被忽略</li></ul><h2 id="使用-npmignore-设置忽略文件" tabindex="-1">使用 .npmignore 设置忽略文件 <a class="header-anchor" href="#使用-npmignore-设置忽略文件" aria-label="Permalink to &quot;使用 .npmignore 设置忽略文件&quot;">​</a></h2><ul><li>.npmignore 的写法跟 .gitignore 的规则完全一样， 若同时使用 .npmignore 和 .npmignore 时， .npmignore 会生效，优先级比较高</li></ul><h2 id="使用-package-json-的-files-字段选择发布那些文件" tabindex="-1">使用 package.json 的 files 字段选择发布那些文件 <a class="header-anchor" href="#使用-package-json-的-files-字段选择发布那些文件" aria-label="Permalink to &quot;使用 package.json 的 files 字段选择发布那些文件&quot;">​</a></h2><ul><li>直接在 package.json 中 files 字段设置发布哪些文件或目录。这个优先级高于 .npmignore 和 .gitignore。</li></ul><h2 id="npm-publish-默认的忽略规则" tabindex="-1">npm publish 默认的忽略规则 <a class="header-anchor" href="#npm-publish-默认的忽略规则" aria-label="Permalink to &quot;npm publish 默认的忽略规则&quot;">​</a></h2><ul><li>默认被忽略</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.*.</span><span style="color:#A6ACCD;">swp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">_</span><span style="color:#89DDFF;">*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">DS_Store</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">git</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">hg</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">npmrc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">lock</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">wscript</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">svn</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">wafpickle</span><span style="color:#89DDFF;">-*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">config</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">gypi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">CVS</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">npm</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">debug</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">node_modules</span><span style="color:#89DDFF;">/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><ul><li>默认被包含、即使设置忽略也无效</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">package</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">README</span><span style="color:#A6ACCD;"> (and its variants)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">CHANGELOG</span><span style="color:#A6ACCD;"> (and its variants)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">LICENSE </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> LICENCE</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,12),r=[p];function o(i,c,t,b,u,m){return a(),n("div",null,r)}const C=s(e,[["render",o]]);export{d as __pageData,C as default};
