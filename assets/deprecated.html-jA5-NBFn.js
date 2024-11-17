import{_ as c,r as l,o,c as u,a as n,b as a,w as t,d as s,e as i}from"./app-DMogTwpC.js";const r={},k={class:"table-of-contents"},d=i('<h2 id="_1-利用现成代码-修改手头上的apk" tabindex="-1"><a class="header-anchor" href="#_1-利用现成代码-修改手头上的apk"><span>1 利用现成代码，修改手头上的apk</span></a></h2><h3 id="_1-1-修改之前要了解的知识" tabindex="-1"><a class="header-anchor" href="#_1-1-修改之前要了解的知识"><span>1.1 修改之前要了解的知识</span></a></h3><h4 id="_1-1-1-本文可能不会详细讲的知识" tabindex="-1"><a class="header-anchor" href="#_1-1-1-本文可能不会详细讲的知识"><span>1.1.1 本文可能不会详细讲的知识</span></a></h4><ul><li>打包数据包</li><li>dex/smali修改基础知识</li></ul><h4 id="_1-1-2-不同版本的wine如何在linux上共存" tabindex="-1"><a class="header-anchor" href="#_1-1-2-不同版本的wine如何在linux上共存"><span>1.1.2 不同版本的wine如何在linux上共存？</span></a></h4>',5),m=n("li",null,"测试的环境：VirtualBox+Ubuntu Server 18 i386。32位ubuntu18是官网找的netboot镜像mini.iso。",-1),v={href:"https://askubuntu.com/a/1193281",target:"_blank",rel:"noopener noreferrer"},g={href:"https://wiki.winehq.org/FAQ#Can_I_install_more_than_one_Wine_version_on_my_system.3F",target:"_blank",rel:"noopener noreferrer"},b={href:"https://wiki.winehq.org/Ubuntu#Notes",target:"_blank",rel:"noopener noreferrer"},h=n("hr",null,null,-1),x=n("li",null,"winehq官网deb包的安装位置都是默认的/usr/bin，也就是说安装后wine执行文件的绝对路径是/usr/bin/wine，如果安装第二个版本，它还是安到这个路径覆盖上一个版本。解决办法是，要么自己下载源码编译，编译前自己指定一个安装路径，编译好安装到自定义的目录再运行，要么编译之后不安装，直接从编译后的目录运行。",-1),_={href:"https://dl.winehq.org/wine-builds/ubuntu/dists/bionic/main/binary-i386/",target:"_blank",rel:"noopener noreferrer"},w=n("code",null,"/usr/wines/wine6.0.4/opt/wine-stable/bin/wine winecfg",-1),f=n("li",null,"此时wine可能无法正常启动，因为可能缺少依赖库。最简单的办法，就是反正已经有deb了，先dpkg安装一遍，遇到依赖报错就apt install -f补全缺失的依赖，直到能安装成功，就可以卸载了=-=。",-1),C=n("li",null,"然后测试能正常打开winecfg和植物大战僵尸年度版，就没照着参考教程1里设置LD_LIBRARY_PATH了，不确定是否有其他影响。",-1),L=n("li",null,[s("如果想添加另一个版本的wine，一样只需下载两个deb包，解压，使用绝对路径启动wine即可。 "),n("hr")],-1),j=i(`<ul><li>WINEPREFIX：在启动wine时可以使用该参数指定虚拟windows系统安装的路径，默认在/home/user/.wine。使用不同版本wine的时候最好分别指定不同的WINEPREFIX。这个文件夹exagear也会用于创建新容器时添加预设内容，所以应注意一下。</li></ul><h4 id="_1-1-3-exagear启动wine的流程" tabindex="-1"><a class="header-anchor" href="#_1-1-3-exagear启动wine的流程"><span>1.1.3 exagear启动wine的流程？</span></a></h4><ul><li>使用jadx反编译dex，查看java代码。</li></ul><ol><li>ManageContainersFragment类 <ul><li>是一个fragment类，用于显示容器管理界面。其重写的父类的方法onCreateOptionsMenu()用于初始化右上角的新建容器按钮。</li><li>包含内部类ContAsyncTask，用于执行创建/复制/删除容器的具体操作。创建容器时，会调用GuestContainersManager.cloneContainer()。</li></ul></li><li>GuestContainersManager类<br> initNewContainer()方法用于创建容器，主要看它的内容。 <ol><li>新建一个容器，容器目录为内部files/image/home/xdroid_n，n从1开始。其中内部files/image为linux系统所在目录，后面省略。</li><li>把/opt/guestcont-pattern里的文件复制到容器目录下。guestcont-pattern里有.wine文件夹，是WINEPREFIX路径。</li><li>把opt/recipe/run/simple.sh 复制到容器目录/.wine/run.sh。</li><li>填写容器设置的sharedpreference。调用GuestContainerConfig.loadDefaults()或cloneContainerConfig()，sharePref命名格式为 包名.CONTAINER_CONFIG_n.xml</li><li>容器序号+1，新容器添加到容器数组中</li></ol></li><li>StartGuest类<br> 看完了创建容器的过程，再看一下启动容器的过程。 <ol><li>有几个构造函数，传入参数为InstallApp/RunXDGLink/RunExplorer。后两个是从“桌面”界面启动和从“容器”界面启动，第一个也许是从“开始菜单”启动？没见过，主要看从“容器”界面启动的吧。</li><li>public StartGuest(RunExplorer runExplorer)构造函数中，初始化成员变量。有一个字符串很明显是调用wine的语句<code>this.mExeArgv.addAll(Arrays.asList(getRecipeGuestPath(&quot;run/simple.sh&quot;), &quot;eval \\&quot;wine /opt/exec_wrapper.exe /opt/TFM.exe D:/\\&quot;&quot;));</code>。这个eval后面跟着的字符串wine+程序名就是启动容器时执行的命令，然后进入容器后就会打开对应程序。</li><li>execute()函数是真正执行操作的函数，这里会读取容器设置的sharedPreference，并且根据这些设置参数，启动容器。无论用哪个构造函数，最后都会调用此方法。</li><li>启动时会创建/home/xdroid到xdroid_n的链接，这样不管启动哪个容器，WINEPREFIX直接设置为/home/xdroid即可。</li></ol></li></ol><h3 id="_1-2-需要修改的地方有" tabindex="-1"><a class="header-anchor" href="#_1-2-需要修改的地方有"><span>1.2 需要修改的地方有？</span></a></h3><ul><li>首先考虑wine在u18上的共存。其实非常简单，只需解压安装包到任意目录即可。唯一的要求就是使用绝对路径调用wine。非强制性要求是为不同版本wine指定不同的WINEPREFIX路径。</li><li>然后考虑exagear对多版本wine的识别。根据上面所说的，其实需要修改的地方就是StartGuest中调用wine的那个命令行，从相对路径wine改为绝对路径（自己解压的位置），就能正常启动容器了。</li><li>由于每个容器存放在xdroid_n文件夹下，所以WINEPREFIX自然是不同的，不需要我们手动指定。但是要注意一点，在创建容器时是会复制一个文件夹/opt/guestcont-pattern到WINEPREFIX下的，这个pattern文件夹相当于预设容器，用于配置一些预设内容来替代wine默认的配置。由于有些d3d好像仅支持某些版本的wine，所以也应修改代码以支持根据wine版本复制不同的pattern文件夹。</li></ul><h3 id="_1-3-设计方案" tabindex="-1"><a class="header-anchor" href="#_1-3-设计方案"><span>1.3 设计方案</span></a></h3><ol><li>在创建容器时，点击加号应该弹出wine版本选项以供用户选择。注意那个加号已经是一个菜单项而不是按钮，所以没法简单地用PopupMenu。</li><li>用户点击对应wine版本创建容器，程序应该根据版本记录对应的wine执行路径，以便启动容器时的eval可以正确调用wine。由于每个容器都有各自的wine执行路径，而exagear本身就创建了每个容器设置的SharedPref xml，不如直接将该信息记录到容器设置的xml中。</li><li>用户启动容器（仅考虑从“容器”界面启动的情况），程序应该从容器设置xml中读取wine执行程序的绝对路径以代替eval中的“wine”。</li><li>代码添加完成之后，应保证在修改者添加一个新版本wine时操作尽量简便，即仅需最少量的修改dex，arsc，xml的操作。思路：在apk/assets/WinesVersionInfo.txt中记录全部wine版本，在用户点击加号时读取该txt中的内容并动态创建菜单项。这样修改者无需手动修改布局的菜单xml、手动添加各种资源id或者手写smali了。</li><li>基于第四点的想法，简单制定一些txt中文本规则： <ul><li>文本采用utf-8编码，不能留有空行。</li><li>每一行就是一个wine版本信息，记录wine名字（自定义，用于菜单项的显示），wine执行路径，wine预设容器路径。三条信息两两之间用空格分隔。</li><li>以#开头的是注释。</li><li>以usage:开头的是说明，作为最后一个菜单项和wine版本菜单项一起出现。</li></ul></li></ol><h3 id="_1-4-编写代码" tabindex="-1"><a class="header-anchor" href="#_1-4-编写代码"><span>1.4 编写代码</span></a></h3><p>略</p><h3 id="_1-5-java反编译为smali并添加入dex" tabindex="-1"><a class="header-anchor" href="#_1-5-java反编译为smali并添加入dex"><span>1.5 java反编译为smali并添加入dex</span></a></h3><ul><li>自己写的代码部分，提供smali文件。ex的dex需要修改的部分，提供smali修改样例，不保证适用不同版本。</li><li>提供的代码里使用的均为原版包名即<code>com.eltechs.ed</code>。修改包名时，注意有个字符串也带包名记得修改。</li><li>如果测试时发现wine路径写错了，改了txt之后应删掉容器重新建，否则wine路径不会变化。</li><li>从快捷方式启动时eval的wine路径没写在dex中，而是写在了.desktop快捷方式文件中，请自行修改文件中的wine为绝对路径。模拟器内创建快捷方式时默认都是wine，<strong>所以如果用户自行创建了快捷方式就会无法从快捷方式启动模拟器，暂时不知道怎么解决。</strong><hr></li><li>修改wine选项弹窗，涉及ManagerContainersFragment类</li><li>修改创建容器时操作，涉及GuestContainerConfig,GuestContainersManager类</li><li>修改启动容器时操作，涉及StartGuest类</li></ul><h4 id="_1-5-1-managercontainersfragment类" tabindex="-1"><a class="header-anchor" href="#_1-5-1-managercontainersfragment类"><span>1.5.1 ManagerContainersFragment类</span></a></h4><ul><li>onOptionsItemSelected方法整个删掉。</li><li>onCreateOptionMenu方法，注释掉原有语句，添加<div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"><span class="token comment">#修改 调用自己的方法设置菜单，传入menu和task实例</span></span>
<span class="line">invoke-static <span class="token punctuation">{</span><span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token register variable">p0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>mutiWine<span class="token punctuation">/</span></span><span class="token class-name">MutiWine</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">setOptionMenu</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">android<span class="token punctuation">/</span>view<span class="token punctuation">/</span></span><span class="token class-name">Menu</span></span><span class="token punctuation">;</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ManageContainersFragment</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li>新建一个方法<div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"><span class="token comment"># virtual methods</span></span>
<span class="line"><span class="token comment"># 添加方法 用于从外部调用，执行创建容器的task</span></span>
<span class="line"><span class="token keyword">.method</span> <span class="token keyword">public</span> <span class="token function">callToCreateNewContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line">    <span class="token keyword">.registers</span> <span class="token number">3</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">.prologue</span></span>
<span class="line">    const/4 <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token number">0x0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">.line</span> <span class="token number">58</span></span>
<span class="line">    new-instance <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ManageContainersFragment$ContAsyncTask</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    invoke-direct <span class="token punctuation">{</span><span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token register variable">p0</span><span class="token punctuation">,</span> <span class="token register variable">v1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ManageContainersFragment$ContAsyncTask</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">&lt;init&gt;</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ManageContainersFragment</span></span><span class="token punctuation">;</span><span class="token builtin">I</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span>
<span class="line">    new-array <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token operator">[</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainer</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    invoke-virtual <span class="token punctuation">{</span><span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token register variable">v1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ManageContainersFragment$ContAsyncTask</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token operator">[</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Object</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">android<span class="token punctuation">/</span>os<span class="token punctuation">/</span></span><span class="token class-name">AsyncTask</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">.line</span> <span class="token number">59</span></span>
<span class="line">    return-void</span>
<span class="line"><span class="token keyword">.end</span> <span class="token keyword">method</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_1-5-2-guestcontainerconfig类" tabindex="-1"><a class="header-anchor" href="#_1-5-2-guestcontainerconfig类"><span>1.5.2 GuestContainerConfig类</span></a></h4><ul><li>loadDefaults()方法。在末尾添加<div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"><span class="token comment">#添加wine版本信息</span></span>
<span class="line"></span>
<span class="line">iget-object <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token register variable">p0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainerConfig</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">mCont</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainer</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">iget-object <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainer</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">mId</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Long</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">invoke-static <span class="token punctuation">{</span><span class="token register variable">v1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>mutiWine<span class="token punctuation">/</span></span><span class="token class-name">MutiWine</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">writeWineVerToContainerConfig</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Long</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>cloneContainerConfig()方法，由于末尾调用getRunGuideShown()那里把p0 p1改了，而调用的自己的函数需要用到p0 p1, 所以要在这之前添加<div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"><span class="token comment">#添加 复制容器的wine版本信息 放在p0 p1被修改之前吧</span></span>
<span class="line"><span class="token comment"># v0旧id   </span></span>
<span class="line">iget-object <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token register variable">p0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainer</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">mId</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Long</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># v1新id</span></span>
<span class="line">iget-object <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainer</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">mId</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Long</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">invoke-static <span class="token punctuation">{</span><span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token register variable">v1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>mutiWine<span class="token punctuation">/</span></span><span class="token class-name">MutiWine</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">cloneWineVerToContainerConfig</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Long</span></span><span class="token punctuation">;</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Long</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"><span class="token comment">#添加 结束</span></span>
<span class="line"><span class="token keyword">.line</span> <span class="token number">75</span></span>
<span class="line">iget-object <span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainer</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">mConfig</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainerConfig</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">iget-object <span class="token register variable">p0</span><span class="token punctuation">,</span> <span class="token register variable">p0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainer</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">mConfig</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainerConfig</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">invoke-virtual <span class="token punctuation">{</span><span class="token register variable">p0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainerConfig</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">getRunGuideShown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Boolean</span></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_1-5-3-guestcontainersmanager类" tabindex="-1"><a class="header-anchor" href="#_1-5-3-guestcontainersmanager类"><span>1.5.3 GuestContainersManager类</span></a></h4><ul><li>initNewContainer方法里，注释掉字符串“opt/guestcont-pattern”那一行并在下面添加<div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"> <span class="token comment"># const-string v2, &quot;/opt/guestcont-pattern/&quot;</span></span>
<span class="line"><span class="token comment">#修改 guestcont-pattern的路径</span></span>
<span class="line">invoke-static <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>mutiWine<span class="token punctuation">/</span></span><span class="token class-name">MutiWine</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">getCustomPatternPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">String</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">move-result-object <span class="token register variable">v2</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_1-5-4-startguest类" tabindex="-1"><a class="header-anchor" href="#_1-5-4-startguest类"><span>1.5.4 StartGuest类</span></a></h4><ul><li>init构造方法，传RunExplorer那个, 注释掉原先的eval字符串，并添加</li></ul><div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"><span class="token keyword">.method</span> <span class="token keyword">public</span> <span class="token keyword">constructor</span> <span class="token function">&lt;init&gt;</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>startupActions<span class="token punctuation">/</span></span><span class="token class-name">StartGuest$RunExplorer</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line">    <span class="token comment">#...</span></span>
<span class="line">    <span class="token comment">#修改 eval的wine执行路径</span></span>
<span class="line">    </span>
<span class="line">    iget-object <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token register variable">p0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>startupActions<span class="token punctuation">/</span></span><span class="token class-name">StartGuest</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">mCont</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainer</span></span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    iget-object <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>guestContainers<span class="token punctuation">/</span></span><span class="token class-name">GuestContainer</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">mId</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Long</span></span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    invoke-static <span class="token punctuation">{</span><span class="token register variable">v0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>mutiWine<span class="token punctuation">/</span></span><span class="token class-name">MutiWine</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">getExeEvalArgv</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Long</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">String</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    move-result-object <span class="token register variable">v0</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">#const-string v0, &quot;eval \\&quot;wine /opt/exec_wrapper.exe /opt/TFM.exe D:/\\&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">#修改结束</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-5-5-改完dex" tabindex="-1"><a class="header-anchor" href="#_1-5-5-改完dex"><span>1.5.5 改完dex</span></a></h4><p>改完dex之后，向linux中添加多个版本wine（和预设WINEPREFIX）并做成数据包，在apk/assets/WinesVersionInfo.txt里写上每个wine的版本信息，在创建容器时就可以选择wine版本进行创建了。</p><h2 id="一些探索过程记录" tabindex="-1"><a class="header-anchor" href="#一些探索过程记录"><span>一些探索过程记录</span></a></h2><h3 id="wine的安装-共存" tabindex="-1"><a class="header-anchor" href="#wine的安装-共存"><span>wine的安装，共存</span></a></h3><h3 id="exagear的dex中-跟启动容器相关的一些操作" tabindex="-1"><a class="header-anchor" href="#exagear的dex中-跟启动容器相关的一些操作"><span>exagear的dex中，跟启动容器相关的一些操作</span></a></h3>`,26);function G(I,E){const e=l("router-link"),p=l("ExternalLinkIcon");return o(),u("div",null,[n("nav",k,[n("ul",null,[n("li",null,[a(e,{to:"#_1-利用现成代码-修改手头上的apk"},{default:t(()=>[s("1 利用现成代码，修改手头上的apk")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#_1-1-修改之前要了解的知识"},{default:t(()=>[s("1.1 修改之前要了解的知识")]),_:1})]),n("li",null,[a(e,{to:"#_1-2-需要修改的地方有"},{default:t(()=>[s("1.2 需要修改的地方有？")]),_:1})]),n("li",null,[a(e,{to:"#_1-3-设计方案"},{default:t(()=>[s("1.3 设计方案")]),_:1})]),n("li",null,[a(e,{to:"#_1-4-编写代码"},{default:t(()=>[s("1.4 编写代码")]),_:1})]),n("li",null,[a(e,{to:"#_1-5-java反编译为smali并添加入dex"},{default:t(()=>[s("1.5 java反编译为smali并添加入dex")]),_:1})])])]),n("li",null,[a(e,{to:"#一些探索过程记录"},{default:t(()=>[s("一些探索过程记录")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#wine的安装-共存"},{default:t(()=>[s("wine的安装，共存")]),_:1})]),n("li",null,[a(e,{to:"#exagear的dex中-跟启动容器相关的一些操作"},{default:t(()=>[s("exagear的dex中，跟启动容器相关的一些操作")]),_:1})])])])])]),d,n("ul",null,[m,n("li",null,[n("a",v,[s("参考教程1"),a(p)]),s(),n("a",g,[s("参考教程2"),a(p)]),s(),n("a",b,[s("参考教程3"),a(p)]),s("。参考教程2自己编译太费时间了，我选择参考教程1里的直接解压deb安装包。 "),h])]),n("ol",null,[x,n("li",null,[s("鉴于我对linux不熟悉，不如直接用官网已编译好的二进制安装包。参考上面的参考教程1，去"),n("a",_,[s("官网下载地址"),a(p)]),s("下载wine-stable-i386.deb和wine-stable.deb。关于wine、wine-i386、winehq的区别可以看参考教程3。将两个deb中的opt和usr文件夹解压到同一目录下，如/usr/wines/wine6.0.4。若想启动wine，使用绝对路径调用即可，如"),w,s("。")]),f,C,L]),j])}const W=c(r,[["render",G],["__file","deprecated.html.vue"]]),y=JSON.parse('{"path":"/blogs/2022/autumn/exagearMultiWine/deprecated.html","title":"向exagear数据包中添加任意个数的不同wine版本(旧)","lang":"zh-CN","frontmatter":{"date":"2022-9-27 09:24:39","title":"向exagear数据包中添加任意个数的不同wine版本(旧)","categories":["技术"],"tags":["android","wine","linux","exagear"]},"headers":[{"level":2,"title":"1 利用现成代码，修改手头上的apk","slug":"_1-利用现成代码-修改手头上的apk","link":"#_1-利用现成代码-修改手头上的apk","children":[{"level":3,"title":"1.1 修改之前要了解的知识","slug":"_1-1-修改之前要了解的知识","link":"#_1-1-修改之前要了解的知识","children":[]},{"level":3,"title":"1.2 需要修改的地方有？","slug":"_1-2-需要修改的地方有","link":"#_1-2-需要修改的地方有","children":[]},{"level":3,"title":"1.3 设计方案","slug":"_1-3-设计方案","link":"#_1-3-设计方案","children":[]},{"level":3,"title":"1.4 编写代码","slug":"_1-4-编写代码","link":"#_1-4-编写代码","children":[]},{"level":3,"title":"1.5 java反编译为smali并添加入dex","slug":"_1-5-java反编译为smali并添加入dex","link":"#_1-5-java反编译为smali并添加入dex","children":[]}]},{"level":2,"title":"一些探索过程记录","slug":"一些探索过程记录","link":"#一些探索过程记录","children":[{"level":3,"title":"wine的安装，共存","slug":"wine的安装-共存","link":"#wine的安装-共存","children":[]},{"level":3,"title":"exagear的dex中，跟启动容器相关的一些操作","slug":"exagear的dex中-跟启动容器相关的一些操作","link":"#exagear的dex中-跟启动容器相关的一些操作","children":[]}]}],"git":{"createdTime":1664284805000,"updatedTime":1665482181000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":1}]},"filePathRelative":"blogs/2022/autumn/exagearMultiWine/deprecated.md"}');export{W as comp,y as data};
