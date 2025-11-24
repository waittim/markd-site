#!/bin/bash
# macOS 双击运行脚本

cd "$(dirname "$0")"
open -a Terminal "$(pwd)/start-server.sh"
