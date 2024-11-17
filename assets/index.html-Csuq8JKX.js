import{_ as r,r as n,o as a,c as l,a as e,d as t,b as s,e as i}from"./app-DMogTwpC.js";const p="/assets/0-DmCiWfdK.png",d="/assets/1-CsEipH3e.png",c="/assets/2-BZ2KFFDC.png",m="/assets/3-COp3hhKN.png",_="/assets/4-P02X1jE-.png",g="/assets/5-CoiXk7TI.png",h="/assets/6-Djz2OTor.png",u={},f=e("p",null,"将 Android Studio 更新之后，发现更新日志里提到，可以使用设备串流进行调试了。一开始还以为是在running devices里选本地adb配对的设备然后串流画面，后来发现居然是使用firebase提供的云设备，而且有免费额度可以使用。",-1),b=e("p",null,"相关链接",-1),x={href:"https://developer.android.com/studio/run/android-device-streaming",target:"_blank",rel:"noopener noreferrer"},v={href:"https://console.firebase.google.com/?hl=zh-cn&pli=1",target:"_blank",rel:"noopener noreferrer"},k=i('<p><img src="'+p+'" alt="alt text"></p><p>收费的价格：https://d.android.com/r/studio-ui/device-streaming/pricing</p><p>但是由于目前还在试运行，所以这个价格和免费额度标的乱七八糟的。目前免费额度的情况好像是默认一次运行最多15分钟，然后除非手动延长，否则会关闭该设备并清除数据。一天最多90分钟。</p><p>经过测试，发现架构是arm64的，并非本地虚拟机那种x86_64</p><p><strong>使用步骤</strong></p><ol><li>device manager那里，左上角有个黄色的firebase图标，点开。登录谷歌账号，授权firebase。</li></ol><p><img src="'+d+'" alt="alt text"></p><ol start="2"><li>需要有个firebase项目，https://console.firebase.google.com/?hl=zh-cn&amp;pli=1，在firebase控制台创建一个。然后等待一会，重新打开as里的黄色图标。选择项目</li></ol><p><img src="'+c+'" alt="alt text"></p><ol start="3"><li>等待设备加载出来之后，勾选一个，点确定，然后启动设备。</li></ol><p>连不上。。</p><p><img src="'+m+'" alt="alt text"></p><p>再次打开streaming，说我firebase项目有权限错误</p>',13),C={href:"https://developer.android.com/studio/run/android-device-streaming#permissions",target:"_blank",rel:"noopener noreferrer"},N=i('<ol><li><p>进入谷歌IAM https://console.cloud.google.com/iam-admin</p></li><li><p>顶部选择自己的项目</p></li></ol><p><img src="'+_+'" alt="alt text"></p><ol start="3"><li>编辑自己的权限，根据文档，添加两个role</li></ol><p><img src="'+g+'" alt="alt text"></p><p><img src="'+h+'" alt="alt text"></p><p>还是连不上，点查看日志，打开日志文件夹有个windows报错ShowLogs未找到。然后回到as发现右下角也有这个报错提示，有个fix按钮点一下弹出对话框，不知道是配置啥的（网页相关？）啥也没改关闭，重连好了。。</p><p>恩，应该是网络问题。。。偶尔会断开。代理开tun模式能好点。</p><p>体验了一下三星的OneUI6.0，嘿嘿</p>',8);function S(w,A){const o=n("ExternalLinkIcon");return a(),l("div",null,[f,b,e("ul",null,[e("li",null,[e("a",x,[t("官网介绍"),s(o)])]),e("li",null,[e("a",v,[t("firebase项目控制台"),s(o)])])]),k,e("p",null,[t("参考"),e("a",C,[t("文档"),s(o)]),t(" 尝试解决")]),N])}const I=r(u,[["render",S],["__file","index.html.vue"]]),T=JSON.parse('{"path":"/blogs/2024/05/android-studio-device-streaming/","title":"Android Studio 支持云手机调试","lang":"zh-CN","frontmatter":{"date":"2024-5-12 20:59:02","title":"Android Studio 支持云手机调试","categories":["android","调试"],"tags":["Android Studio","firebase","device streaming"]},"headers":[],"git":{"createdTime":1716299656000,"updatedTime":1716299656000,"contributors":[{"name":"ewt45","email":"79033456+ewt45@users.noreply.github.com","commits":1}]},"filePathRelative":"blogs/2024/05/android-studio-device-streaming/index.md"}');export{I as comp,T as data};
