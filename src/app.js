import regeneratorRuntime from 'libs/regenerator-runtime/runtime-module';
import ShopModel from './models/shop'
import AreaModel from './models/area'
import fa from 'utils/fa'
import LoginLogic from './logics/login'

const shopModel = new ShopModel()
const areaModel = new AreaModel()
const loginLogic = new LoginLogic()

App({
    async onLaunch() {
        // 防止token过期
        const existUserInfo = fa.cache.get('user_info')
        if (existUserInfo && typeof existUserInfo['id'] !== 'undefined') {
            await loginLogic.wechatLogin(false)
        }
        // 店铺配置信息
        const result = await shopModel.info()
        if (result) {
            fa.cache.set('shop_info', result)
        }
        // 地址预缓存
        areaModel.cache()
    }
})
