import{_ as c,r as i,o,c as u,a as n,b as a,w as t,d as s,e as p}from"./app-DMogTwpC.js";const r="/assets/2-cyNrTICD.gif",d="/assets/1-U0ikY-eF.png",k={},m={class:"table-of-contents"},b=p('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>由于现在exagear安装只能从第三方获取，所以需要用户手动放置数据包。当apk没有在默认位置（/sdcard/Android/obb/包名，现在大部分apk还有一个第二位置 /sdcard）下找到对应文件名（main.数字.包名.obb）的obb文件，就会报错 <code>failed to find exagear image</code>。</p><p>某些情况下，如不了解obb的用户可能无法检查出问题所在（比如数据包名字前多了几个文字），或者在高版本安卓上无法放入obb文件夹，此时可以通过手动选择的方式来选取obb数据包。</p><p><img src="'+r+'" alt="gif1"></p><div class="custom-container warning"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg><p class="custom-container-title">WARNING</p><p>由于安卓限制，安卓11及以上无法使用文件选择器查看Android/data和Android/obb目录下的文件。</p></div><h2 id="演示视频" tabindex="-1"><a class="header-anchor" href="#演示视频"><span>演示视频：</span></a></h2>',6),v={href:"https://space.bilibili.com/29460173/channel/collectiondetail?sid=598657",target:"_blank",rel:"noopener noreferrer"},g=n("h2",{id:"将此功能添加到apk",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#将此功能添加到apk"},[n("span",null,"将此功能添加到apk")])],-1),h=n("p",null,[s("推荐使用ED自助补丁一键修改。"),n("br"),s(" 如果你掌握apk的基础修改知识，也可以照下方教程手动修改，但本页面提供的文件可能比ED自助补丁要旧。"),n("br"),s(" 如果ED自助补丁也用不明白，那么应该去寻找已经修改好的apk直接使用。")],-1),f=n("h3",{id:"自助修改",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#自助修改"},[n("span",null,"自助修改")])],-1),x=n("p",null,"使用ED自助补丁，用户完全不需要手动编辑smali，只需点一个按钮，等待修改完成后安装新的apk即可。",-1),_={href:"https://github.com/ewt45/EDPatch/releases",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.bilibili.com/video/BV1mY411X7Nn/",target:"_blank",rel:"noopener noreferrer"},O=n("h3",{id:"手动修改",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#手动修改"},[n("span",null,"手动修改")])],-1),I=n("p",null,"用MT管理器编辑dex",-1),w=p(`<li><p><code>com.eltechs.axs.configuration.startup.actions.UnpackExagearImageObb</code>类，<code>execute</code>方法中,将installImageFromObbIfNeeded改为installImageFromObbIfNeededNew，以便显示fragment</p><div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"><span class="token comment">#</span></span>
<span class="line"><span class="token comment">#invoke-virtual {v8}, Lcom/eltechs/axs/helpers/ZipInstallerObb;-&gt;installImageFromObbIfNeeded()V</span></span>
<span class="line">invoke-virtual <span class="token punctuation">{</span><span class="token register variable">v8</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>helpers<span class="token punctuation">/</span></span><span class="token class-name">ZipInstallerObb</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">installImageFromObbIfNeededNew</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>在com.eltechs.axs.helpers.ZipInstallerObb类中，结尾处添加installImageFromObbIfNeededNew方法。</p><details class="custom-container details"><summary class="custom-container-title">点击展开代码</summary><div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"></span>
<span class="line"><span class="token keyword">.method</span> <span class="token keyword">public</span> <span class="token function">installImageFromObbIfNeededNew</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line">    <span class="token keyword">.registers</span> <span class="token number">2</span></span>
<span class="line">    <span class="token keyword">.annotation</span> <span class="token keyword">system</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">dalvik<span class="token punctuation">/</span>annotation<span class="token punctuation">/</span></span><span class="token class-name">Throws</span></span><span class="token punctuation">;</span></span>
<span class="line">        value <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>io<span class="token punctuation">/</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">.end</span> <span class="token keyword">annotation</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">.line</span> <span class="token number">36</span></span>
<span class="line">    invoke-direct <span class="token punctuation">{</span><span class="token register variable">p0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>helpers<span class="token punctuation">/</span></span><span class="token class-name">ZipInstallerObb</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">checkObbUnpackNeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token builtin">Z</span></span>
<span class="line"></span>
<span class="line">    move-result <span class="token register variable">v0</span></span>
<span class="line"></span>
<span class="line">    if-eqz <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token punctuation">:</span><span class="token label property">cond_10</span></span>
<span class="line"></span>
<span class="line">    invoke-direct <span class="token punctuation">{</span><span class="token register variable">p0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>helpers<span class="token punctuation">/</span></span><span class="token class-name">ZipInstallerObb</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">findObbFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>io<span class="token punctuation">/</span></span><span class="token class-name">File</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    move-result-object <span class="token register variable">v0</span></span>
<span class="line"></span>
<span class="line">    if-nez <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token punctuation">:</span><span class="token label property">cond_10</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">.line</span> <span class="token number">37</span></span>
<span class="line">    invoke-static <span class="token punctuation">{</span><span class="token register variable">p0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>obb<span class="token punctuation">/</span></span><span class="token class-name">ProcessInstallObb</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>helpers<span class="token punctuation">/</span></span><span class="token class-name">ZipInstallerObb</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span>
<span class="line">    goto <span class="token punctuation">:</span><span class="token label property">goto_13</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">.line</span> <span class="token number">39</span></span>
<span class="line">    <span class="token punctuation">:</span><span class="token label property">cond_10</span></span>
<span class="line">    invoke-virtual <span class="token punctuation">{</span><span class="token register variable">p0</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>eltechs<span class="token punctuation">/</span>axs<span class="token punctuation">/</span>helpers<span class="token punctuation">/</span></span><span class="token class-name">ZipInstallerObb</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">installImageFromObbIfNeeded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">:</span><span class="token label property">goto_13</span></span>
<span class="line">    return-void</span>
<span class="line"><span class="token keyword">.end</span> <span class="token keyword">method</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>还是ZipInstallerObb类，在findObbFile()方法中，结尾<code>return-object v0</code>之前添加代码</p><div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line"><span class="token comment">#在return-object v0之前添加这行</span></span>
<span class="line">sget-object <span class="token register variable">v0</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>obb<span class="token punctuation">/</span></span><span class="token class-name">SelectObbFragment</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token field variable">obbFile</span><span class="token punctuation">:</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">java<span class="token punctuation">/</span>io<span class="token punctuation">/</span></span><span class="token class-name">File</span></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>在<code>UnpackExagearImageObb$1.smali</code>类中（注意名字带<code>$1</code>），<code>unpackingCompleted</code>方法中，开头添加一句，用于在解压完成后删除临时obb。</p><div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line">invoke-static <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>obb<span class="token punctuation">/</span></span><span class="token class-name">SelectObbFragment</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">delCopiedObb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>在<code>com.eltechs.axs.activities.StartupActivity</code>类中，<code>onActivityResult</code>方法中，开头处添加。用于获取手动选择文件。</p><div class="language-smali line-numbers-mode" data-ext="smali" data-title="smali"><pre class="language-smali"><code><span class="line">    <span class="token comment"># 添加到方法开头。如果相等，用cond正常往下走，否则调用fragment处理文件并goto直接返回</span></span>
<span class="line">    const/16 <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token number">0x2711</span></span>
<span class="line"></span>
<span class="line">    if-eq <span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token register variable">v1</span><span class="token punctuation">,</span> <span class="token punctuation">:</span><span class="token label property">cond_3a</span></span>
<span class="line"></span>
<span class="line">    invoke-static <span class="token punctuation">{</span><span class="token register variable">p0</span><span class="token punctuation">,</span> <span class="token register variable">p1</span><span class="token punctuation">,</span> <span class="token register variable">p2</span><span class="token punctuation">,</span> <span class="token register variable">p3</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token builtin">L</span><span class="token namespace">com<span class="token punctuation">/</span>example<span class="token punctuation">/</span>datainsert<span class="token punctuation">/</span>exagear<span class="token punctuation">/</span>obb<span class="token punctuation">/</span></span><span class="token class-name">SelectObbFragment</span></span><span class="token punctuation">;</span><span class="token operator">-&gt;</span><span class="token function">receiveResultManually</span><span class="token punctuation">(</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">android<span class="token punctuation">/</span>support<span class="token punctuation">/</span>v7<span class="token punctuation">/</span>app<span class="token punctuation">/</span></span><span class="token class-name">AppCompatActivity</span></span><span class="token punctuation">;</span><span class="token builtin">II</span><span class="token class-name"><span class="token builtin">L</span><span class="token namespace">android<span class="token punctuation">/</span>content<span class="token punctuation">/</span></span><span class="token class-name">Intent</span></span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token builtin">V</span></span>
<span class="line"></span>
<span class="line">    goto <span class="token punctuation">:</span><span class="token label property">goto_49</span> <span class="token comment">#这个goto_49是return-void前的标记，可能不是49是其他数字需要注意一下</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">:</span><span class="token label property">cond_3a</span></span>
<span class="line">    <span class="token comment">#...</span></span>
<span class="line">    <span class="token comment">#...</span></span>
<span class="line">    <span class="token punctuation">:</span><span class="token label property">goto_49</span></span>
<span class="line">    return-void</span>
<span class="line"><span class="token keyword">.end</span> <span class="token keyword">method</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,5),F={href:"https://wwqv.lanzout.com/iBQ5b0lo5nfe",target:"_blank",rel:"noopener noreferrer"},N=n("li",null,[n("p",null,"编译dex，重装apk。")],-1),A=p(`<h3 id="已改好apk" tabindex="-1"><a class="header-anchor" href="#已改好apk"><span>已改好apk</span></a></h3><p>无</p><h2 id="探索过程" tabindex="-1"><a class="header-anchor" href="#探索过程"><span>探索过程</span></a></h2><p>本节为自用，主要记录实现java代码的过程。</p><h3 id="分析ed的dex" tabindex="-1"><a class="header-anchor" href="#分析ed的dex"><span>分析ed的dex</span></a></h3><p>UnpackExagearImageObb类里，新建ZipInstallerObb实例，新建一个callback并传入，并调用方法installImageFromObbIfNeeded进行检查并解压数据包。</p><p>installImageFromObbIfNeeded先调用checkObbUnpackNeed()判断是否需要解压，如果需要，数据包文件通过findObbFile()获取，然后新建一个AsyncTask，完成的时候调用callback的unpackingCompleted，进而调用UnpackExagearImageObb类里的sendDone方法结束这个action。同理可以显示进度/报错。</p><p>findObbFile()方法：先从Android/obb/包名中尝试获取格式化名称的数据包，如果不存在尝试获取根目录下的同名文件。如果这两者有一个获取到了就返回，没获取到就将**versioncode减1再继续找。。**versioncode就是数据包名字中的数字那部分，没想到居然还会向下找。如果啥都找不到，那就返回null。</p><p>checkObbUnpackNeed方法：这个方法很绝，依赖于findObbFile，所以如果想获得正确返回值，必须在调用check之前先调用一遍findObbFile。。。</p><h3 id="打开系统自带的文件选择器" tabindex="-1"><a class="header-anchor" href="#打开系统自带的文件选择器"><span>打开系统自带的文件选择器</span></a></h3><p>一开始有这个想法是在写切换d盘路径的时候，看到ib键盘007,设置保存安装文件的路径调用了这个。然后搜了一下发现貌似要在manifest里加fileprovider看起来还挺麻烦就放弃了。直到最近写打包apk发现如果只是获取个文件并不用fileprovider（甚至不需要文件存储权限），只需要发送个intent就行了。遂实现了一下。</p><p>参考文档：https://developer.android.google.cn/training/data-storage/shared/documents-files?hl=zh-cn#open-file</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">Intent</span> intent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Intent</span><span class="token punctuation">(</span><span class="token class-name">Intent</span><span class="token punctuation">.</span><span class="token constant">ACTION_OPEN_DOCUMENT</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">intent<span class="token punctuation">.</span><span class="token function">addCategory</span><span class="token punctuation">(</span><span class="token class-name">Intent</span><span class="token punctuation">.</span><span class="token constant">CATEGORY_OPENABLE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">intent<span class="token punctuation">.</span><span class="token function">setType</span><span class="token punctuation">(</span><span class="token string">&quot;*/*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">startActivityForResult</span><span class="token punctuation">(</span>intent<span class="token punctuation">,</span> <span class="token constant">PICK_OBB_FILE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示一个按钮，点击时发这个intent就行了。然后选择的文件在onActivityResult函数中接收到。所以至少要写个fragment，重写onActivityResult（然而遇到一堆问题），通过第三个参数的intent.getData()获取文件的uri。</p><h3 id="获取文件并让ex读取到这个文件" tabindex="-1"><a class="header-anchor" href="#获取文件并让ex读取到这个文件"><span>获取文件并让ex读取到这个文件</span></a></h3><p>uri的api和file的api稍有不同，只能获取到输入流。而ex的解压数据包传参数用的都是file，所以需要先通过文件流复制一份obb数据包到自己的数据目录下（使用apache的commons-io的IOUtils即可，才发现我之前一直用的compress里的IOUtils，不知道有什么区别），然后再把这个拷贝过来的临时obb作为file传给ex以供解压。解压后还应该删掉防止占过多存储空间。</p><p>整理一下，流程大概是：ZipInstallerObb中先检查是否需要解压，如果要解压且没找到数据包（findObbFile()返回null），就新建fragment显示手动选择的按钮。<br> 如何实现解压时获取到复制过来的手动选择的数据包：fragment设置一个静态变量obbFile，在findObbFile()中结尾处，直接返回0（null）改为返回obbFile，当然obbFile初始也是null，只有fragment接收到文件了之后才是对应文件。<br> 如何实现解压后删除复制过来的手动选择的数据包：解压完成后ZipInstallerObb会调用callbacks.unpackingCompleted()，而callback是在 UnpackExagearImageObb中实现的，所以只需要在这个类里找到unpackingCompleted函数，在其中调用自己的函数删除文件即可。</p><h3 id="onactivityresult的处理" tabindex="-1"><a class="header-anchor" href="#onactivityresult的处理"><span>onActivityResult的处理</span></a></h3><p>在自己的apk中测试时，并没有什么问题，不过添加到ex中之后遇到了两个问题：</p><ul><li>获取文件后，首先在activity的onActivityResult里接收到了，而且其中 assert了requestCode，导致不等于10001的都报错。而且fragment压根没接收到。</li><li>在fragment中调用的startActivityFoResult，在fragment中接收结果时requestCode是对的，但是在activity里接收到的是错的。</li></ul><p>又拿自己的apk试了一下，发现原因：</p>`,21),C=n("li",null,"结果首先发给活动，活动如果调用super，结果就会发给fragment，ex由于并没有调用super，所以我的fragment接收不到。解决方法：调用自己的静态方法，传入activity的this和原有的三个参数，通过activity获取碎片管理器进而通过tag获取碎片实例，然后再处理结果。至于那个assert，我加了判断如果不等于10001一律调用自己的这个静态方法然后直接返回。",-1),E={href:"https://stackoverflow.com/questions/10564474/wrong-requestcode-in-onactivityresult",target:"_blank",rel:"noopener noreferrer"},L=p('<p>在修改smali时，因为需要处理跳转标志，发现用apktool解包的dex，里面标志全变了，数字变成每个函数从0开始。然后如果改了关于标志的代码，编译的时候那些就全变了。</p><h3 id="如何将fragment挂载到视图上" tabindex="-1"><a class="header-anchor" href="#如何将fragment挂载到视图上"><span>如何将fragment挂载到视图上</span></a></h3><p>通过Activity.getSupportFragmentManager().beginTransaction().add方法，add传入三个参数：视图id，fragment实例，fragment的tag，将fragment添加到指定的视图中（测试发现只是添加到最后一个，不会清空其他子视图）。由于必须要视图id，不能视图实例，所以要去xml里找了。。</p><p>解压数据包的时候用的是EDStartupActivity，继承自StartupActivity，onCreate的时候设置的布局是start_up.xml。打开xml没想到居然看到了一个隐藏的布局：如下图</p><p><img src="'+d+'" alt="image.png"></p><p>好家伙，从来没见过这个。由于设置了visibility=gone，也从来没显示过。而且这个布局是一个有id的线性布局包着的，正好可以拿来用！<br> add传入id。show显示fragment，然后设置视图visibility为visible，再把多余的视图去掉，只留一个fragment的根布局即可。（不确定有无重复添加fragment的情况，为以防这种情况下显示多个fragment，先尝试从碎片管理器中获取tag为之前设置的tag的fragment，如果获取到了就不再add了。）</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li>写一个fragment，显示一个按钮，用来选择文件。</li><li>启动加载界面的视图有个没显示过的子视图，正好可以拿来挂载fragment。</li><li>由于安卓限制，安卓11及以上无法使用文件选择器查看Android/data和Android/obb目录下的文件。</li></ul>',8);function j(R,T){const e=i("router-link"),l=i("ExternalLinkIcon");return o(),u("div",null,[n("nav",m,[n("ul",null,[n("li",null,[a(e,{to:"#前言"},{default:t(()=>[s("前言")]),_:1})]),n("li",null,[a(e,{to:"#演示视频"},{default:t(()=>[s("演示视频：")]),_:1})]),n("li",null,[a(e,{to:"#将此功能添加到apk"},{default:t(()=>[s("将此功能添加到apk")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#自助修改"},{default:t(()=>[s("自助修改")]),_:1})]),n("li",null,[a(e,{to:"#手动修改"},{default:t(()=>[s("手动修改")]),_:1})]),n("li",null,[a(e,{to:"#已改好apk"},{default:t(()=>[s("已改好apk")]),_:1})])])]),n("li",null,[a(e,{to:"#探索过程"},{default:t(()=>[s("探索过程")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#分析ed的dex"},{default:t(()=>[s("分析ed的dex")]),_:1})]),n("li",null,[a(e,{to:"#打开系统自带的文件选择器"},{default:t(()=>[s("打开系统自带的文件选择器")]),_:1})]),n("li",null,[a(e,{to:"#获取文件并让ex读取到这个文件"},{default:t(()=>[s("获取文件并让ex读取到这个文件")]),_:1})]),n("li",null,[a(e,{to:"#onactivityresult的处理"},{default:t(()=>[s("onActivityResult的处理")]),_:1})]),n("li",null,[a(e,{to:"#如何将fragment挂载到视图上"},{default:t(()=>[s("如何将fragment挂载到视图上")]),_:1})])])]),n("li",null,[a(e,{to:"#总结"},{default:t(()=>[s("总结")]),_:1})])])]),b,n("p",null,[n("a",v,[s("我的合集和视频列表 > exagear"),a(l)])]),g,h,f,x,n("p",null,[n("a",_,[s("下载地址"),a(l)])]),n("p",null,[n("a",y,[s("视频介绍"),a(l)])]),O,I,n("ol",null,[w,n("li",null,[n("p",null,[s("添加"),n("a",F,[s("这个压缩包"),a(l)]),s("中的全部类到dex中。")])]),N]),A,n("ul",null,[C,n("li",null,[s("requestCode不对的问题，原因是"),n("a",E,[s("被activity改了"),a(l)]),s("，因为是通过fragment的start发出去的，要么在fragment里接收并处理，要么activity里接收的requestCode&0x0000ffff")])]),L])}const V=c(k,[["render",j],["__file","index.html.vue"]]),Z=JSON.parse('{"path":"/blogs/2022/winter/exagearFindObb/","title":"在exagear未识别到数据包时提供手动选择数据包选项","lang":"zh-CN","frontmatter":{"date":"2023-1-18 15:32:00","title":"在exagear未识别到数据包时提供手动选择数据包选项","categories":["exagear","技术"],"tags":["content resolver"]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"演示视频：","slug":"演示视频","link":"#演示视频","children":[]},{"level":2,"title":"将此功能添加到apk","slug":"将此功能添加到apk","link":"#将此功能添加到apk","children":[{"level":3,"title":"自助修改","slug":"自助修改","link":"#自助修改","children":[]},{"level":3,"title":"手动修改","slug":"手动修改","link":"#手动修改","children":[]},{"level":3,"title":"已改好apk","slug":"已改好apk","link":"#已改好apk","children":[]}]},{"level":2,"title":"探索过程","slug":"探索过程","link":"#探索过程","children":[{"level":3,"title":"分析ed的dex","slug":"分析ed的dex","link":"#分析ed的dex","children":[]},{"level":3,"title":"打开系统自带的文件选择器","slug":"打开系统自带的文件选择器","link":"#打开系统自带的文件选择器","children":[]},{"level":3,"title":"获取文件并让ex读取到这个文件","slug":"获取文件并让ex读取到这个文件","link":"#获取文件并让ex读取到这个文件","children":[]},{"level":3,"title":"onActivityResult的处理","slug":"onactivityresult的处理","link":"#onactivityresult的处理","children":[]},{"level":3,"title":"如何将fragment挂载到视图上","slug":"如何将fragment挂载到视图上","link":"#如何将fragment挂载到视图上","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1674386473000,"updatedTime":1679134042000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":7}]},"filePathRelative":"blogs/2022/winter/exagearFindObb/index.md"}');export{V as comp,Z as data};
