# 前言
为了方便开发人员后续追溯bug原因、版本发布、changelog自动生成、以及更好的团队开发协作，特制定此git使用规范。

## git工作流规范


## git提交规范


## 版本发布管理规范
### 版本号介绍
Alpha：Alpha是内部测试版,一般不会对外发布。

Beta: 该版本相对于Alpha版已有了很大的改进，消除了严重的错误，但还是存在着一些缺陷，需要经过多次测试来进一步消除。这个阶段的版本会一直加入新的功能。

RC: Release.Candidate的简写，就是发行候选版本。和Beta版最大的差别在于Beta阶段会一直加入新的功能，但是到了RC版本，几乎就不会加入新的功能了，而主要着重于除错!  RC版本是最终发放给用户的最接近正式版的版本，是正式版之前的最后一个测试版。

Release: 在前面版本的一系列测试版之后，终归会有一个正式版本，是最终交付用户使用的一个版本。该版本有时也称为标准版。

### 版本格式：
主版本号.次版本号.修订号（X.Y.Z），版本号递增规则如下：

主版本号(major)：一般改动很大，不兼容低版本

次版本号(minor)：当你做了向下兼容的功能性新增

修订号(patch)：当你做了向下兼容的问题修正。

注意：高版次升级，低版次需要清零，如当前版本号是v1.0.2，需要将次版本号从0升级到1，升级后的版本号应该为v1.1.0；


### 版本发布
切换到生产分支，一般是master分支，先执行`git pull`命令拉取最新代码，然后执行打标签命令，例如`git tag -a v1.0.0`命令。执行这条命令会弹出一个交互式窗口，按字母i键进入输入模式，输入

image.png
## 其他注意事项
1. 不要将本地配置文件提交到源代码管理中
2. 不要将第三方依赖项(如node_modules)提交到源代码管理中
3. 将你的git用户名配置为你的中文名字的英文全拼

## 参考链接
https://docs.gitlab.com/ee/topics/gitlab_flow.html

https://nvie.com/posts/a-successful-git-branching-model/

https://www.datree.io/resources/github-best-practices

https://w3c.github.io/best-practices.html

https://w3c.github.io/git.html

https://feflowjs.com/zh/guide/rule-git-commit.html

https://www.ruanyifeng.com/blog/2015/08/git-use-process.html

https://jaeger.itscoder.com/dev/2018/09/12/using-git-in-project.html

https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow

https://scicatproject.github.io/documentation/Development/Development_Methods.html

https://sethrobertson.github.io/GitBestPractices/

https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
