#!/bin/bash

##
# app deployment script
##


# common variables
local repo='git@github.com:leonp1991/Seamless.git'
local project='seamless'
local app='client'


# check if programs needed are available
have_git=$(hash git 2>/dev/null)
have_node=$(hash node 2>/dev/null)
have_npm=$(hash npm 2>/dev/null)
have_forever=$(hash forever 2>/dev/null)

if [ ! $have_git || ! $have_node || ! $have_npm || ! $have_forever ]
  then
    echo 'missing dependancies: check if system has git, node, npm and forever.'
    exit 1
fi


# if new server
pushd ~
  if [ ! -d private ]
    then
      mkdir private
  fi
  if [ ! -d public ]
    then
      mkdir public
popd


# if no sparse repo then set one up else update it
pushd ~/private
  if [ ! -d ${project}/${app} ]
    then
      # if no repo at all
      if [ ! -d $project ]
        then
          mkdir $project
      fi

      # setup repo
      pushd $project
        git init
        git config core.sparsecheckout true
        git remote add -f origin $repo
        echo $app/ >> .git/info/sparse-checkout
        git pull origin master
      popd
    else
      # update repo
      pushd $project
      git pull origin master
      popd
  fi
popd


# update packages, rebuild, deploy.
pushd ~/private/${project}/${app}
  npm i
  npm run build
  cp dist ~/public/${project}/${app}
popd


# restart or start forever service
is_a_service=forever list | grep -q ${project}_${app}

if [ $is_a_service ]
  then
    forever restart ${project}_${app}
  else
    pushd ~/public/$project/$app
      forever -a --uid ${project}_${app} start main.js
    popd
fi
