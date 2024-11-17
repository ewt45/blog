import{_ as o,r as i,o as p,c,a as n,d as s,b as e,e as l}from"./app-DMogTwpC.js";const r="/assets/1-C5s7FU79.png",t="/assets/5-BKwn00kB.png",d="/assets/3-DYuf3vOM.png",u="/assets/6-ItPWJqM5.png",v="/assets/4-UX6no3Qq.png",h={},k=n("h2",{id:"前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前言"},[n("span",null,"前言")])],-1),g=n("p",null,"linux上不知道有什么好的播放器，大名鼎鼎的vlc怎么连个字幕浏览器的功能都没有？？",-1),b=n("p",null,"需求:",-1),_=n("ul",null,[n("li",null,[s("视频有内封字幕时，可以查看这些字幕的全部内容。像potplayer一样 "),n("img",{src:r,alt:"alt text"})]),n("li",null,"由于是自己用，只用支持srt格式，不支持编辑，不支持外部加载的字幕。")],-1),f=n("p",null,"参考",-1),m={href:"https://addons.videolan.org/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/exebetche/vlsub",target:"_blank",rel:"noopener noreferrer"},w={href:"https://github.com/videolan/vlc/blob/3.0.16/share/lua/README.txt",target:"_blank",rel:"noopener noreferrer"},y={href:"https://stackoverflow.com/questions/15795385",target:"_blank",rel:"noopener noreferrer"},q={href:"http://www.coderholic.com/extending-vlc-with-lua/",target:"_blank",rel:"noopener noreferrer"},j={href:"https://videolan.videolan.me/vlc/group__vlc.html",target:"_blank",rel:"noopener noreferrer"},L={href:"https://wiki.videolan.org/Hacker_Guide/How_To_Write_a_Module/",target:"_blank",rel:"noopener noreferrer"},C={href:"https://github.com/Dante383/VLC-GIF-Maker/blob/main/vlc_gif_maker.lua#L224",target:"_blank",rel:"noopener noreferrer"},E={href:"https://github.com/GDoux/Perroquet-Subtitles-for-VLC/blob/main/perroquet.lua#L734",target:"_blank",rel:"noopener noreferrer"},M={href:"https://addons.videolan.org/p/1154027",target:"_blank",rel:"noopener noreferrer"},V={href:"https://addons.videolan.org/p/1154031",target:"_blank",rel:"noopener noreferrer"},N=n("p",null,"版本：ubuntu22 vlc 3.0.16",-1),B=n("p",null,"吐槽：官网的wiki啥都找不到，要么就是翻源码，要么就是参考别人的lua脚本。再加上vlc的lua脚本内部代码变更非常频繁，我用的老版本很多api不一样，github上还只能搜最新版本的代码，要么就是老函数搜不到，要么就是文档里给的最新api用不了。（最后发现gitlab可以搜旧版本）",-1),D=n("p",null,[s("最终成果："),n("br"),n("img",{src:t,alt:"alt text"})],-1),H=n("h2",{id:"基本",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#基本"},[n("span",null,"基本")])],-1),I={href:"https://github.com/videolan/vlc/blob/3.0.16/share/lua/README.txt",target:"_blank",rel:"noopener noreferrer"},T=l('<p>lua脚本放在<code>~/.local/share/vlc/lua/extensions</code>目录下。要更新时到 vlc顶栏 - 工具 - 插件及扩展 - 活动插件，点击重新加载即可</p><p>3.0.16 lua值中的全局变量 vlc 的内容</p><p><img src="'+d+`" alt="alt text"></p><h3 id="约定回调" tabindex="-1"><a class="header-anchor" href="#约定回调"><span>约定回调</span></a></h3><ul><li>function descriptor() 扩展说明和能力（接收哪些回调）</li><li>function activate() 插件开启时。可以vlc全局变量。</li><li>function close() 似乎是对话框关闭时调用。我看有显示对话框的都这么写<div class="language-lua line-numbers-mode" data-ext="lua" data-title="lua"><pre class="language-lua"><code><span class="line"><span class="token keyword">function</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">vlc<span class="token punctuation">.</span><span class="token function">deactivate</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">end</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>function playing_changed() 需要开启能力 playing-listener 。播放状态发生变化时，例如开始播放，暂停等，被调用。</li><li>function input_changed() 需要开启能力 input-listener。</li></ul><h3 id="日志输出-vlc-msg-dbg" tabindex="-1"><a class="header-anchor" href="#日志输出-vlc-msg-dbg"><span>日志输出（vlc.msg.dbg()</span></a></h3><p>vlc顶栏 - 工具 - 消息，level设为2（debug），filter输入lua</p><h3 id="获取当前播放媒体" tabindex="-1"><a class="header-anchor" href="#获取当前播放媒体"><span>获取当前播放媒体</span></a></h3><p>此版本没有<code>vlc.player</code>。查看3.0.16源码发现用的是</p><ol><li><p><code>vlc.playlist.current()</code> 获取当前播放序号</p></li><li><p><code>vlc.playlist.get(序号)</code> 获取当前播放的媒体</p></li><li><p><code>vlc.playlist.get(序号).item</code></p><p><img src="`+u+'" alt="alt text"></p></li></ol><p>item的内容对应vlc顶栏 - 工具 - 媒体信息</p><ul><li><code>metas()</code> 对应元数据tab下的内容</li><li><code>info()</code> 对应 编解码器 tab下的内容</li><li><code>stats()</code> 对应统计</li></ul><p>其中info()可以查看到视频流,音频流,字幕流,但输出是按语言来的,即我这里是中文.</p><h3 id="执行终端命令" tabindex="-1"><a class="header-anchor" href="#执行终端命令"><span>执行终端命令</span></a></h3><p><code>os.execute()</code></p><p>vlc提供的功能太有限，做不到/找不到的就依靠外部程序来实现</p><h3 id="var" tabindex="-1"><a class="header-anchor" href="#var"><span>var</span></a></h3><p>vlc.var.get()</p><ul><li><p>从vlc object中获取一个数据（比如字幕信息strack就是<code>get(vlc.object.input(), &#39;spu-es&#39;)</code>）</p></li><li><p>可用的vlc object都在vlc.object里，有 libvlc()，input()，aout()，vout()，playlist()，find()</p></li></ul><p>看源码中，var_Create() var_Change()等c函数就是操作这些var的名称和内容的，不是为lua特别准备的，反过来说vlc.var.get()就是给lua提供的获取c代码中数据的途径</p><h3 id="参考别人插件" tabindex="-1"><a class="header-anchor" href="#参考别人插件"><span>参考别人插件</span></a></h3><p>https://addons.videolan.org/</p><p>除了extensions, 还有plugins，放在不同文件夹，可以用c语言，能力更强？</p><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路"><span>思路</span></a></h2><ul><li>方法一： <ol><li>获取vlc内部解析好的字幕文本内容。</li><li>显示到屏幕上。</li></ol></li><li>方法二： <ol><li>使用外部ffmpeg 提取视频内封字幕到本地。</li><li>读取提取出的字幕文件并显示。</li></ol></li></ul><h2 id="方法一-失败" tabindex="-1"><a class="header-anchor" href="#方法一-失败"><span>方法一（失败）</span></a></h2><p>对于方法一，lua脚本提供的函数功能实在有限。唯一有点希望的是</p><ul><li>vlc.var.libvlc_command()</li><li>vlc.object.libvlc()</li><li>vlc.var.get()</li></ul><p>但是也没找到能获取字幕流数据的方法。最接近的只是获取字幕流名称和序号，没有具体内容文本。</p><hr>',30),G={href:"https://github.com/videolan/vlc/blob/3.0.16/modules/demux/subtitle.c#L1168",target:"_blank",rel:"noopener noreferrer"},P=l('<hr><p>libvlc的参数，貌似可以从终端进入<code>vlc --intf rc</code> 然后输入help查看<code>cli命令</code></p><ul><li><code>strack</code> 查看字幕轨道信息，后面加序号就是切换到某个轨道的字幕</li><li><code>info</code> 显示全部信息，也包括字幕信息</li><li><code>vlm</code> 加载vlm。加载后再输入help会多显示<code>vlm命令</code><img src="'+v+'" alt="alt text"></li></ul><hr>',4),R={href:"https://github.com/videolan/vlc/blob/3.0.16/share/lua/intf/cli.lua#L613",target:"_blank",rel:"noopener noreferrer"},S=l(`<div class="language-lua line-numbers-mode" data-ext="lua" data-title="lua"><pre class="language-lua"><code><span class="line">  <span class="token keyword">local</span> input <span class="token operator">=</span> vlc<span class="token punctuation">.</span>object<span class="token punctuation">.</span><span class="token function">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">local</span> curr_sub_id <span class="token operator">=</span> vlc<span class="token punctuation">.</span>var<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> <span class="token string">&#39;spu-es&#39;</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">local</span> sub_list_ids<span class="token punctuation">,</span> sub_list_names <span class="token operator">=</span>  vlc<span class="token punctuation">.</span>var<span class="token punctuation">.</span><span class="token function">get_list</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> <span class="token string">&#39;spu-es&#39;</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;尝试spu-es &#39;</span> <span class="token operator">..</span> curr_sub_id<span class="token punctuation">)</span></span>
<span class="line">  <span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;尝试全部spu-es &#39;</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token function">ipairs</span><span class="token punctuation">(</span>sub_list_ids<span class="token punctuation">)</span> <span class="token keyword">do</span></span>
<span class="line">    <span class="token keyword">local</span> id <span class="token operator">=</span> sub_list_ids<span class="token punctuation">[</span>i<span class="token punctuation">]</span></span>
<span class="line">    <span class="token keyword">local</span> sub_name <span class="token operator">=</span> sub_list_names<span class="token punctuation">[</span>i<span class="token punctuation">]</span></span>
<span class="line">    <span class="token keyword">local</span> mark <span class="token operator">=</span> <span class="token punctuation">(</span>id <span class="token operator">==</span> curr_sub_id<span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token string">&quot; *&quot;</span> <span class="token keyword">or</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token operator">..</span><span class="token function">tostring</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token operator">..</span><span class="token string">&quot; - &quot;</span><span class="token operator">..</span><span class="token function">tostring</span><span class="token punctuation">(</span>sub_name<span class="token punctuation">)</span><span class="token operator">..</span>mark<span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">end</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>get(input, &#39;spu-es&#39;)</code> 获取当前选中的字幕轨道编号</li><li><code>.get_list(input, &#39;spu-es&#39;)</code> 获取全部可用的字幕轨道编号和显示名称</li><li>轨道编号应该是和ffmpeg查看时的一样的</li><li>禁用字幕轨道的序号是-1,这个可以排除掉</li></ul><h2 id="方法二-不完美" tabindex="-1"><a class="header-anchor" href="#方法二-不完美"><span>方法二（不完美）</span></a></h2><p>使用外部ffmpeg提取srt字幕。lua貌似没法从命令行直接接收字符串，要写入文件再读取。可以参考其他人的插件是怎么写的。</p><p>整体逻辑：</p><ol><li>从vlc对象中获取当前播放视频的uri，用于后续作为ffmpeg的输入。</li><li>ffprobe读取视频中全部字幕的流序号。</li><li>根据流序号，从vlc对象中获取其应显示的名称，显示到屏幕上以供用户选择，将包含序号和名称的字幕流对象存入数组。</li><li>当用户选择某条字幕流时，使用ffmpeg提取该视频中对应（字幕）流，输出到本地文件。</li><li>读取本地文件内容，显示到屏幕上，同时将文本存入字幕流对象。</li></ol><h3 id="ffmpeg读取及提取" tabindex="-1"><a class="header-anchor" href="#ffmpeg读取及提取"><span>ffmpeg读取及提取</span></a></h3><p>使用ffmpeg吧</p><p><strong>读取全部字幕信息</strong></p><p><code>ffprobe -i 1.mkv -show_streams -select_streams s -v quiet -print_format json</code></p><ul><li><code>-show_streams</code> 显示 流 的信息</li><li><code>-v quiet</code> 屏蔽开头的一大串基本信息输出</li><li><code>-select_streams s</code> stream specifier，s代表筛选出字幕流。和<code>-show_streams</code>搭配使用。</li><li><code>-print_format json</code> 输出格式为json。vlc lua中可以用dkjson模块读取json</li></ul><p>json格式下，转为lua对象之后，筛选留下 <code>stream.codec_type == &#39;subtitle&#39;</code> 并且 <code>stream.codec_name == &#39;subrip&#39;</code> 的。也就是仅支持srt字幕。</p><hr><p><strong>提取srt字幕</strong></p><p><code>ffmpeg -y -i 1.mkv -map 0:3 output.srt</code></p><ul><li><code>-y</code> 无需手动确认（比如同名文件存在时直接覆盖）</li><li><code>-map</code> 指定要提取哪些流。</li><li><code>0:3</code><ul><li><code>0</code>表示输入序号，即-i中的第一个输入 1.mkv</li><li><code>3</code>表示第三个流，这个序号在查看信息时会看到</li></ul></li><li><code>0:s:1</code> 也可以写成这样。中间的s表示筛选字幕类型。同理还可以有 <code>v</code>视频，<code>a</code>音频。然后<code>1</code>表示字幕流中的第二个流，注意这个是只剩下字幕流后的顺序，所以和不用<code>s</code>时的序号不同。</li></ul><p>srt文件格式非常简单，每一条字幕就是一个块，每个块之间用一个空行分隔，每个块的内容</p><ul><li>第一行是一个序号，递增。</li><li>第二行是时间 <code>时:分:秒,毫秒 --&gt; 时:分:秒,毫秒</code></li><li>第三行往后是文本内容。</li></ul><h3 id="vlc-对话框" tabindex="-1"><a class="header-anchor" href="#vlc-对话框"><span>vlc 对话框</span></a></h3><p>参考lua的readme和其他插件就行了。基本逻辑就是创建一个dialog对象，然后拿这个dialog去创建各种控件。</p><p>控件可以set和get，用于更新显示，和用户交互时获取用户输入/选择。</p><p>比较迷惑的是控件的大小，创建的时候可以选填各种数据：第几列，第几行，占几列(span)，占几行，宽像素，高像素。</p><ul><li>绝对像素值不生效，而宽高span这种相对值，默认显示出来不是正确比例，需要手动把对话框拉伸大到一定程度才是正确比例。比如横向两个文本宽的比例是3:1，显示出来就是1:1，但是拉伸对话框后第一个文本会一直变宽到3:1。</li><li>经过一番测试，横向可以用按钮占位，因为按钮有最小宽度要求，可以保证一定宽度。竖向可以用html或list占位，或者多添加几个按钮应该也行。</li></ul><p>关于字幕的全部文本行显示，一开始用的是list，后来改成html了。用<code>&lt;table&gt;</code>直接显示表格。</p><h3 id="lua模块加载" tabindex="-1"><a class="header-anchor" href="#lua模块加载"><span>lua模块加载</span></a></h3><p>哪些模块能加载哪些不能？</p>`,26),W={href:"https://github.com/videolan/vlc/blob/3.0.16/modules/lua/extension.c#L869",target:"_blank",rel:"noopener noreferrer"},z=n("p",null,"发现可以引入dkjson模块。这样ffprobe读取字幕流信息时可以输出成json格式了",-1),A=n("p",null,[n("code",null,'local dkjson = require("dkjson")')],-1),F={href:"https://github.com/videolan/vlc/blob/a187304c75176bd5c76427d3360378111f49abf7/share/Makefile.am#L21",target:"_blank",rel:"noopener noreferrer"},J=l(`<h3 id="lua基本语法" tabindex="-1"><a class="header-anchor" href="#lua基本语法"><span>lua基本语法</span></a></h3><p>第一次接触lua，一些需要注意的地方（其实不会的问gpt就行了）</p><ul><li><p>比较：<code>==</code> 相等，字符串比较可以用。 <code>~=</code> 不等。</p></li><li><p>函数返回 可以返回多个变量，因此接收函数返回值时也可以一行声明多个变量</p></li><li><div class="language-lua line-numbers-mode" data-ext="lua" data-title="lua"><pre class="language-lua"><code><span class="line"><span class="token keyword">for</span> xxx <span class="token keyword">do</span></span>
<span class="line"><span class="token keyword">end</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> xxx <span class="token keyword">then</span></span>
<span class="line"><span class="token keyword">elseif</span> xxx <span class="token keyword">then</span></span>
<span class="line"><span class="token keyword">end</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>遍历表格：<code>for key, value in pairs(tbl) do</code></p></li><li><p>遍历数组（表格）：<code>for idx, val in ipairs(list) do</code></p><p>数组添加元素：<code>table.insert(tbl, val)</code></p></li><li><p>函数调用：<code>a:b(...)</code> 等于 <code>a.b(a, ...)</code></p></li><li><p>打印表全部内容</p><div class="language-lua line-numbers-mode" data-ext="lua" data-title="lua"><pre class="language-lua"><code><span class="line"><span class="token keyword">function</span> <span class="token function">print_table</span><span class="token punctuation">(</span>table<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token keyword">in</span> <span class="token function">pairs</span><span class="token punctuation">(</span>table<span class="token punctuation">)</span> <span class="token keyword">do</span></span>
<span class="line">    <span class="token function">log</span><span class="token punctuation">(</span>key <span class="token operator">..</span> <span class="token string">&quot; (&quot;</span> <span class="token operator">..</span> <span class="token function">type</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">..</span> <span class="token string">&quot;)&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">end</span></span>
<span class="line"><span class="token keyword">end</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="最终成果" tabindex="-1"><a class="header-anchor" href="#最终成果"><span>最终成果</span></a></h3><p><img src="`+t+'" alt="alt text"></p>',5),O={href:"https://gist.github.com/ewt45/551118ead9dacd610ad3db2c0de9ecff",target:"_blank",rel:"noopener noreferrer"};function U(K,Q){const a=i("ExternalLinkIcon");return p(),c("div",null,[k,g,b,_,f,n("ul",null,[n("li",null,[n("a",m,[s("比较全的vlc各种插件"),e(a)]),s("：有介绍，还可以看源码，官网另一个插件页面和vlc程序内的插件页面都非常不好用")]),n("li",null,[n("a",x,[s("别人写的插件：vlsub"),e(a)]),s("：可以参考怎么写的。")]),n("li",null,[n("a",w,[s("vlc的lua文档和api"),e(a)]),s("：原来文档放源码里了，官网啥都不写")]),n("li",null,[n("a",y,[s("How can I write a plugin for VLC that responds to play, pause and stop events?"),e(a)]),s("：lua扩展的基本写法")]),n("li",null,[n("a",q,[s("一篇vlc lua扩展的教程 Extending VLC with Lua"),e(a)])]),n("li",null,[n("a",j,[s("libvlc文档"),e(a)])]),n("li",null,[n("a",L,[s("官方文档 Hacker Guide/How To Write a Module"),e(a)])]),n("li",null,[s("别人的插件 "),n("ul",null,[n("li",null,[n("a",C,[s("制作gif"),e(a)]),s("的扩展，用了ffmpeg")]),n("li",null,[n("a",E,[s("听力测试填字幕"),e(a)]),s("扩展，从本地读取解析srt文件, 应该是一行一行读的")]),n("li",null,[n("a",M,[s("另一个从本地加载字幕的"),e(a)])]),n("li",null,[n("a",V,[s("lrcview"),e(a)]),s(" lrc浏览。可以参考一下列表怎么显示的。以及一些lua自带的文件读取函数用法")])])])]),N,B,D,H,n("p",null,[s("能用的api都在源码里的"),n("a",I,[s("lua文档"),e(a)]),s("，首先通读一遍，之后还要读很多遍。至于函数具体传参和返回值，很多只能参考具体脚本和源码。")]),T,n("p",null,[s("有个叫demux的模块，用于提取轨道， "),n("a",G,[s("ParseSubRip"),e(a)]),s(" 这个c函数名字非常直观地表明了它是用来处理srt格式字幕的，但是没找到lua怎么用。")]),P,n("p",null,[s("strack为啥在lua扩展里 传入libvlc_command()，提示找不到此命令呢？ 看一下源码里怎么用的。最新源码直接用vlc.player.get_spu_tracks()了，但是旧版没这个,用的是vlc.var.get()和get_list() "),n("a",R,[s("参考intf的cli中的strack"),e(a)])]),S,n("ul",null,[n("li",null,[n("p",null,[n("a",W,[s("extension.c"),e(a)]),s("中，貌似只有zip类型才能有调用系统module, 否则只能调用同目录下自己写的")])]),n("li",null,[z,A,n("p",null,[s("为什么能用这个模块，是因为在"),n("a",F,[s("makefile"),e(a)]),s("里有声明？")])])]),J,n("p",null,[n("a",O,[s("脚本内容"),e(a)]),s("（仅测试于vlc3.0.16, 现在3.0.21或者4.0不支持了）")])])}const Y=o(h,[["render",U],["__file","index.html.vue"]]),Z=JSON.parse('{"path":"/blogs/2024/11/02-vlc-extensions-subtitles-overview/","title":"vlc 扩展编写 字幕浏览器","lang":"zh-CN","frontmatter":{"date":"2024-11-02 11:22","title":"vlc 扩展编写 字幕浏览器","categories":["linux","软件使用"],"tags":["vlc","linux","ffmpeg","扩展","字幕"]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"基本","slug":"基本","link":"#基本","children":[{"level":3,"title":"约定回调","slug":"约定回调","link":"#约定回调","children":[]},{"level":3,"title":"日志输出（vlc.msg.dbg()","slug":"日志输出-vlc-msg-dbg","link":"#日志输出-vlc-msg-dbg","children":[]},{"level":3,"title":"获取当前播放媒体","slug":"获取当前播放媒体","link":"#获取当前播放媒体","children":[]},{"level":3,"title":"执行终端命令","slug":"执行终端命令","link":"#执行终端命令","children":[]},{"level":3,"title":"var","slug":"var","link":"#var","children":[]},{"level":3,"title":"参考别人插件","slug":"参考别人插件","link":"#参考别人插件","children":[]}]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]},{"level":2,"title":"方法一（失败）","slug":"方法一-失败","link":"#方法一-失败","children":[]},{"level":2,"title":"方法二（不完美）","slug":"方法二-不完美","link":"#方法二-不完美","children":[{"level":3,"title":"ffmpeg读取及提取","slug":"ffmpeg读取及提取","link":"#ffmpeg读取及提取","children":[]},{"level":3,"title":"vlc 对话框","slug":"vlc-对话框","link":"#vlc-对话框","children":[]},{"level":3,"title":"lua模块加载","slug":"lua模块加载","link":"#lua模块加载","children":[]},{"level":3,"title":"lua基本语法","slug":"lua基本语法","link":"#lua基本语法","children":[]},{"level":3,"title":"最终成果","slug":"最终成果","link":"#最终成果","children":[]}]}],"git":{"createdTime":1730551436000,"updatedTime":1730626217000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":2}]},"filePathRelative":"blogs/2024/11/02-vlc-extensions-subtitles-overview/index.md"}');export{Y as comp,Z as data};
