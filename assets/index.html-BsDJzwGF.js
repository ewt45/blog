import{_ as p,r as i,o as t,c,a as s,d as a,b as l,e as n}from"./app-DMogTwpC.js";const o={},r=s("h2",{id:"前言",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#前言"},[s("span",null,"前言")])],-1),d={href:"https://docs.mesa3d.org/meson.html",target:"_blank",rel:"noopener noreferrer"},u=n(`<h2 id="_1-编译流程与结果测试" tabindex="-1"><a class="header-anchor" href="#_1-编译流程与结果测试"><span>1 编译流程与结果测试</span></a></h2><h3 id="_1-1-meson构建系统" tabindex="-1"><a class="header-anchor" href="#_1-1-meson构建系统"><span>1.1 meson构建系统</span></a></h3><p>mesa3d使用meson作为构建系统。其作用是检查编译环境/依赖是否符合条件，更改配置参数。</p><p>执行meson命令时一般都是在源码根目录下。</p><p><strong>生成一个基础的构建目录</strong><br><code>meson setup 构建目录</code></p><ul><li>构建目录用于保存本次构建的配置，编译后的文件也存在这里。</li><li>个构建目录彼此独立，互不干扰。</li></ul><p><strong>修改构建参数</strong><br><code>meson configure 构建目录 参数</code></p><ul><li>当构建目录已经存在时，想要修改参数可以使用<code>configure</code>。参数格式为<code>-Dkey=value</code>, <code>-D</code>后有没有空格都行。<code>value</code>中，数组的多个值用逗号隔开，空数组用中括号或啥也不写。</li><li>不带任何参数执行 <code>meson configure 构建目录</code> 即可查看全部可设置的参数及其当前值。旧版是直接打印全部内容然后退出。最新版mesa(24的)的话是需要手动按方向键往上下滚动显示，按<code>q</code>退出。</li></ul><p><strong>编译阶段</strong><br><code>ninja -C 构建目录 [install]</code></p><ul><li>这是真正开始编译了。</li><li>如果带<code>install</code>，就会在编译后将需要导出的文件安装到某个目录下，可以在配置阶段通过<code>-D prefix=</code>进行设置。</li></ul><h3 id="_1-2-turnip编译参数" tabindex="-1"><a class="header-anchor" href="#_1-2-turnip编译参数"><span>1.2 turnip编译参数</span></a></h3><p>根据alex的教程，参数大概长这样。编译时有1800多条。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">meson configure build-turnip/ <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">prefix</span><span class="token operator">=</span>/root/mesa <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">buildtype</span><span class="token operator">=</span>release <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">dri3</span><span class="token operator">=</span>enabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">egl</span><span class="token operator">=</span>enabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">platforms</span><span class="token operator">=</span>x11 <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> gallium-drivers<span class="token operator">=</span>swrast,virgl,zink,freedreno <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> vulkan-drivers<span class="token operator">=</span>freedreno <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">opengl</span><span class="token operator">=</span>false <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">glx</span><span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">osmesa</span><span class="token operator">=</span>true <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">gles1</span><span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">gles2</span><span class="token operator">=</span>enabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">glvnd</span><span class="token operator">=</span>true <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">libunwind</span><span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> shared-glapi<span class="token operator">=</span>enabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> microsoft-clc<span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">valgrind</span><span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> freedreno-kmds<span class="token operator">=</span>kgsl</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>又自己精简了一下，变为1100多条。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line">meson configure build-turnip/ <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">prefix</span><span class="token operator">=</span>/root/mesa <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">buildtype</span><span class="token operator">=</span>release <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">dri3</span><span class="token operator">=</span>enabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">platforms</span><span class="token operator">=</span>x11 <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> gallium-drivers<span class="token operator">=</span>freedreno <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> vulkan-drivers<span class="token operator">=</span>freedreno <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> freedreno-kmds<span class="token operator">=</span>kgsl <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">opengl</span><span class="token operator">=</span>false <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">glx</span><span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">osmesa</span><span class="token operator">=</span>false <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">egl</span><span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">gles1</span><span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">gles2</span><span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">glvnd</span><span class="token operator">=</span>false <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">libunwind</span><span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> shared-glapi<span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> microsoft-clc<span class="token operator">=</span>disabled <span class="token punctuation">\\</span></span>
<span class="line"><span class="token parameter variable">-D</span> <span class="token assign-left variable">valgrind</span><span class="token operator">=</span>disabled</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-编译成功后测试vulkan" tabindex="-1"><a class="header-anchor" href="#_1-3-编译成功后测试vulkan"><span>1.3 编译成功后测试vulkan</span></a></h3><p>两个环境变量。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">VK_ICD_FILENAMES</span><span class="token operator">=</span><span class="token variable">$prefix</span>/share/vulkan/icd.d/freedreno_icd.aarch64.json</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">MESA_VK_WSI_DEBUG</span><span class="token operator">=</span>sw</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>VK_ICD_FILENAMES</code> 用于指定vulkan类型。我们将其指定为freedreno，即turnip。 <ul><li>实际上这个已经被废弃了，推荐用的是<code>VK_DRIVER_FILES</code>，但不确定新的是什么时候加上的，所以还是先用旧的了。</li><li><code>$prefix</code>请替换为实际有意义的值。默认是<code>/usr</code>，但这个是全局生效的路径，所以一般在测试自己编译的文件时，会在配置构建阶段 通过参数<code>-D prefix=xxx</code> 指定一个别的路径，例如我上面提供的编译参数指定的路径为<code>/root/mesa</code>。</li></ul></li><li><code>MESA_VK_WSI_DEBUG</code> 最开始alex研究turnip+dxvk的时候，就要将这个变量的值设为<code>sw</code>才能正常使用vulkan。后来好像xmem写了一个补丁，可以不用这个参数也能正常运行。我把这个给忘了，结果白折腾好几天。</li></ul><p>然后确保x11环境正常，能正常打开x11应用。（启动termux-x11，导出环境变量DISPLAY=:n）。</p><p>安装测试工具<code>apt install vulkan-tools</code></p><p>运行<code>vulkaninfo</code>，应该会正常输出一堆信息。</p><p>运行<code>vkcube</code>，应该会正常显示图形画面。</p><h2 id="_2-在不同平台上进行编译" tabindex="-1"><a class="header-anchor" href="#_2-在不同平台上进行编译"><span>2 在不同平台上进行编译</span></a></h2><h3 id="_2-1-x86-64电脑" tabindex="-1"><a class="header-anchor" href="#_2-1-x86-64电脑"><span>2.1 x86_64电脑</span></a></h3><p>正好有一台装了ubuntu22的笔记本。拿来编译x86_64的turnip，没啥问题。但是想要编译手机上用的（proot环境），就得编译arm64架构的。</p><p>虽然meson支持交叉编译，但是那个配置文件我是在搞不明白。所以干脆用arm64的rootfs，qemu提供转译支持就行了。这样相当于本地编译，缺点是速度奇慢。</p><p>借助docker来完成。</p>`,28),v=s("li",null,"新建一个空文件夹作为工作目录，进入。",-1),m={href:"https://gitlab.freedesktop.org/mesa/mesa/-/tags",target:"_blank",rel:"noopener noreferrer"},k=s("code",null,"mesa",-1),b=s("code",null,"meson_options.txt",-1),g=n(`<li>创建<code>Dockerfile</code>文件。内容如下<div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile" data-title="Dockerfile"><pre class="language-Dockerfile"><code><span class="line">FROM arm64v8/ubuntu:24.04 As dev-image</span>
<span class="line">WORKDIR /root</span>
<span class="line"># 为了能apt build-dep需要添加deb-src。不确定security添加了src会不会有问题，但也不知道怎么排除。</span>
<span class="line">RUN sed -i &#39;s/Types: deb/Types:deb deb-src/g&#39; /etc/apt/sources.list.d/ubuntu.sources \\</span>
<span class="line">&amp;&amp; apt update \\</span>
<span class="line">&amp;&amp; apt-get build-dep mesa -y \\</span>
<span class="line">&amp;&amp; apt install -y cbindgen python3-certifi python3-pycparser</span>
<span class="line"># mesa源码</span>
<span class="line">COPY mesa mesa-source</span>
<span class="line"># 配置构建目录。手动复制drm头文件</span>
<span class="line">RUN cp -r /usr/include/drm/* /usr/include \\</span>
<span class="line">&amp;&amp; cd mesa-source \\</span>
<span class="line">&amp;&amp; meson setup build-turnip/ \\</span>
<span class="line">-D prefix=/root/mesa \\</span>
<span class="line">-D buildtype=release \\</span>
<span class="line">-D dri3=enabled \\</span>
<span class="line">-D platforms=x11 \\</span>
<span class="line">-D gallium-drivers=freedreno \\</span>
<span class="line">-D vulkan-drivers=freedreno \\</span>
<span class="line">-D freedreno-kmds=kgsl \\</span>
<span class="line">-D opengl=false \\</span>
<span class="line">-D glx=disabled \\</span>
<span class="line">-D osmesa=false \\</span>
<span class="line">-D egl=disabled \\</span>
<span class="line">-D gles1=disabled \\</span>
<span class="line">-D gles2=disabled \\</span>
<span class="line">-D glvnd=false \\</span>
<span class="line">-D libunwind=disabled \\</span>
<span class="line">-D shared-glapi=disabled \\</span>
<span class="line">-D microsoft-clc=disabled \\</span>
<span class="line">-D valgrind=disabled \\</span>
<span class="line"># 开始编译</span>
<span class="line">&amp;&amp; ninja -C build-turnip/ \\</span>
<span class="line"># 编译好后安装，收尾工作（例如创建符号链接）</span>
<span class="line">&amp;&amp; ninja -C build-turnip/ install</span>
<span class="line"></span>
<span class="line"># 导出编译后的文件</span>
<span class="line">FROM scratch AS out-image</span>
<span class="line">COPY --from=dev-image /root/mesa /root/mesa</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>稍微解释一下 <ul><li><code>FROM arm64v8/ubuntu:24.04</code> 指定基础镜像。这个是官方提供的，可以在hub上找到：https://hub.docker.com/r/arm64v8/ubuntu/</li><li><code>sed -i &#39;s/Types: deb/Types:deb deb-src/g&#39; /etc/apt/sources.list.d/ubuntu.sources</code> 由于需要<code>apt build-dep</code>下载构建时依赖，所以需要修改apt源，在原有<code>deb</code>基础上添加<code>deb-src</code>。ubuntu24改了apt源的文件和语法要注意下。</li><li>然后就是常规的安装依赖，复制mesa源码到镜像内，开始构建。由于部分旧版本会有无法找到drm头文件的问题，所以手动复制一下。</li><li><code>FROM scratch AS out-image</code> scratch表示一个空的镜像，什么都没有。<code>As</code>后为该镜像的别名。由于我想在构建后自动导出文件，所以需要在<code>docker build</code>命令加上参数<code>--output</code>，但该参数只能导出完整镜像，所以要另起一个阶段，仅把所需文件复制进去。</li><li><code>COPY --from=dev-image /root/mesa /root/mesa</code> 将编译好的文件复制到空镜像中准备导出。<code>--from</code>指定了复制哪个镜像的文件。第一个路径是原镜像中位置，第二个是新镜像中位置。这里保留了目录结构，因为icd文件中要用到。</li></ul></li><li>启动qemu-static，注册binfmt。这样当所执行程序无法本地运行时，就会自动使用qemu来运行。<br><code>docker run --rm --privileged multiarch/qemu-user-static --reset -p yes</code></li><li>开始docker构建阶段。<br><code>docker build --output type=tar,dest=mesa-turnip.tar --target=out-image .</code><ul><li><code>--output</code> 指定构建结束后，导出镜像到指定路径，而非保存为docker的普通镜像。</li><li><code>type</code>可以指定local或tar，tar就是打包成一个文件，默认是local。</li><li><code>dest</code>是在宿主机中的路径。这里存为当前目录下的<code>mesa-turnip.tar</code>。</li><li><code>--target</code>指定要导出哪个阶段的镜像。指定的名称为Dockerfile中<code>AS</code>设置的别名。</li></ul></li>`,3),h=n('<p>经过三个小时（docker提示是11382s），终于构建完成。</p><h3 id="_2-2-termux-proot" tabindex="-1"><a class="header-anchor" href="#_2-2-termux-proot"><span>2.2 termux proot</span></a></h3><p>借助proot-distro安装ubuntu24</p><p>由于手机本身就是arm架构，所以不用交叉编译了，终于不用忍受慢吞吞的qemu。</p><p>编译流程还是和在电脑上一样的。参考Dockerfile中RUN的内容即可。</p><div class="custom-container info"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">INFO</p><p>最好环境变量PATH里去掉termux的bin路径，否则一些程序可能会调用成termux而非proot内linux的，如llvm。</p></div><h3 id="_2-3-github-action" tabindex="-1"><a class="header-anchor" href="#_2-3-github-action"><span>2.3 github action</span></a></h3><p>本地空间比较紧张，不如让github来代劳。</p>',8),f={href:"https://github.com/docker/setup-qemu-action",target:"_blank",rel:"noopener noreferrer"},_=n(`<p>可以在workflow_dispatch中开启inputs，以便自定义输入内容。可以用来灵活设置mesa版本号。</p><ol><li><p>在仓库内新建<code>mesa-turnip/Dockerfile-linux-arm64</code>文件，内容就是上面电脑编译时的<code>Dockerfile</code>的内容。</p></li><li><p>新建workflow文件并运行，等待完成即可。</p></li></ol><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> turnip驱动</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">inputs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">mesa-version</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">          e.g. mesa-24.1.1  </span>
<span class="line">          https://gitlab.freedesktop.org/mesa/mesa/-/tags</span></span>
<span class="line">        <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">        <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token string">&#39;mesa-23.2.1&#39;</span></span>
<span class="line">        <span class="token key atrule">type</span><span class="token punctuation">:</span> string</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">linux-arm64</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">24.04</span></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 克隆仓库</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line">        </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 重命名Dockerfile</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> mv mesa<span class="token punctuation">-</span>turnip/Dockerfile<span class="token punctuation">-</span>linux<span class="token punctuation">-</span>arm64 Dockerfile</span>
<span class="line">      </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 下载mesa源码</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">        wget https://gitlab.freedesktop.org/mesa/mesa/-/archive/\${{ inputs.mesa-version }}/mesa-\${{ inputs.mesa-version }}.tar.gz</span>
<span class="line">        tar xf mesa-\${{ inputs.mesa-version }}.tar.gz</span>
<span class="line">        mv mesa-\${{ inputs.mesa-version }} mesa</span></span>
<span class="line">        </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 使用action设置docker qemu <span class="token comment">#（不需要自己手动放qemu了）</span></span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/setup<span class="token punctuation">-</span>qemu<span class="token punctuation">-</span>action@v3</span>
<span class="line">      </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> docker开始构建</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> docker build <span class="token punctuation">-</span><span class="token punctuation">-</span>output type=tar<span class="token punctuation">,</span>dest=mesa<span class="token punctuation">-</span>turnip.tar <span class="token punctuation">-</span><span class="token punctuation">-</span>target=out<span class="token punctuation">-</span>image .</span>
<span class="line">        </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 上传artifact</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v4.3.3</span>
<span class="line">      <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">name</span><span class="token punctuation">:</span> turnip<span class="token punctuation">-</span>linux<span class="token punctuation">-</span>arm64<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> inputs.mesa<span class="token punctuation">-</span>version <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token key atrule">path</span><span class="token punctuation">:</span> mesa<span class="token punctuation">-</span>turnip.tar</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function x(D,y){const e=i("ExternalLinkIcon");return t(),c("div",null,[r,s("p",null,[s("a",d,[a("mesa3d官网 编译说明"),l(e)])]),u,s("ol",null,[v,s("li",null,[a("下载"),s("a",m,[a("mesa源码"),l(e)]),a("，解压，并将文件夹重命名为"),k,a("。进入mesa文件夹后应该存在"),b,a("。")]),g]),h,s("p",null,[a("github运行的系统也是x86架构的。所以还是和电脑上编译一个思路，用docker+qemu运行arm的镜像。docker提供了一个"),s("a",f,[a("action"),l(e)]),a("，可以用来开启qemu支持。")]),_])}const R=p(o,[["render",x],["__file","index.html.vue"]]),q=JSON.parse('{"path":"/blogs/2024/06/08-mesa3d-turnip-linux_arm64/","title":"编译安卓PRoot用的turnip（linux_arm64架构）","lang":"zh-CN","frontmatter":{"date":"2024-6-8 20:20:50","title":"编译安卓PRoot用的turnip（linux_arm64架构）","categories":["android","编译"],"tags":["android","termux","mesa","proot","turnip"]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"1 编译流程与结果测试","slug":"_1-编译流程与结果测试","link":"#_1-编译流程与结果测试","children":[{"level":3,"title":"1.1 meson构建系统","slug":"_1-1-meson构建系统","link":"#_1-1-meson构建系统","children":[]},{"level":3,"title":"1.2 turnip编译参数","slug":"_1-2-turnip编译参数","link":"#_1-2-turnip编译参数","children":[]},{"level":3,"title":"1.3 编译成功后测试vulkan","slug":"_1-3-编译成功后测试vulkan","link":"#_1-3-编译成功后测试vulkan","children":[]}]},{"level":2,"title":"2 在不同平台上进行编译","slug":"_2-在不同平台上进行编译","link":"#_2-在不同平台上进行编译","children":[{"level":3,"title":"2.1 x86_64电脑","slug":"_2-1-x86-64电脑","link":"#_2-1-x86-64电脑","children":[]},{"level":3,"title":"2.2 termux proot","slug":"_2-2-termux-proot","link":"#_2-2-termux-proot","children":[]},{"level":3,"title":"2.3 github action","slug":"_2-3-github-action","link":"#_2-3-github-action","children":[]}]}],"git":{"createdTime":1718089573000,"updatedTime":1718089573000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":1}]},"filePathRelative":"blogs/2024/06/08-mesa3d-turnip-linux_arm64/index.md"}');export{R as comp,q as data};
