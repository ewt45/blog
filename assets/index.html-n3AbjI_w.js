import{_ as c,r as l,o as u,c as r,a as n,d as s,b as a,w as i,e as t}from"./app-DMogTwpC.js";const d="/assets/1-LV33ZK6c.gif",o="/assets/2-BwoC9UR9.gif",k="/assets/3-C9139nYz.png",v="/assets/4-Dji9poGH.png",m={},g={class:"custom-container tip"},b=t('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">TIP</p>',2),h=n("li",null,"本文章全部内容和解决办法均基于exagear，不保证其他应用可以解决",-1),w=n("li",null,"由于没有安卓12设备，只能在android12虚拟机上模拟exagear的窗口设置和调出键盘过程，所以无法保证所有安卓12手机均能此用方法解决问题",-1),x=n("p",null,[s("请群友录制的视频。下图是安卓12键盘闪退的演示"),n("br"),n("img",{src:d,alt:"图1"})],-1),f=n("p",null,[s("下图是修复后的调出键盘演示"),n("br"),n("img",{src:o,alt:"图2"})],-1),y=n("h2",{id:"问题描述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#问题描述"},[n("span",null,"问题描述")])],-1),_=n("li",null,"exa在安卓11还好点，虽然无法通过音量键+调出游戏键盘，但是在操作模式cp0（无键盘）和cp1（RTS）的顶栏，点击显示键盘图标，或者cp2往上的四指触屏-显示键盘还是可以调出游戏键盘或者手机输入法的。",-1),S=n("li",null,"exa在安卓12上，调出键盘就没那么容易了。在安卓11的bug的基础上，cp2往上点击“显示键盘”后，键盘会弹出并立刻关闭。解决办法是疯狂点击“显示键盘”，手速够快的话键盘就能正常显示了（听起来有点离谱但确实可以）",-1),I=t('<h2 id="推测问题原因" tabindex="-1"><a class="header-anchor" href="#推测问题原因"><span>推测问题原因</span></a></h2><ul><li>那么cp0 cp1和cp2往上有什么区别呢，发现两者调出键盘的方式略有不同，观察这两种操作模式的布局结构，cp01需要点击顶栏的键盘图标，而顶栏是包含在当前activity的布局内的。cp2往上需要四指触屏调出弹窗菜单popupMenu，点击菜单项“显示键盘”，而这个弹窗菜单是单独的一个decorview，不包括在当前activity的布局内。而当点击菜单项后，弹窗菜单消失，弹窗菜单所属的decorview也一起消失。<br> 两种布局结构如下图所示<br><img src="'+k+'" alt="图3"><img src="'+v+`" alt="图4"></li><li>猜测，弹窗菜单由于不包括在当前acitivity的布局内，导致键盘显示异常。</li><li>设想解决办法：将弹窗菜单放到当前布局内。（最后解决办法：等弹窗菜单消失再延迟触发调出键盘）</li></ul><h2 id="查找问题原因" tabindex="-1"><a class="header-anchor" href="#查找问题原因"><span>查找问题原因</span></a></h2><p>最后的解决办法和设想的有点出入，解决后也懒得再排查其他情况了，在这里仅简单记录一下查找过程。</p><ol><li><p>先是准备修改游戏键盘，然后发现改键盘只能解决音量键+调出bug，exa调出其他键盘还是会闪退。<br> 在这个期间看到了输入法有个报错</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">Unexpected null in startExtractingText : mExtractedText = null, input connection = InputConnectionWrapper{idHash=#721e24 mMissingMethods=}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>搜了老长时间，一无所获，最后找到源码，也没能发现是什么问题（看源码对于我来说还是太难了），实际上最后的最后发现这个报错貌似和闪退没啥关系（</p></li><li><p>然后找ex里调出键盘的方法，togglesoftinput。模拟ex的窗口设置（隐藏状态栏啥的），然后测试普通按钮可以调出，弹窗菜单PopupMenu就会闪退。和安卓12exagear的情况一样。打开as的logcat，选择no-filter，看到两条警告。猜测意思是：由于从菜单项点开的键盘，键盘挂载到弹窗菜单的窗口上，但是点击菜单项后弹窗菜单就消失了，导致输入法有点懵，也跟着一起关掉了。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">system_process W/InputManager-JNI: Input channel object &#39;c66cd8c PopupWindow:3ebee5 (client)&#39; was disposed without first being removed with the input manager!</span>
<span class="line">com.example.datainsert W/InputEventReceiver: Attempted to finish an input event but the input event receiver has already been disposed.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看inputMethodManager除了toggle还有什么方式调出键盘，准备改成showsoftinput，结果普通按钮都调不出键盘。logcat找到一条警告 <code>W/InputMethodManager: Ignoring showSoftInput() as view=xxx is not served.</code>。意思是view不行？查看show的方法介绍，发现show传入的视图View必须是focus的，找了半天发现压根找不到带focus的，心累。弹窗菜单不行，菜单项不行，甚至getdecorview()获取到最顶层的view再findFocus()直接给我返回null</p></li><li><p>遂谷歌，找到源码，发现这句警告的下一句debug输出&quot;showSoftInput() view=...&quot;以前在toggle的时候好像见过，也就是说如果正常显示键盘的话，那么就会显示这个输出。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token comment">//...</span></span>
<span class="line"><span class="token function">checkFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>mH<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasServedByInputMethodLocked</span><span class="token punctuation">(</span>view<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Log</span><span class="token punctuation">.</span><span class="token function">w</span><span class="token punctuation">(</span><span class="token constant">TAG</span><span class="token punctuation">,</span> <span class="token string">&quot;Ignoring showSoftInput() as view=&quot;</span> <span class="token operator">+</span> view <span class="token operator">+</span> <span class="token string">&quot; is not served.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token comment">// Makes sure to call ImeInsetsSourceConsumer#onShowRequested on the UI thread.</span></span>
<span class="line">            <span class="token comment">// TODO(b/229426865): call WindowInsetsController#show instead.</span></span>
<span class="line">            mH<span class="token punctuation">.</span><span class="token function">executeOrSendMessage</span><span class="token punctuation">(</span><span class="token class-name">Message</span><span class="token punctuation">.</span><span class="token function">obtain</span><span class="token punctuation">(</span>mH<span class="token punctuation">,</span> <span class="token constant">MSG_ON_SHOW_REQUESTED</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Log</span><span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span><span class="token constant">TAG</span><span class="token punctuation">,</span> <span class="token string">&quot;showSoftInput() view=&quot;</span> <span class="token operator">+</span> view <span class="token operator">+</span> <span class="token string">&quot; flags=&quot;</span> <span class="token operator">+</span> flags <span class="token operator">+</span> <span class="token string">&quot; reason=&quot;</span></span>
<span class="line">                        <span class="token operator">+</span> <span class="token class-name">InputMethodDebug</span><span class="token punctuation">.</span><span class="token function">softInputDisplayReasonToString</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">//...</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由此猜测，toggle虽然不用显式传入view但也一定会用到view，因为输出语句里有view。</p></li><li><p>又换回toggle，查看log输出，发现是view是decorview(MainActivity)！即当前activity的布局所属的顶层view。这样闪退也说得通了，因为如果在菜单项里调出键盘那么view很可能是弹窗菜单的decorview，而这个decorview是会随着弹窗菜单的消失而一起删除的，那么键盘的所属view都没了键盘当然也会隐藏。那么好办了，只要给show传入decorview就行了。decorview获取方法就是Activity.getWindow().getDecorView()。恩，还是闪退。</p></li><li><p>偶然想起之前写fragment的时候，因为activity的根布局还没初始化好就获取windowToken导致失败，必须要用view.post()在view初始化好了之后再获取。于是尝试view.post和postdelay。终于。。。在试到decorview.postDelay的时候可以正常显示了。</p></li><li><p>到这基本就结束了。再测试一遍，在菜单项的setOnMenuItemClickListener里立刻调用键盘，键盘会随着弹窗菜单的消失而一起消失，而如果用decorview.postdelay里延迟一秒再调出键盘，则可以正常显示。（还有一个小bug是键盘已经显示的情况下再点击菜单项，键盘会随着弹窗菜单的消失而立刻消失，过一秒后由于当前键盘状态是隐藏，又被调出来显示了）</p></li><li><p>真机exagear测试时，不知道是不是show和toast一起用的原因，完全不显示，又换回toggle<br> （所以只要延迟一秒，toggle也行！折腾了这么半天show最后还没用上。但要不是折腾show也不会想到用view.postDelay了）</p></li></ol><h2 id="代码部分" tabindex="-1"><a class="header-anchor" href="#代码部分"><span>代码部分</span></a></h2><h3 id="修改后的调出键盘代码-在自己的测试app上" tabindex="-1"><a class="header-anchor" href="#修改后的调出键盘代码-在自己的测试app上"><span>修改后的调出键盘代码（在自己的测试app上）</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token comment">//在MainActivity里调用即可</span></span>
<span class="line"><span class="token comment">//ExagearPrefs.showInputCorrect(MainActivity.this);</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">showInputCorrect</span><span class="token punctuation">(</span><span class="token class-name">AppCompatActivity</span> a<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Log</span><span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span><span class="token constant">TAG</span><span class="token punctuation">,</span> <span class="token string">&quot;showInputCorrect: 1秒后显示键盘，传入的参数类型为&quot;</span><span class="token operator">+</span>a<span class="token punctuation">.</span><span class="token function">getLocalClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">InputMethodManager</span> imm <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">InputMethodManager</span><span class="token punctuation">)</span>a<span class="token punctuation">.</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span><span class="token class-name">Context</span><span class="token punctuation">.</span><span class="token constant">INPUT_METHOD_SERVICE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">//看ex的，第一个是Force第二个是0，网上第一个是0第二个是NotALways</span></span>
<span class="line"><span class="token comment">//                        imm.toggleSoftInput(InputMethodManager.SHOW_FORCED,0);</span></span>
<span class="line">        <span class="token class-name">Log</span><span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span><span class="token constant">TAG</span><span class="token punctuation">,</span> <span class="token string">&quot;onClick: 当前顶层布局为&quot;</span><span class="token operator">+</span>a<span class="token punctuation">.</span><span class="token function">getWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDecorView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">//安卓10以上，更改键盘调起方式</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Build</span><span class="token punctuation">.</span><span class="token constant">VERSION</span><span class="token punctuation">.</span><span class="token constant">SDK_INT</span> <span class="token operator">&gt;</span> <span class="token class-name">Build<span class="token punctuation">.</span>VERSION_CODES<span class="token punctuation">.</span>Q</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">//如果应该显示键盘，等一秒，顶层view调起键盘（如果应该取消键盘那么什么都不做，点完菜单项的时候键盘应该会自动消失）</span></span>
<span class="line">            a<span class="token punctuation">.</span><span class="token function">getWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDecorView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">postDelayed</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token annotation punctuation">@Override</span></span>
<span class="line">                <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    imm<span class="token punctuation">.</span><span class="token function">toggleSoftInput</span><span class="token punctuation">(</span><span class="token class-name">InputMethodManager</span><span class="token punctuation">.</span><span class="token constant">SHOW_FORCED</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">//                        imm.showSoftInput(a.getWindow().getDecorView(), 0); //原来安卓12只要延迟1秒，用toggle也没问题（阿这ex用show反而没法显示？）</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">//            Toast.makeText(a, &quot;1秒后显示键盘。关闭请按手机返回键&quot;, Toast.LENGTH_SHORT).show();</span></span>
<span class="line"></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">//安卓10及以下保留原来的方式(或者安卓12要隐藏键盘的时候，这个应该没问题吧）</span></span>
<span class="line">        <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            imm<span class="token punctuation">.</span><span class="token function">toggleSoftInput</span><span class="token punctuation">(</span><span class="token class-name">InputMethodManager</span><span class="token punctuation">.</span><span class="token constant">SHOW_FORCED</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单说一下这个函数</p><ul><li>传入参数为AppCompatActivity，这个确认过exagear里用的是这个新版的不是老版的android.app.Acitivity，但问题是现在gradle建议用androidx库了，而exa用的还是android.support.v7库，在as里导入v7库的话又很麻烦，所以干脆等编译成smali之后，再把全部Landroidx/appcompat/app/AppCompatActivity替换为Landroid/support/v7/app/AppCompatActivity。</li><li>调出键盘的代码是InputMethodManager.toggleSoftInput()，和exa原本的一致，唯一不同之处是判断如果系统为安卓11及以上，延迟一秒再调出。</li><li>为什么要传入activity？其实如果是获取输入法，直接传context就行了，但是因为需要用到decorview，就得从activity的getwindow获取。一开始想着不行就声明个静态的activity然后onresume的时候赋值吧，但是老提示内存泄露，然后又想着能不能通过view获取activity，网上搜了一下好像还有坑，最后发现Exagear里直接有静态获取acitivity的方法。。。<code>Globals.getApplicationState()).getCurrentActivity()</code></li></ul><h3 id="将代码添加到exagear中" tabindex="-1"><a class="header-anchor" href="#将代码添加到exagear中"><span>将代码添加到exagear中</span></a></h3><p>有两个问题：在哪里调用自己写的静态方法和如何传入activity参数？</p><ol><li><p>在哪里调用自己写的静态方法<br> 使用jadx查看dex。</p><ol><li>搜索popupMenu.show()，找到XServerDisplayActivity，这个就是进入环境后的activity。</li><li>其addDefaultPopupMenu()调用AXSPopupMenu.show()和AXSPopupMenu.add(list)，add就是添加菜单项，而菜单项列表list是作为参数传入addDefaultPopupMenu的。按x查找调用，发现如下调用<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">xServerDisplayActivity.addDefaultPopupMenu(Arrays.asList(new ShowKeyboard(), new ToggleHorizontalStretch(), new ToggleUiOverlaySidePanels(), new ShowUsage(), new Quit()));</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li>根据名字进入ShowKeyboard()类查看，发现ShowKeyboard.run()调用AndroidHelpers.toggleSoftInput();根据名字来看已经是显示输入法的方法了，进入查看，其内容为<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">public static void toggleSoftInput() {</span>
<span class="line">    ((InputMethodManager) Globals.getAppContext().getSystemService(&quot;input_method&quot;)).toggleSoftInput(2, 0);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>直接通过静态方法获取context，调出键盘。那么我们只要在这里换成调用自己的函数即可。</li></ol></li><li><p>如何传入activity参数？</p><ul><li>设置静态全局变量activity？不好，as提示会导致内存泄露。</li><li>经过一番查找，发现exagear内置和静态获取acitivity的方法<code>Globals.getApplicationState()).getCurrentActivity()</code></li><li>改dex时，smali语句中传入的参数也记得用v7包的acitivity。</li></ul></li></ol><h1 id="将此功能添加到apk" tabindex="-1"><a class="header-anchor" href="#将此功能添加到apk"><span>将此功能添加到apk</span></a></h1><p>推荐使用ED自助补丁一键修改。<br> 如果你掌握apk的基础修改知识，也可以照下方教程手动修改，但本页面提供的文件可能比ED自助补丁要旧。<br> 如果ED自助补丁也用不明白，那么应该去寻找已经修改好的apk直接使用。</p><h3 id="自助修改" tabindex="-1"><a class="header-anchor" href="#自助修改"><span>自助修改</span></a></h3><p>使用ED自助补丁，用户完全不需要手动编辑smali，只需点一个按钮，等待修改完成后安装新的apk即可。</p>`,17),A={href:"https://github.com/ewt45/EDPatch/releases",target:"_blank",rel:"noopener noreferrer"},M={href:"https://www.bilibili.com/video/BV1mY411X7Nn/",target:"_blank",rel:"noopener noreferrer"},C=n("h3",{id:"手动修改",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#手动修改"},[n("span",null,"手动修改")])],-1),E=n("ul",null,[n("li",null,"所需工具：mt管理器")],-1),D=n("br",null,null,-1),T={href:"https://pan.baidu.com/s/1nfZYF8PdIMn_JLvoOlVCeg?pwd=n4gm",target:"_blank",rel:"noopener noreferrer"},L=t(`<li><p>搜索进入AndroidHelpers类的toggleSoftInput()方法，将其替换为</p><div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"><span class="token keyword">.method</span> <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token function">toggleSoftInput</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line">    <span class="token keyword">.registers</span> <span class="token number">3</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">.line</span> <span class="token number">41</span></span>
<span class="line"></span>
<span class="line">invoke-static <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span></span><span class="token class-name">Globals</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">getApplicationState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>lang<span class="token punctuation">/</span></span><span class="token class-name">Object</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    move-result-object <span class="token register variable">v0</span></span>
<span class="line"></span>
<span class="line">    check-cast <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>applicationState<span class="token punctuation">/</span></span><span class="token class-name">ApplicationStateBase</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">.line</span> <span class="token number">439</span></span>
<span class="line">    invoke-interface <span class="token punctuation">{</span><span class="token register variable">v0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>applicationState<span class="token punctuation">/</span></span><span class="token class-name">ApplicationStateBase</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">getCurrentActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>activities<span class="token punctuation">/</span></span><span class="token class-name">FrameworkActivity</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    move-result-object <span class="token register variable">v1</span></span>
<span class="line"></span>
<span class="line">invoke-static <span class="token punctuation">{</span><span class="token register variable">v1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span></span><span class="token class-name">ExagearPrefs</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">showInputCorrect</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">android<span class="token punctuation">/</span>support<span class="token punctuation">/</span>v7<span class="token punctuation">/</span>app<span class="token punctuation">/</span></span><span class="token class-name">AppCompatActivity</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line">    return-void</span>
<span class="line"><span class="token keyword">.end</span> <span class="token keyword">method</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>编译dex，apk签名，重新安装，测试四指调出键盘，正常。<br><img src="`+o+'" alt="图2"></p></li>',2),O={href:"https://pan.baidu.com/s/1GTZPCPuVNpjsWJIEIVxntw?pwd=nrxf",target:"_blank",rel:"noopener noreferrer"},q=n("h2",{id:"总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#总结"},[n("span",null,"总结")])],-1),V=n("ol",null,[n("li",null,"exagear进入环境后的acitivity是XServerDisplayActivity，获取activity通过Globals.getApplicationState()).getCurrentActivity()。"),n("li",null,"解决键盘闪退的方法就是decorview.postdelay 延迟一秒再调起键盘。"),n("li",null,"查看log输出时，选择no filter可以插看全部输出，如果选仅当前包名的，可能就没法查看到输入法这种系统服务的报错或警告")],-1);function P(j,N){const p=l("RouteLink"),e=l("ExternalLinkIcon");return u(),r("div",null,[n("div",g,[b,n("ul",null,[n("li",null,[s("若只想知道怎么解决，请从"),a(p,{to:"/blogs/2022/autumn/exagearKeyboard/#%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E5%8A%A8%E6%89%8B%E6%93%8D%E4%BD%9C"},{default:i(()=>[s("解决方案-动手操作")]),_:1}),s("开始看")]),h,w])]),x,f,y,n("ul",null,[n("li",null,[s("从安卓11开始，游戏键盘gamekeyboard就出现问题，无法通过音量键调出了。在某些界面是可以调出的，但是在另外一些界面（比如需要键盘的植物大战僵尸tv版，或者exagear）就无法调出。对于游戏键盘的解决方法，可以看另一篇文章"),a(p,{to:"/blogs/2022/autumn/gamekeyboardOnAndroid12/"},{default:i(()=>[s("解决安卓11和12无法通过音量键+调出游戏键盘")]),_:1}),s("。本篇主要讲exagear。")]),_,S]),I,n("p",null,[n("a",A,[s("下载地址"),a(e)])]),n("p",null,[n("a",M,[s("视频介绍"),a(e)])]),C,E,n("ol",null,[n("li",null,[n("p",null,[s("导入自己写的调出键盘方法。"),D,s(" 打开mt管理器的dex编辑器++，在浏览界面长按任意路径，导入"),n("a",T,[s("两个smali"),a(e)]),s("。")])]),L,n("li",null,[n("p",null,[s("这里提供一个改好的apk包以供测试 "),n("a",O,[s("老虎山六合一"),a(e)])])])]),q,V])}const B=c(m,[["render",P],["__file","index.html.vue"]]),H=JSON.parse('{"path":"/blogs/2022/autumn/exagearKeyboard/","title":"解决安卓12的应用，无法通过PopupMenu唤起软键盘（键盘闪退）问题（exagear为例）","lang":"zh-CN","frontmatter":{"date":"2022-09-03 10:11","title":"解决安卓12的应用，无法通过PopupMenu唤起软键盘（键盘闪退）问题（exagear为例）","categories":["技术","exagear"],"tags":["android","SoftKeyBoard","DecorView","安卓12"]},"headers":[{"level":2,"title":"问题描述","slug":"问题描述","link":"#问题描述","children":[]},{"level":2,"title":"推测问题原因","slug":"推测问题原因","link":"#推测问题原因","children":[]},{"level":2,"title":"查找问题原因","slug":"查找问题原因","link":"#查找问题原因","children":[]},{"level":2,"title":"代码部分","slug":"代码部分","link":"#代码部分","children":[{"level":3,"title":"修改后的调出键盘代码（在自己的测试app上）","slug":"修改后的调出键盘代码-在自己的测试app上","link":"#修改后的调出键盘代码-在自己的测试app上","children":[]},{"level":3,"title":"将代码添加到exagear中","slug":"将代码添加到exagear中","link":"#将代码添加到exagear中","children":[]},{"level":3,"title":"自助修改","slug":"自助修改","link":"#自助修改","children":[]},{"level":3,"title":"手动修改","slug":"手动修改","link":"#手动修改","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1662190358000,"updatedTime":1679134042000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":4}]},"filePathRelative":"blogs/2022/autumn/exagearKeyboard/index.md"}');export{B as comp,H as data};
