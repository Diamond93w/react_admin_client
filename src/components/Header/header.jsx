import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import { QuestionCircleTwoTone } from '@ant-design/icons'
import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import './index.css'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'

export const withNavigation = (Component)=>{
    return (props)=><Component {...props} navigate={useNavigate()} replace={true}/>
}

class Header extends Component {
    state = {
        date: formateDate(Date.now()),
        webTitle: '首页',
        weather: '晴',
        user: 'admin'
    }
    // 设置定时器，更新页面的时间
    getTime = () => {
        this.intervalId = setInterval(() => {
            const date = formateDate(Date.now())
            this.setState({ date })
        }, 1000)
    }

    // 调用天气接口，请求数据
    getWeather = async () => {
        const weatherRes = await reqWeather()
        const data = weatherRes.lives[0]  // 具体数据格式，建议先打印出来再进行提取
        // 获取天气
        const weather = data.weather
        // 更新天气数据
        this.setState({ weather })
    }

    // 获取当前页面的名称
    // getTitle = () => {
    //     const pathname = this.props.location.pathname
    //     // const { pathname } = useLocation()
    //     // console.log(pathname);
    //     let webTitle = ''
    //     switch (pathname) {
    //         case '/home':
    //             webTitle = '首页'
    //             break;
    //         case '/category':
    //             webTitle = '品类管理'
    //             break;
    //         case '/product':
    //             webTitle = '商品管理'
    //             break;
    //         case '/user':
    //             webTitle = '用户管理'
    //             break;
    //         case '/role':
    //             webTitle = '角色管理'
    //             break;
    //         case '/charts/bar':
    //             webTitle = '柱形图'
    //             break;
    //         case '/charts/line':
    //             webTitle = '折线图'
    //             break;
    //         case '/charts/pie':
    //             webTitle = '饼图'
    //             break;
    //         default:
    //             webTitle = '首页'
    //             break;
    //     }
    //     // this.setState({ webTitle })
    //     return webTitle
    // }

    logOut = () => {
        // const { modal } = App.useApp()
        // 显示确认框
        Modal.confirm(
            {
                title: '确定要退出吗?',
                icon: <QuestionCircleTwoTone />,
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    // 清除保存的user数据
                    storageUtils.removeUser()
                    memoryUtils.user = {}

                    // 跳转到login
                    this.props.navigate('/login')
                },
            })
    }


    // 第一次render后执行（执行一次）
    // 一般在此执行异步操作：发AJAX请求、启动定时器
    componentDidMount() {
        // 获取当前时间显示
        this.getTime()

        // 获取天气显示
        this.getWeather()
    }

    // 在当前组件将要卸载之前
    componentWillUnmount() {
        clearInterval(this.intervalId)
    }



    render() {
        const { date, webTitle, weather, user } = this.state
        // const webTitle = this.getTitle()
        const username = memoryUtils.user.username
        return (
            <div className='header'>
                <div className="header-top">
                    <span>欢迎您，{username}</span>
                    <a href="#" onClick={this.logOut}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{`${webTitle}(没实现)`}</div>
                    <div className="header-bottom-right">
                        <span>{date}</span>
                        {/* <img src="" alt="weather" /> */}
                        <span>{weather}</span>
                        {/* 城市可改进：根据登录地址自动查询城市  */}
                        <span>重庆市</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withNavigation(Header)

/* 
1. 为解决：
    在 route6 中的一般类式组件中实现路由跳转，封装了一个 withNavigation，使用高阶组件添加了props
此方法治标不治本，为了解决问题而实现，此方法不是最优法。
2. 为什么不用函数组件：
    在函数式组件中，搞不清 useEffect 的具体使用，比如组件一挂载或卸载等
*/

