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

  NEWVERSION="$V1.$V2.$V3"

  read -p "发布新版本 $NEWVERSION (原版本$VERSION) - 确定? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "开始发布"
  else
    echo "取消发布"
    exit
  fi

  # commit
  # yarn co ** **
  echo "提交代码"
  git add .

  if [ -n "$1" -a -n "$2" ]; then
    echo "🔨 $1: $2"
    git commit -m "🔨 $1: $2"
    # update packages
    npm version "$NEWVERSION" --message "$1: $2 $NEWVERSION"
  elif [ -n "$1" ]; then
    echo "🚀 $1: Unspecified iteration"
    git commit -m "🚀 $1: Unspecified iteration"
    # update packages
    npm version "$NEWVERSION" --message "build: $1 $NEWVERSION"
  else
    echo "👏 build edition $NEWVERSION"
    git commit -m "👏 build: build edition $NEWVERSION"
    # update packages
    npm version "$NEWVERSION" --message "build: release $NEWVERSION"
  fi

  # publish
  echo "开始上传代码到远程库"
  git push origin master
  
  # echo "开始上传npm包"
  # if [[ -z $RELEASE_TAG ]]; then
  #   echo "提交新的npm包版本"
  #   sudo npm publish
  # else
  #   echo "提交新的npm包版本"
  #   sudo npm publish --tag "$RELEASE_TAG"
  # fi
echo "💫  Co Success!"