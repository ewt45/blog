import{_ as p,r as t,o as c,c as o,a as e,b as n,w as l,d as a,e as d}from"./app-DMogTwpC.js";const r={},u={class:"table-of-contents"},h=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言"},[e("span",null,"前言")])],-1),b=e("p",null,"box64+wine，运行windows版steam有很多人测试过了，但没人测试epic。试了一下发现果然不行（电脑上倒是可以）。",-1),m=e("p",null,"偶然发现有个叫heroic的第三方客户端，不过使用electron写的，而且没有arm构建。看简介，发现它的epic管理用的是legendary，一个命令行版的第三方epic启动器，决定尝试一下。legendary可以登录epic账号，下载运行游戏，同步云存档等。",-1),g={href:"https://heroicgameslauncher.com/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/derrod/legendary",target:"_blank",rel:"noopener noreferrer"},k=d(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>运行环境为termux的proot-distro, ubuntu 23</p><p>legendary运行要求：</p><ul><li>python3.9+</li><li>pypi packages：requests，（pywebview，setuptools，wheel）</li></ul><p>使用apt安装依赖。<strong>ubuntu23无法使用<code>pip</code>（<code>error: externally-managed-environment</code>），参考网上解决方案用了pipx</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> python3 pipx</span>
<span class="line">pipx ensurepath <span class="token comment">#添加到环境变量</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后通过pipx安装legendary-gl<br><code>pipx install legendary-gl</code></p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><p><strong>登录</strong></p><p><code>legendary auth</code></p><p>会跳转到浏览器（如果PATH包含了termux的$PREFIX/bin，会自动使用<code>termux-open-url</code>打开安卓浏览器）</p><p>登录后复制要求的json字段(<code>authorizationCode</code>)，粘贴即可。<br> 如果之前登录过，那么直接显示json的可能是过期的，粘贴到legendary会登录失败。刷新一下网页就会出现一个新的<code>authorizationCode</code>，用新的即可。</p><p><strong>查看游戏库</strong></p><p><code>legendary list</code></p><p>每一行开头是游戏标题，然后后面用中括号括起来内容，第一个就是App name。但是App name好多都是md5值，而非有意义的单词。</p><p><strong>安装游戏</strong></p><p><code>legendary install xxx</code>（xxx为list里的app name）</p><p><strong>启动游戏</strong></p><p><code>legendary launch xxx</code></p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2><p>由于手机是arm架构，需要使用box64搭配wine。所以需要修改配置。</p><p>配置文件在<code>~/.config/legendary/config.ini</code><br> 分号开头是注释<br> 参考github给出的示例，以下是修改后的内容</p><div class="language-ini line-numbers-mode" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Legendary</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token comment">; Disables the automatic update check</span></span>
<span class="line"><span class="token key attr-name">disable_update_check</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span></span>
<span class="line"><span class="token comment">; Disables the notice about an available update on exit</span></span>
<span class="line"><span class="token key attr-name">disable_update_notice</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">log_level</span> <span class="token punctuation">=</span> <span class="token value attr-value">debug</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Legendary.aliases</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">tbc</span> <span class="token punctuation">=</span> <span class="token value attr-value">573b2b742fa04eda83ea73cb17d7abc0</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">default</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">wine_executable</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/bin/boxandwine.sh</span></span>
<span class="line"><span class="token comment">;wrapper = /usr/bin/boxandwine.sh</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>[Legendary.aliases]</code>：给app name起个别名。我想下的the big con的app name是一串md5，所以起个好写的名字。之后启动的时候可以直接 <code>legendary launch tbc</code></li><li><code>[default]</code>：游戏的全局配置。通过<code>wine_executable</code> 指定wine执行文件路径，由于我需要先启动box64，所以这里替换成一个脚本文件<code>/usr/bin/boxandwine.sh</code>，其内容是<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line">box64 wine64 <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>注意， <ul><li>由于legendary使用python3执行wine可执行文件，导致脚本开头必须指定shebang为shell脚本，否则会报错执行文件格式错误</li><li>由于之后传入的参数中，exe路径可能包含空格，所以需要把<code>$@</code>加上引号。虽然不是很理解，但是不加的话，即使外面传入参数用引号括上还是会被分割开。</li></ul></li><li><code>[default.env]</code>：这里放环境变量</li><li><code>[AppName]</code>：这里为某个游戏的单独配置</li></ul><h2 id="启动游戏" tabindex="-1"><a class="header-anchor" href="#启动游戏"><span>启动游戏</span></a></h2><p>然后启动the big con</p><p><code>legendary launch tbc</code> 就可以了（上面配置了别名为tbc）</p><p>由于是unity游戏，所以最好导出box64的环境变量</p><p><code>BOX64_DYNAREC_BLEEDING_EDGE=1</code> 和 <code>BOX64_DYNAREC=0</code></p><p>第一个变量会在检测到monoBleedingEdge的时候，自动设置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">BOX64_DYNAREC_STRONGMEM=1</span>
<span class="line">BOX64_DYNAREC_BIGBLOCK=0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>否则unity游戏使用box64时容易崩溃，弹出那个crashHandler的红色惊叹号窗口。</p><hr><p>由于这游戏不支持epic云存档，就没测试legendary的云存档好不好用了（又下了几个体积小的游戏，貌似也都不支持云存档）</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li>可以使用linux版的legendary 第三方epic客户端。</li><li>ubuntu23 需要使用pipx而非pip来安装leendary-gl。</li><li>登录epic时会跳转到浏览器，获取一个token，之后浏览器的登录不会退出。</li><li>由于需要借助box64，所以修改配置里的wine执行文件为脚本（shebang行指定为shell脚本），来启动box64和wine。</li></ul>`,36);function x(_,y){const s=t("router-link"),i=t("ExternalLinkIcon");return c(),o("div",null,[e("nav",u,[e("ul",null,[e("li",null,[n(s,{to:"#前言"},{default:l(()=>[a("前言")]),_:1})]),e("li",null,[n(s,{to:"#安装"},{default:l(()=>[a("安装")]),_:1})]),e("li",null,[n(s,{to:"#使用"},{default:l(()=>[a("使用")]),_:1})]),e("li",null,[n(s,{to:"#配置"},{default:l(()=>[a("配置")]),_:1})]),e("li",null,[n(s,{to:"#启动游戏"},{default:l(()=>[a("启动游戏")]),_:1})]),e("li",null,[n(s,{to:"#总结"},{default:l(()=>[a("总结")]),_:1})])])]),h,b,m,e("ul",null,[e("li",null,[e("a",g,[a("heroic"),n(i)])]),e("li",null,[e("a",v,[a("legendary"),n(i)])])]),k])}const w=p(r,[["render",x],["__file","index.html.vue"]]),E=JSON.parse('{"path":"/blogs/2024/05/legendary-game-launcher/","title":"安卓上proot运行legendary（第三方开源Epic游戏启动器）","lang":"zh-CN","frontmatter":{"date":"2024-5-20 21:51:45","title":"安卓上proot运行legendary（第三方开源Epic游戏启动器）","categories":["android"],"tags":["legendary","Epic"]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[]},{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":2,"title":"启动游戏","slug":"启动游戏","link":"#启动游戏","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1716216037000,"updatedTime":1718089573000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":3}]},"filePathRelative":"blogs/2024/05/legendary-game-launcher/index.md"}');export{w as comp,E as data};
