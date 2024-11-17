import{_ as l,r as c,o as i,c as u,a as n,b as s,w as p,d as a,e as o}from"./app-DMogTwpC.js";const k="/assets/4-DJjiJDPy.gif",r="/assets/1-CUHZqKYG.png",d="/assets/2-Crb_Zgb0.png",m="/assets/3-B1514RR5.png",h={},v={class:"table-of-contents"},g=o('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>一般的Exagear运行游戏的流程为：点击exaagear app图标，选择快捷方式或容器设置的运行文件管理器，进入x11界面，打开游戏。而由于exagear代码良好的抽象性，进行非常简单的修改即可直启进入x11界面，直接运行游戏。</p><p>效果：</p><p><img src="'+k+'" alt="Alt text"></p><h2 id="演示视频" tabindex="-1"><a class="header-anchor" href="#演示视频"><span>演示视频：</span></a></h2>',5),b={href:"https://www.bilibili.com/video/BV1QM4y1v7RG/?share_source=copy_web&vd_source=de2377a6a91c81456918f0dc49bfbd5d",target:"_blank",rel:"noopener noreferrer"},f=o('<h2 id="将此功能添加到apk" tabindex="-1"><a class="header-anchor" href="#将此功能添加到apk"><span>将此功能添加到apk</span></a></h2><p>推荐使用ED自助补丁一键修改。<br> 如果你掌握apk的基础修改知识，也可以照下方教程手动修改，但本页面提供的文件可能比ED自助补丁要旧。<br> 如果ED自助补丁也用不明白，那么应该去寻找已经修改好的apk直接使用。</p><div class="custom-container warning"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg><p class="custom-container-title">WARNING</p><p>以下的修改示例代码，包名使用鲁大师包名<code>Lcom/eltechs/ed/</code>，请注意根据实际情况自行调整。</p></div><h3 id="自助修改" tabindex="-1"><a class="header-anchor" href="#自助修改"><span>自助修改</span></a></h3><p>使用ED自助补丁，用户完全不需要手动编辑smali，只需点一个按钮，等待修改完成后安装新的apk即可。</p>',5),x={href:"https://github.com/ewt45/EDPatch/releases",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.bilibili.com/video/BV1mY411X7Nn/",target:"_blank",rel:"noopener noreferrer"},D=o(`<h3 id="手动修改" tabindex="-1"><a class="header-anchor" href="#手动修改"><span>手动修改</span></a></h3><p>用MT管理器编辑dex，</p><ol><li><p>将此压缩包（https://wwqv.lanzout.com/b012zyyli 密码:1mzh）中的全部smali添加到dex中，注意其内容如果有包名相关的请自行替换。</p></li><li><p>编辑<code>com.eltechs.ed.fragments.ChooseXDGLinkFragment$XDGNodeAdapter$2.smali</code>,在<code>onClick</code>方法中，<code>invoke-virtual {v1}, Landroid/widget/PopupMenu;-&gt;show()V</code>这一行之前，添加：</p><div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line">iget-object <span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token register variable">p0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ChooseXDGLinkFragment$XDGNodeAdapter$2</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">this$1</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ChooseXDGLinkFragment$XDGNodeAdapter</span></span><span class="token punctuation">;</span></span>
<span class="line">iget-object <span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ChooseXDGLinkFragment$XDGNodeAdapter</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">this$0</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ChooseXDGLinkFragment</span></span><span class="token punctuation">;</span></span>
<span class="line">invoke-static <span class="token punctuation">{</span><span class="token register variable">p1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ChooseXDGLinkFragment</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span>access$<span class="token function">800</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ChooseXDGLinkFragment</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">Z</span></span>
<span class="line">move-result <span class="token register variable">v2</span></span>
<span class="line">iget-object <span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>fragments<span class="token punctuation">/</span></span><span class="token class-name">ChooseXDGLinkFragment$XDGNode</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">mLink</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span></span><span class="token class-name">XDGLink</span></span><span class="token punctuation">;</span></span>
<span class="line">invoke-static <span class="token punctuation">{</span><span class="token register variable">v2</span><span class="token punctuation">,</span> <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token register variable">p1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>shortcut<span class="token punctuation">/</span></span><span class="token class-name">MoreShortcut</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">addOptionsToMenu</span><span class="token punctuation">(</span><span class="token builtin">Z</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">android<span class="token punctuation">/</span>widget<span class="token punctuation">/</span></span><span class="token class-name">PopupMenu</span></span><span class="token punctuation">;</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span></span><span class="token class-name">XDGLink</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>编辑<code>com.eltechs.ed.activities.EDStartupActivity.smali</code>，在<code>initialiseStartupActions</code>方法结尾处，</p><div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"><span class="token comment">#删除以下几行</span></span>
<span class="line">new-instance <span class="token register variable">v0</span><span class="token punctuation">,</span> Lcom/eltechs/ed/startupActions/WDesktop</span>
<span class="line">invoke-direct <span class="token punctuation">{</span><span class="token register variable">v0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>ed<span class="token punctuation">/</span>startupActions<span class="token punctuation">/</span></span><span class="token class-name">WDesktop</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">&lt;init&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line">invoke-virtual <span class="token punctuation">{</span><span class="token register variable">v2</span><span class="token punctuation">,</span> <span class="token register variable">v0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>configuration<span class="token punctuation">/</span>startup<span class="token punctuation">/</span></span><span class="token class-name">StartupActionsCollection</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>configuration<span class="token punctuation">/</span>startup<span class="token punctuation">/</span></span><span class="token class-name">StartupAction</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加这一行</span></span>
<span class="line">invoke-static <span class="token punctuation">{</span><span class="token register variable">p0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>shortcut<span class="token punctuation">/</span></span><span class="token class-name">MoreShortcut</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">launchFromShortCutOrNormally</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">android<span class="token punctuation">/</span>support<span class="token punctuation">/</span>v7<span class="token punctuation">/</span>app<span class="token punctuation">/</span></span><span class="token class-name">AppCompatActivity</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>编译dex，重装apk。</p></li></ol><h2 id="探索过程" tabindex="-1"><a class="header-anchor" href="#探索过程"><span>探索过程</span></a></h2><p>本节为自用，主要记录实现java代码的过程。</p><h3 id="exa直启思路" tabindex="-1"><a class="header-anchor" href="#exa直启思路"><span>exa直启思路</span></a></h3><p>正常的启动容器流程：在EDStartupActivity中，初始化时会向action列表中添加多个action，每个action依次执行。最后一个是WDesktop，也就是显示启动后的那个安卓视图界面，选择快捷方式或设置容器什么的。再然后选择了快捷方式或启动容器之后，再添加一个action StartGuest用于启动容器，此后进入XServerDisplayAcitivity，显示x11服务。</p><p>而StartGuest的创建只需要传入一个参数，如果我们自己新建这个参数，就可以跳过WDesktop，直接在应用初始化时改为添加StartGuest，这样就跳过了安卓视图界面，直接启动x11服务。</p><p>两种改法，要么修改现有的EDStartupActivity，根据情况来添加WDesktop（一般启动）或StartGuest（快捷方式启动），要么自己新建一个activity专门用于快捷方式启动。由于新建activity需要改manifest，ed自助补丁还不支持改xml，所以选择前者了。那么这个<code>根据情况</code>就可以考虑从调起activity的intent中获取信息。</p><h3 id="app快捷方式" tabindex="-1"><a class="header-anchor" href="#app快捷方式"><span>app快捷方式</span></a></h3><p>谷歌文档： https://developer.android.google.cn/develop/ui/views/launch/shortcuts/creating-shortcuts</p><p>https://developer.android.google.cn/guide/topics/ui/shortcuts/creating-shortcuts?hl=zh-cn#testing</p>`,12),L={href:"https://blog.csdn.net/qibin0506/article/details/52878690",target:"_blank",rel:"noopener noreferrer"},A=o(`<p>快捷方式分三种：静态快捷方式，动态快捷方式，和固定快捷方式。静态的需要声明在manifest中且没法修改，动态是可以动态修改的，这两者都是通过长按app图标显示，最多可以显示4个。固定的是单独一个图标放在桌面上，动态快捷方式可以长按然后转换为固定快捷方式。固定快捷方式由于需要安卓版本更高，所以就选择生成动态快捷方式了，使用安卓7及以上的ShortcutManager来创建。</p><p>需要构建一个ShortcutInfo，然后通过shortcutManager.setDynamicShortcuts()生成全部快捷方式。</p><p>shortcutInfo：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">ShortcutInfo</span> shortcutInfo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShortcutInfo<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token class-name">Globals</span><span class="token punctuation">.</span><span class="token function">getAppContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> xdgLink<span class="token punctuation">.</span>name<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">setShortLabel</span><span class="token punctuation">(</span>xdgLink<span class="token punctuation">.</span>name<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">setExtras</span><span class="token punctuation">(</span>persistableBundle<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">setIntent</span><span class="token punctuation">(</span>intent<span class="token punctuation">)</span> <span class="token comment">//设置intent又不一定非要指向目标activity，那难道会加到栈中？如果不指定</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">setActivity</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ComponentName</span><span class="token punctuation">(</span><span class="token class-name">Globals</span><span class="token punctuation">.</span><span class="token function">getAppContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPackageName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Globals</span><span class="token punctuation">.</span><span class="token function">getAppContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPackageName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;.activities.EDStartupActivity&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//设置目标activity</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Builder传入第二个参数是字符串作为id，id是每个快捷方式的唯一标识，更新啥的根据id判断。</li><li>shortLabel是短名称，建议10个字符以内，还有个长名称建议25个字符以内。</li><li>setActivity用于设置targetActivity，即点击后要跳转到哪个acitivity，不设置的话默认从manifest里找了，设置的话需要传入参数格式如<code>.setActivity(new ComponentName(Globals.getAppContext().getPackageName(), Globals.getAppContext().getPackageName() + &quot;.activities.EDStartupActivity&quot;))</code>第一个字符串是应用包名，第二个字符串是activity类的完整路径。吐槽一下这个发现网上基本都没人设置的，然后自己新建ComponentName参数又不知道是啥，试了半天最后还是从logcat的报错信息里看到正确格式的;-;）</li><li>intent看介绍说不一定指向targetAcitivity，反正我是指向了。前面说需要从intent中获取布尔值判断是否从快捷方式启动，就是这个intent了。填充的信息：desktop文件的绝对路径，和其所属的容器id。上面说创建StartGuest这个action需要一个参数，从快捷方式启动的话，这个参数就是XDGLink，而有了这两个数据就可以创建XDGLink对象了。<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">Intent</span> intent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Intent</span><span class="token punctuation">(</span><span class="token class-name">Globals</span><span class="token punctuation">.</span><span class="token function">getAppContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">EDStartupActivity</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Globals.getAppContext(),EDStartupActivity.class</span></span>
<span class="line">intent<span class="token punctuation">.</span><span class="token function">setAction</span><span class="token punctuation">(</span><span class="token class-name">Intent</span><span class="token punctuation">.</span><span class="token constant">ACTION_MAIN</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">intent<span class="token punctuation">.</span><span class="token function">putExtra</span><span class="token punctuation">(</span><span class="token constant">DESKTOP_FILE_ABSOLUTE_PATH</span><span class="token punctuation">,</span> xdgLink<span class="token punctuation">.</span>linkFile<span class="token punctuation">.</span><span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">intent<span class="token punctuation">.</span><span class="token function">putExtra</span><span class="token punctuation">(</span><span class="token constant">CONTAINER_ID</span><span class="token punctuation">,</span> xdgLink<span class="token punctuation">.</span>guestCont<span class="token punctuation">.</span>mId<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>extra是记录一般简单数据的。当该app快捷方式对应的.desktop文件被删除之后，app快捷方式本身也应该被删除，所以需要获取该快捷方式对应的desktop文件的文件路径。之前因为看shortcutinfo.getIntent的说明说无法获取到intent，所以又在extra上设置了一遍，不过刚才又看了一下，貌似说的是launcherApp无法获取，shortcutinfo应该能获取。。</li></ul><h3 id="功能插入的位置" tabindex="-1"><a class="header-anchor" href="#功能插入的位置"><span>功能插入的位置</span></a></h3><p>功能写好了，不过需要一个显示功能的地方，一开始想着加到悬浮操作按钮里，但是需要寻找desktop文件路径，还得写回收视图显示文件夹的内容，后来一想不如直接加到现有的快捷方式的那个菜单项里好了（桌面界面的菜单项只有一个删除，开始菜单的菜单项还有一个复制到桌面，虽然不知为何开始菜单这个页面被后人删掉了）</p><p><img src="`+r+'" alt="Alt text"></p><p>桌面这个页面对应的fragment是ChooseXDGLinkFragment，文件项用的回收视图，回收视图要用到Adapter，这个菜单项的构建就是在ChooseXDGLinkFragment.XDGNodeAdapter.onBindViewHolder中，点击按钮的监听器里实现的。在java代码中写这种套娃顶多就是缩进瞅着别扭点，但是转成smali之后就非常难受了，旧版编译的话内部类，匿名类啥的是<code>类名$1</code>这种纯数字命名，新版的$后面可能跟着含义。</p><p>下面就简单记载一下寻找流程。</p><p>先看一下java中的位置。把能折叠的都折叠上之后，onBindViewHolder内容大概长这样。 popupMenu用于显示菜单项。我们需要在它填充原有内容、设置监听器之后，显示之前插入我们的语句，再添加一项“添加到app快捷方式”。所以MoreShortcut.addOptionsToMenu这行应该加在popupMenu.show()之前。</p><p><img src="'+d+'" alt="Alt text"></p><p>正常解包的话，每个内部类和匿名类是分成单独文件的，但是在jadx中这些属于同一个java文件中的类都会被显示在同一个页面，所以选择用jadx查看。搜索<code>Landroid/widget/PopupMenu;-&gt;show()V</code>，定位到唯一一处，往上滑看到其对应的类为<code>Lcom/eltechs/ed/fragments/ChooseXDGLinkFragment$XDGNodeAdapter$2;</code>。这已经两层了。</p><p>仅把自己的代码调用这一行放到show()上面还不够，因为我们需要准备三个参数：</p><ul><li>mIsStartMenu。这个参数在上面也出现过，是ChooseXDGLinkFragmetn的成员变量，在smali这种原本属于同一个类，但被拆分成不同smali类的情况下，获取外层数据的方法是调用外层类的一个静态函数（名字毫无规律，例如acess$800()这种），传入这个外层类的实例，然后函数内部取得实例的变量值并返回。不过好在上面popupMenu.inflate的时候就获取过一次mIsStartMenu了，所以照着上面的抄应该不难。<br> 定位到inflate这里<br><img src="'+m+'" alt="Alt text"><br> 可以看到if-eqz根据p1是否为0，选择了两个不同的资源id，那么p1就是这个isStartMenu（布尔值在smali中也是0和1），看这个p1是怎么获取的：首先调用this.this$1() 将结果（截图没截全，类型是XDGNodeAdapter）放入p1,再调用p1.this$0() 将结果放入p1（类型是ChooseXDGLinkFragment）, 再通过ChooseXDGLinkFragment.access$800(p1) 将结果即mIsStartMenu的值放入p1.<br> 其中p0是自身类的实例。那么基本流程知道之后，把这几行代码复制过来，最后选一个合适的寄存器存放mIsStartMenu就行了。</li><li>popupMenu。这个比较简单，根据最后一行的<code> invoke-virtual {v1}, Landroid/widget/PopupMenu;-&gt;show()V</code>得知popupMenu就是v1一直没变过。</li><li>XDGLink。在fragment内部用于显示的数据是XDGNode，在StartGuest新建时需要的参数是XDGLink，XDGNode包裹了XDGlink但是属于本fragment的私有类，所以没法直接作为参数传到我的类中，要先获取xdgNode.mLink，再传xdglink。这个上面也用到过（java代码截图中的第二行），所以直接往上翻参考其代码就行了。</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li>app快捷方式有三种，静态，动态，固定。前两者在长按app图标时显示，最多显示4个，动态长按可以拖拽变为固定快捷方式显示在桌面。</li><li>最新的jetpack库有ShortcutManagerCompat方法，用于创建app快捷方式。本次使用了旧版的ShortcutManager创建快捷方式，需要填入intent，目标acitivity等信息。</li></ul>',17);function G(w,S){const t=c("router-link"),e=c("ExternalLinkIcon");return i(),u("div",null,[n("nav",v,[n("ul",null,[n("li",null,[s(t,{to:"#前言"},{default:p(()=>[a("前言")]),_:1})]),n("li",null,[s(t,{to:"#演示视频"},{default:p(()=>[a("演示视频：")]),_:1})]),n("li",null,[s(t,{to:"#将此功能添加到apk"},{default:p(()=>[a("将此功能添加到apk")]),_:1}),n("ul",null,[n("li",null,[s(t,{to:"#自助修改"},{default:p(()=>[a("自助修改")]),_:1})]),n("li",null,[s(t,{to:"#手动修改"},{default:p(()=>[a("手动修改")]),_:1})])])]),n("li",null,[s(t,{to:"#探索过程"},{default:p(()=>[a("探索过程")]),_:1}),n("ul",null,[n("li",null,[s(t,{to:"#exa直启思路"},{default:p(()=>[a("exa直启思路")]),_:1})]),n("li",null,[s(t,{to:"#app快捷方式"},{default:p(()=>[a("app快捷方式")]),_:1})]),n("li",null,[s(t,{to:"#功能插入的位置"},{default:p(()=>[a("功能插入的位置")]),_:1})])])]),n("li",null,[s(t,{to:"#总结"},{default:p(()=>[a("总结")]),_:1})])])]),g,n("p",null,[n("a",b,[a("【Exagear】借助app快捷方式，直接进入环境内部 （ED自助补丁v0.0.3更新）"),s(e)])]),f,n("p",null,[n("a",x,[a("下载地址"),s(e)])]),n("p",null,[n("a",_,[a("视频介绍"),s(e)])]),D,n("p",null,[n("a",L,[a("有关安卓7的旧版ShortcutManager介绍"),s(e)])]),A])}const y=l(h,[["render",G],["__file","index.html.vue"]]),X=JSON.parse('{"path":"/blogs/2023/spring/exagearAppSortcut/","title":"Exagear从app快捷方式直接启动exe","lang":"zh-CN","frontmatter":{"date":"2023-5-27 19:41:23","title":"Exagear从app快捷方式直接启动exe","categories":["技术","exagear"],"tags":["app shortcut"]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"演示视频：","slug":"演示视频","link":"#演示视频","children":[]},{"level":2,"title":"将此功能添加到apk","slug":"将此功能添加到apk","link":"#将此功能添加到apk","children":[{"level":3,"title":"自助修改","slug":"自助修改","link":"#自助修改","children":[]},{"level":3,"title":"手动修改","slug":"手动修改","link":"#手动修改","children":[]}]},{"level":2,"title":"探索过程","slug":"探索过程","link":"#探索过程","children":[{"level":3,"title":"exa直启思路","slug":"exa直启思路","link":"#exa直启思路","children":[]},{"level":3,"title":"app快捷方式","slug":"app快捷方式","link":"#app快捷方式","children":[]},{"level":3,"title":"功能插入的位置","slug":"功能插入的位置","link":"#功能插入的位置","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1685196822000,"updatedTime":1685199535000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":2}]},"filePathRelative":"blogs/2023/spring/exagearAppSortcut/index.md"}');export{y as comp,X as data};
