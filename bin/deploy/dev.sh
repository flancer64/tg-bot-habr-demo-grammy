#!/usr/bin/env bash
##
#   Rebuild the JS project with modules placed in inner folders.
#   This is a development mode to link some repos with ./.git folders for change control.
#   You don't need this mode if you don't want to track changes in the dependencies.
##
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../" && pwd)}
DIR_NODE="${DIR_ROOT}/node_modules"
DIR_OWN="${DIR_ROOT}/own_modules"

##
# Internal function to clone & link one GitHub repo
##
processRepo() {
  NAME="@${1}"
  REPO="https://github.com/${1}.git"
  if test ! -d "${DIR_OWN}/${NAME}"; then
    echo "Clone repo '${NAME}' to '${DIR_OWN}'."
    git clone "${REPO}" "${DIR_OWN}/${NAME}"
  fi
  echo "Link sources from '${NAME}' to '${DIR_NODE}'."
  rm -fr "${DIR_NODE:?}/${NAME}" && ln -s "${DIR_OWN}/${NAME}" "${DIR_NODE}/${NAME}"
}

##
# MAIN FUNCTIONALITY
##
echo "Remove installed dependencies and lock file."
rm -fr "${DIR_NODE}" "${DIR_ROOT}/package-lock.json"

echo "Re-install JS project."
cd "${DIR_ROOT}" || exit 255
npm install --omit=optional

echo "Clone dependencies from github to inner folders."
mkdir -p "${DIR_OWN}/@flancer32/"
mkdir -p "${DIR_OWN}/@teqfw/"

processRepo "flancer32/teq-telegram-bot"
processRepo "teqfw/core"
processRepo "teqfw/di"
processRepo "teqfw/web"

echo ""
echo "App deployment in 'dev' mode is done."
