# 如何使用
每次有posts的修改都要进行 'mkdocs gh-deploy'
具体用法：
在源文件中更改后执行上述命令，再将其推送至原始仓库即可
执行
'''
mkdocs gh-deploy
'''
'''
git push origin  main
'''

而仓库中具体文件的修改都要走完整流程：
 git add .
 git commit -m ''
 git push origin main
 