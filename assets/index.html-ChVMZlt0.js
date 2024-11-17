import{_ as n,o as a,c as s,e as t}from"./app-DMogTwpC.js";const e={},p=t(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>android.app包下的这个旧Fragment类已经被官方不建议使用了，建议使用androidx包下的那个Fragment类，支持更低版本的安卓而且持续更新。<br> 那么为什么我还要用这个又老又不好用的老F呢，因为起因是想给pvz free写悬浮窗，然后发现这应用的Activity用的是老版的Activity，而想用新版F的条件就是应用的Activity继承的必须是新的androidx包里的FragmentActivity，所以用不成=-=</p><h2 id="fragment基础创建与使用" tabindex="-1"><a class="header-anchor" href="#fragment基础创建与使用"><span>Fragment基础创建与使用</span></a></h2><h3 id="创建自己的fragment类" tabindex="-1"><a class="header-anchor" href="#创建自己的fragment类"><span>创建自己的Fragment类</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">public class FragmentMini extends Fragment  {</span>
<span class="line"></span>
<span class="line">    private String TAG = &quot;FragmentMini&quot;;</span>
<span class="line">    private View rootView;</span>
<span class="line"></span>
<span class="line">    @Nullable</span>
<span class="line">    @Override</span>
<span class="line">    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {</span>
<span class="line">        //当attachToRoot为false，container用于为返回的视图提供layoutparams</span>
<span class="line">        rootView = inflater.inflate(AssistR.LAYOUTID_assist_mini, container, false);</span>
<span class="line"></span>
<span class="line">        return rootView;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>写一个类，继承Fragment，注意选择android.app.Fragment。</li><li>重写onCreateView，通过inflater查找想要的视图，并返回，这个视图就作为此Fragment显示在屏幕时的布局。 <ul><li>inflate()第三个参数传false，否则报错<code> Caused by: java.lang.IllegalStateException: The specified child already has a parent. You must call removeView() on the child&#39;s parent first.</code></li><li>当第三个参数为false时，第二个参数仅用作为视图提供LayoutParams</li></ul></li></ul><h3 id="在activity里显示fragment" tabindex="-1"><a class="header-anchor" href="#在activity里显示fragment"><span>在activity里显示fragment</span></a></h3><ul><li>自己继承写一个类继承android.app.Acitivity</li><li>对fragment的添加，删除通过fragmentManager进行，通过activity.getFragmentManager()获取。</li></ul><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token class-name">FragmentMini</span> fragmentMini <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FragmentMini</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">activity<span class="token punctuation">.</span><span class="token function">getFragmentManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">beginTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">AssistR</span><span class="token punctuation">.</span>fragment_root_activity_view<span class="token punctuation">,</span> fragmentMini<span class="token punctuation">,</span> <span class="token string">&quot;FragmentMini&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span>fragmentMini<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// .add....</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span>fragmentMini<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">addToBackStack</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>AssistR.fragment_root_activity_view是acitivity的根布局的资源id</li></ul><h2 id="使用fragmentmanager对多个fragment进行切换显示" tabindex="-1"><a class="header-anchor" href="#使用fragmentmanager对多个fragment进行切换显示"><span>使用FragmentManager对多个Fragment进行切换显示</span></a></h2><ul><li><p>管理器有个beginTransaction()开始事务的方法，链式操作，用于添加，隐藏，显示碎片，并且还可以记录当前栈情况以便回滚。</p><ul><li>事务只有调用了comimt()方法才会真正执行前面的操作。</li><li>在一条事务操作的最后，commit之前加上addToBackStack(null)记录当前栈情况，这样调用popBackStack()时本次事务的操作会被取消，比如在事务中进行了add()添加一个碎片，那么调用pop之后这个碎片就会移除。<br> add的传参最好传null，否则pop可能不生效。</li><li>介绍一些事务可以调用的方法:<br> add()添加一个碎片，碎片生命周期开始 remove()删除一个碎片，碎片生命周期结束 replace() 将当前activity显示的碎片替换为某个碎片，相当于remove+add hide() 隐藏碎片，但是碎片并没有被销毁 show() 显示碎片</li></ul></li><li><p>如果想进行两个碎片之间的切换，可以用hide()和show。replace由于会删除原先的fragment，所以不利于返回时回到原先fragment（如果没这个需求那无所谓）。使用hide和show要先保证碎片被add添加，可以在activity初始化时将全部碎片初始化并add，也可以在需要进入对应fragment之前再新建对象并add。如果fragment较多，那么activity初始化可能要耗费较长时间而且fragment一直存在也占内存。</p></li></ul><h3 id="在活动初始化时add全部碎片" tabindex="-1"><a class="header-anchor" href="#在活动初始化时add全部碎片"><span>在活动初始化时add全部碎片</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token comment">//activity中</span></span>
<span class="line"><span class="token comment">//一次性添加全部fragment，感觉相当于fragmentPagerAdapter了</span></span>
<span class="line"><span class="token class-name">FragmentMini</span> fragmentMini <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FragmentMini</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">FragmentDetail</span> fragmentDetail <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FragmentDetail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">FragmentDetailBackup</span> fragmentDetailBackup <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FragmentDetailBackup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">FragmentDetailInfo</span> fragmentDetailInfo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FragmentDetailInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">//add第一个是fragment要添加到的父容器的id，第二个是fragment，第三个是fragment的标签</span></span>
<span class="line"><span class="token comment">//添加addToBackStack，这样按返回键可以关闭此fragment</span></span>
<span class="line">activity<span class="token punctuation">.</span><span class="token function">getFragmentManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">beginTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">AssistR</span><span class="token punctuation">.</span>fragment_root_activity_view<span class="token punctuation">,</span> fragmentMini<span class="token punctuation">,</span> <span class="token string">&quot;FragmentMini&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span>fragmentMini<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">AssistR</span><span class="token punctuation">.</span>fragment_root_activity_view<span class="token punctuation">,</span> fragmentDetail<span class="token punctuation">,</span> <span class="token string">&quot;FragmentDetail&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span>fragmentDetail<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">AssistR</span><span class="token punctuation">.</span>fragment_root_activity_view<span class="token punctuation">,</span> fragmentDetailBackup<span class="token punctuation">,</span> <span class="token string">&quot;FragmentDetailBackup&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span>fragmentDetailBackup<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">AssistR</span><span class="token punctuation">.</span>fragment_root_activity_view<span class="token punctuation">,</span> fragmentDetailInfo<span class="token punctuation">,</span> <span class="token string">&quot;FragmentDetailInfo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span>fragmentDetailInfo<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span>fragmentMini<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">addToBackStack</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在需要进入下一个碎片的时候调用hide和show" tabindex="-1"><a class="header-anchor" href="#在需要进入下一个碎片的时候调用hide和show"><span>在需要进入下一个碎片的时候调用hide和show</span></a></h3><p>一般是按钮之类的调用。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token comment">//fragment中</span></span>
<span class="line"><span class="token class-name">FragmentManager</span> manager <span class="token operator">=</span> <span class="token class-name">FragmentMini</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFragmentManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">manager<span class="token punctuation">.</span><span class="token function">beginTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">setTransition</span><span class="token punctuation">(</span><span class="token class-name">FragmentTransaction</span><span class="token punctuation">.</span><span class="token constant">TRANSIT_FRAGMENT_OPEN</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span>manager<span class="token punctuation">.</span><span class="token function">findFragmentByTag</span><span class="token punctuation">(</span><span class="token string">&quot;FragmentMini&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span>manager<span class="token punctuation">.</span><span class="token function">findFragmentByTag</span><span class="token punctuation">(</span><span class="token string">&quot;FragmentDetail&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">addToBackStack</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>setTransition是添加过渡动画。</li><li>hide隐藏当前碎片，show显示当前碎片。</li><li>hide和show需要传入fragment对象，获取对象的方式我采用的是通过管理器寻找对应tag，这个tag是在add对应碎片时传入的第三个参数（可以看上面）。</li><li>同样在commit之前调用addtobackstack，以便之后可以返回到当前碎片。</li></ul><h3 id="在需要返回到上一个碎片时调用popbackstack" tabindex="-1"><a class="header-anchor" href="#在需要返回到上一个碎片时调用popbackstack"><span>在需要返回到上一个碎片时调用popBackStack</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="line"><span class="token comment">//fragment中</span></span>
<span class="line"><span class="token function">getActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFragmentManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">popBackStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>返回到上一个记录栈，上一个记录栈是隐藏碎片a，显示碎片b，那么就会反过来显示碎片a，隐藏碎片b，达到退回上一个fragment的目的。</p>`,21),i=[p];function c(l,o){return a(),s("div",null,i)}const r=n(e,[["render",c],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/blogs/2022/autumn/traditionActivity/","title":"安卓android.app.Fragment 旧版Fragment的使用，多Fragment切换","lang":"zh-CN","frontmatter":{"date":"2022-09-02 11:15","title":"安卓android.app.Fragment 旧版Fragment的使用，多Fragment切换","categories":["技术"],"tags":["android","Acitivity","Fragment"]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"Fragment基础创建与使用","slug":"fragment基础创建与使用","link":"#fragment基础创建与使用","children":[{"level":3,"title":"创建自己的Fragment类","slug":"创建自己的fragment类","link":"#创建自己的fragment类","children":[]},{"level":3,"title":"在activity里显示fragment","slug":"在activity里显示fragment","link":"#在activity里显示fragment","children":[]}]},{"level":2,"title":"使用FragmentManager对多个Fragment进行切换显示","slug":"使用fragmentmanager对多个fragment进行切换显示","link":"#使用fragmentmanager对多个fragment进行切换显示","children":[{"level":3,"title":"在活动初始化时add全部碎片","slug":"在活动初始化时add全部碎片","link":"#在活动初始化时add全部碎片","children":[]},{"level":3,"title":"在需要进入下一个碎片的时候调用hide和show","slug":"在需要进入下一个碎片的时候调用hide和show","link":"#在需要进入下一个碎片的时候调用hide和show","children":[]},{"level":3,"title":"在需要返回到上一个碎片时调用popBackStack","slug":"在需要返回到上一个碎片时调用popbackstack","link":"#在需要返回到上一个碎片时调用popbackstack","children":[]}]}],"git":{"createdTime":1662190358000,"updatedTime":1662280001000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":2}]},"filePathRelative":"blogs/2022/autumn/traditionActivity/index.md"}');export{r as comp,d as data};
