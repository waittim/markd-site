#!/bin/bash
# Mark'd 网站本地服务器启动脚本

echo "🚀 启动 Mark'd 本地服务器..."
echo ""
echo "📍 项目目录: $(pwd)"
echo "🌐 访问地址: http://localhost:8000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 检查 Python 版本
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "❌ 未找到 Python，请使用方法 1 直接打开 index.html"
    echo "或者安装 Python: https://www.python.org/downloads/"
    exit 1
fi
