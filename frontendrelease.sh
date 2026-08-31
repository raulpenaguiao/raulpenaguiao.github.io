#!/usr/bin/env bash
#
# frontendrelease.sh
#
# Creates and pushes a git tag that triggers the "Frontend Release Deploy"
# GitHub Actions workflow (.github/workflows/frontend-release.yml), which SSHes
# into the VPS and checks out the tagged commit at
# /var/webserver/personalwebpage/raulpenaguiao.github.io
#
# The workflow fires on any tag whose name starts with "frontendrelease".
#
# Usage:
#   ./frontendrelease.sh [remote]
#
#   remote   git remote to push the tag to (default: origin)

set -euo pipefail

REMOTE="${1:-origin}"
TIMESTAMP="$(date -u +%Y%m%d-%H%M%S)"
TAG="frontendrelease-${TIMESTAMP}"

# Must be run from inside the repository.
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "error: not inside a git repository" >&2
  exit 1
fi

# Refuse to release a dirty tree so the deployed commit matches local state.
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "error: working tree has uncommitted changes; commit or stash first" >&2
  exit 1
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
COMMIT="$(git rev-parse --short HEAD)"

echo "Tagging ${COMMIT} (${BRANCH}) as ${TAG}"
git tag -a "${TAG}" -m "Frontend release ${TIMESTAMP} from ${BRANCH} @ ${COMMIT}"

echo "Pushing ${TAG} to ${REMOTE}"
git push "${REMOTE}" "${TAG}"

echo
echo "Tag pushed. Follow the deploy at:"
echo "  https://github.com/raulpenaguiao/raulpenaguiao.github.io/actions"
