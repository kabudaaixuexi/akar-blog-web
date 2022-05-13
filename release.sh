:<<EOF
    bash release.sh
    新版本发布
EOF
set -e

# 原版本号
VERSION=$(node -e "(function () { console.log(require('./package.json').version) })()")
V1=${VERSION%%.*}
VV=${VERSION#*.}
V2=${VV%%.*}
V3=${VERSION##*.}

# 新版本号
if [ `expr ${V3} + 1` -gt 9 ]; then
    if [ `expr ${V2} + 1` -gt 9 ]; then
        V1=`expr ${V1} + 1`
        V2=0
        V3=0
    else
        V2=`expr ${V2} + 1`
        V3=0
    fi
else
    V3=`expr ${V3} + 1`
fi
# patch | major
# if [[ $1 -eq 'minor' ]]; then
#     echo 'minor---功能版本变动'
#     NEWVERSION="$V1.$V2.$V3"
# else
#     echo 'patch---小版本变动'
    NEWVERSION="$V1.$V2.$V3"
# fi

read -p "发布新版本 $NEWVERSION (原版本$VERSION) - 确定? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "开始发布"
#   if [[ -z $SKIP_TESTS ]]; then
#     npm run lint
#     npm run flow
#     npm run test:cover
#     npm run test:e2e -- --env phantomjs
#     npm run test:ssr
  fi

  # Sauce Labs tests has a decent chance of failing
  # so we usually manually run them before running the release script.

  # if [[ -z $SKIP_SAUCE ]]; then
  #   export SAUCE_BUILD_ID=$VERSION:`date +"%s"`
  #   npm run test:sauce
  # fi

  # build
#   VERSION=$NEWVERSION npm run build
#   echo $NEWVERSION
  # update packages
  # using subshells to avoid having to cd back
# (
    # ( cd packages/vue-template-compiler
    #     npm version "$VERSION"
    #     if [[ -z $RELEASE_TAG ]]; then
    #         npm publish
    #     else
    #         npm publish --tag "$RELEASE_TAG"
    #     fi
    # )

#   cd packages/vue-server-renderer
#   npm version "$VERSION"
#   if [[ -z $RELEASE_TAG ]]; then
#     npm publish
#   else
#     npm publish --tag "$RELEASE_TAG"
#   fi
# )

  # commit
  echo "开始提交代码"
  git add .
  git commit -m "build: build $NEWVERSION"
  npm version "$NEWVERSION" --message "build: release $NEWVERSION"
  # publish
  echo "开始上传代码到远程库"
  git push

#   echo "开始上传npm包"
#   if [[ -z $RELEASE_TAG ]]; then
#     echo "提交新的npm包版本"
#     sudo npm publish
#   else
#     echo "提交新的npm包版本"
#     sudo npm publish --tag "$RELEASE_TAG"
#   fi
echo "Release Success!"
