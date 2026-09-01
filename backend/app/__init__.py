from flask import Flask,Blueprint
from flask_cors import CORS
import importlib
import pkgutil
import os


def init(app):
    package_dir = os.path.dirname(__file__)
    package_name = __name__  # 'app'

    # 遍历包下的所有模块
    for module_info in pkgutil.iter_modules([package_dir]):
        module_name = module_info.name

        # 跳过 __init__ 本身
        if module_name == '__init__':
            continue

        # 导入模块
        try:
            module = importlib.import_module(f'.{module_name}', package=package_name)

            # 查找模块中以 '_api' 结尾的蓝图变量
            for attr_name in dir(module):
                if attr_name.endswith('_api'):
                    blueprint = getattr(module, attr_name)

                    # 确保是 Blueprint 实例
                    if isinstance(blueprint, Blueprint):
                        app.register_blueprint(blueprint)
                        print(f"✅ 已注册蓝图: {module_name}.{attr_name} -> {blueprint.url_prefix}")

        except Exception as e:
            print(f"⚠️  注册模块 {module_name} 失败: {e}")


def create_app():
    """创建 Flask 应用（应用工厂模式）"""
    app = Flask(__name__)

    # 配置 CORS（允许跨域）
    CORS(app)

    # 自动注册所有蓝图
    init(app)

    # 首页健康检查
    @app.route('/')
    def index():
        return {
            'status': 'ok',
            'message': 'Flask 服务运行中',
            'version': '1.0.0'
        }, 200

    # 404 处理
    @app.errorhandler(404)
    def not_found(error):
        return {'status': 'error', 'message': '接口不存在'}, 404

    # 500 处理
    @app.errorhandler(500)
    def internal_error(error):
        return {'status': 'error', 'message': '服务器内部错误'}, 500

    return app