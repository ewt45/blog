import{_ as p,r as t,o,c as i,a as s,b as a,w as e,e as c,d as l}from"./app-DMogTwpC.js";const r="/assets/1-D4PMlhA3.png",d="/assets/2-6WaRXPD4.png",u="/assets/3-CuotAHC_.png",k={},m={class:"table-of-contents"},b=c('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>有个exagear群友问我能不能做一个锁定gpu最大频率的功能，像yuzu等模拟器那样。</p><p><img src="'+r+`" alt="图1"></p><p>去github看了一下源码，发现核心是调用了一个叫<code>adrenotools_set_turbo(bool);</code>的函数。该函数属于另外一个项目<code>libadrenotrools</code>，该项目的作者是bylaws，ns模拟器skyline开发者之一。</p><p>本文记录了android studio + cmake 编译该项目，并在无root情况下观察gpu频率。</p><h2 id="libadrenotools介绍" tabindex="-1"><a class="header-anchor" href="#libadrenotools介绍"><span>libadrenotools介绍</span></a></h2><p>项目地址：https://github.com/bylaws/libadrenotools</p><p>根据readme，这个项目可以让应用免root加载自定义的驱动（如turnip）。设备要求为android 9+, arm64. 锁定gpu最高频率可能只是顺带的一个小功能了，不过我们就需要这个。</p><p>观察<code>adrenotools_set_turbo</code>函数内容，发现貌似就是向<code>/dev/kgsl-3d0</code>设备写了一个属性值。这样一来——</p><ul><li>既然修改的不是应用自身的属性，而是设备的属性，那么就应该在任何地方修改一次，对全部应用生效（不了解linux，也许不是这样）</li><li>真的有效吗？搜索得到的root下修改cpu gpu频率的方法：https://zhuanlan.zhihu.com/p/84283694，其中提到了锁定gpu频率之前，需要修改几个额外的属性，否则修改最高频率后可能会被系统自动降频。但adrenotools只改了一个属性<code>KGSL_PROP_PWRCTRL</code>，值是true或false。</li></ul><h2 id="编译为可执行文件" tabindex="-1"><a class="header-anchor" href="#编译为可执行文件"><span>编译为可执行文件</span></a></h2><p>如何在exagear中使用这个功能？一般想在apk中执行c++代码，会添加一个native的java函数，该函数的实现在c++中，调用在java中。但是adrenotools要求64位，exa只有32位so，所以不能写成native函数了，需要做成linux那样的可执行文件，在终端即可运行。</p><p>对c++实在是不熟悉，可以算是第一次写cmake了。一开始想在linux编译，无奈不会用ndk，只好在windows上用android studio帮我编译了。</p><ol><li><p>用github desktop下载libadrenotools项目 https://github.com/bylaws/libadrenotools ，可以自动处理子项目依赖（.gitmodules）<br> 下载后将libadrenotools文件夹移动到 安卓项目\\app\\src\\main\\cpp中</p></li><li><p>按照安卓开发说明，添加CMakeLists.txt（添加过程略）。</p><p>app/CMakeLists.txt中加入以下内容。<br> 其中最主要的就是add_executable，将代码编译为可执行文件，运行时自动执行main函数。一般用native java函数这种方式，都是add_library 编译为动态链接库（apk/lib中的那些so）</p><div class="language-cmake line-numbers-mode" data-ext="cmake" data-title="cmake"><pre class="language-cmake"><code><span class="line"><span class="token keyword">set</span><span class="token punctuation">(</span>libadrenotools_DIR src/main/cpp/libadrenotools<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">set</span><span class="token punctuation">(</span>libadrenotools_build_DIR src/main/cpp/libadrenotools/build<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">#引入头文件路径</span></span>
<span class="line"><span class="token keyword">include_directories</span><span class="token punctuation">(</span><span class="token punctuation">\${</span>libadrenotools_DIR<span class="token punctuation">}</span>/include/adrenotools<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">#只支持arm64-v8a</span></span>
<span class="line"><span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">\${</span><span class="token variable">CMAKE_ANDROID_ARCH_ABI</span><span class="token punctuation">}</span> <span class="token operator">STREQUAL</span> arm64-v8a<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">add_subdirectory</span><span class="token punctuation">(</span><span class="token punctuation">\${</span>libadrenotools_DIR<span class="token punctuation">}</span> <span class="token punctuation">\${</span>libadrenotools_build_DIR<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">#生成可执行文件而不是.so，这样可以通过子进程直接运行</span></span>
<span class="line">    <span class="token keyword">add_executable</span><span class="token punctuation">(</span>gpulock-lock-exe src/main/cpp/gpuclock-lock.c<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">#链接库，否则函数无法调用。这个adrenotools是在其自己的cmakelists中定义的名字</span></span>
<span class="line">    <span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span>gpulock-lock-exe adrenotools<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建 src/main/cpp/gpuclock-lock.c</p><p>很简单的函数，如果不传入参数就是关闭，传入参数就是开启。</p><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span></span>
<span class="line"><span class="token comment">//在cmake里添加了头文件路径</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;driver.h&quot;</span></span></span>
<span class="line"><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    bool enable <span class="token operator">=</span> argc<span class="token operator">&gt;</span><span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;going through main method...boost %s&quot;</span><span class="token punctuation">,</span>enable<span class="token operator">?</span><span class="token string">&quot;enable&quot;</span><span class="token operator">:</span><span class="token string">&quot;disable&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">adrenotools_set_turbo</span><span class="token punctuation">(</span>enable<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>app模块的build.gradle，添加架构支持</p><div class="language-gradle line-numbers-mode" data-ext="gradle" data-title="gradle"><pre class="language-gradle"><code><span class="line">android<span class="token punctuation">.</span>defaultConfig<span class="token punctuation">.</span>ndk<span class="token punctuation">.</span>abiFilters <span class="token string">&#39;arm64-v8a&#39;</span></span>
<span class="line"><span class="token comment">// 标注CMakeLists.txt位置，我放在了app模块根目录，即与gradle同目录</span></span>
<span class="line">android<span class="token punctuation">.</span>externalNativeBuild<span class="token punctuation">.</span>cmake<span class="token punctuation">.</span>path <span class="token interpolation-string"><span class="token string">&quot;CMakeLists.txt&quot;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>然后构建apk就行了，构建后生成的可执行文件存在刚才cmakelist中记录的位置 <code>src/main/cpp/libadrenotools/build</code><br> 生成的文件除了gpulock-lock-exe以外还有4个so，不知道是干啥的反正都留着了。</p></li></ol><h2 id="测试结果" tabindex="-1"><a class="header-anchor" href="#测试结果"><span>测试结果</span></a></h2><p>提供一个编译好的文件：https://wwqv.lanzout.com/i3Jvj15wmjyj</p><p>解压到termux home目录中，授予执行权限并执行</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token comment">#为解压后的文件夹内全部文件添加可执行权限</span></span>
<span class="line"><span class="token function">chmod</span> <span class="token parameter variable">-R</span> +x kgsl </span>
<span class="line"><span class="token comment">#进入文件夹中</span></span>
<span class="line">./gpulock-lock-exe <span class="token comment"># 关闭</span></span>
<span class="line">./gpulock-lock-exe <span class="token number">1</span> <span class="token comment"># 开启</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行是没有报错了，但具体生没生效不知道。无root下查看gpu频率的方法也很稀缺，最后找到了一个高通官方的监测软件 Snapdragon Profiler https://developer.qualcomm.com/software/snapdragon-profiler ，可以无root监测gpu频率。注册一个账号即可下载。</p><p>按照教程连接手机即可。help-documentation 可以查看pdf帮助文档。</p><p>点击Start a Session 连接手机，点击 Realtime Performance Analysis 进入实时监测界面，界面左侧下方的列表，选 System - GPU General - Clocks/Second ,双击即可添加到右侧显示区域。</p><p><img src="`+d+'" alt="图2"></p><p>如图所示，黄色圆圈的位置显示的应该就是gpu频率，上面是历史最大频率，下面是平均频率，大概这样。但很可惜，不管是开启还是关闭，这两个数值都不是我的处理器（骁龙865，高通650）的最大频率 587M</p><p>然而如果在Start Page 选择 System Trace Analysis，抓取历史最多十秒的gpu频率记录，开启时就是最高频率 587M，关闭时则低于这个数值。</p><p><img src="'+u+'" alt="图3"></p><hr><p>结论：</p><ul><li>设备要求：高通gpu，安卓9+，arm64环境</li><li>测试结果存疑。实时监测 显示gpu没有达到最高频率，抓取历史十秒记录 显示gpu达到最高频率。</li><li>目前接到的几个测试结果： <ul><li>root的手机，用软件检测gpu频率是最高。</li><li>测试1：对游戏帧数提升没有，但是发热明显降低。</li><li>测试2：游戏帧数反而降低。</li></ul></li></ul>',28);function v(g,h){const n=t("router-link");return o(),i("div",null,[s("nav",m,[s("ul",null,[s("li",null,[a(n,{to:"#前言"},{default:e(()=>[l("前言")]),_:1})]),s("li",null,[a(n,{to:"#libadrenotools介绍"},{default:e(()=>[l("libadrenotools介绍")]),_:1})]),s("li",null,[a(n,{to:"#编译为可执行文件"},{default:e(()=>[l("编译为可执行文件")]),_:1})]),s("li",null,[a(n,{to:"#测试结果"},{default:e(()=>[l("测试结果")]),_:1})])])]),b])}const x=p(k,[["render",v],["__file","index.html.vue"]]),f=JSON.parse('{"path":"/blogs/2023/summer/adrenoGpuTurbo/","title":"高通gpu免root锁定最高频率（adrenotools）","lang":"zh-CN","frontmatter":{"date":"2023-8-20 17:00:32","title":"高通gpu免root锁定最高频率（adrenotools）","categories":["技术","调试"],"tags":["libadrenotools","高通gpu"]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"libadrenotools介绍","slug":"libadrenotools介绍","link":"#libadrenotools介绍","children":[]},{"level":2,"title":"编译为可执行文件","slug":"编译为可执行文件","link":"#编译为可执行文件","children":[]},{"level":2,"title":"测试结果","slug":"测试结果","link":"#测试结果","children":[]}],"git":{"createdTime":1692532195000,"updatedTime":1692589466000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":4}]},"filePathRelative":"blogs/2023/summer/adrenoGpuTurbo/index.md"}');export{x as comp,f as data};
