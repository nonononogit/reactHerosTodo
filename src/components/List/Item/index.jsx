// List里的子组件

// 获取状态钩子
import { useContext, useState } from 'react'
import './css/index.css'
import { dcContext } from '../../../App'
// 用props接收List主组件传过来的数据
export default function Item(props) {
    // 使用共享状态钩子拿到主组件共享的数据
    const { heros, setHeros } = useContext(dcContext)
    // 解构赋值传来的数据
    const { name, done, id } = props.heros
    // 创建鼠标移入的状态
    const [isEnter, setIsEnter] = useState(false)
    // 鼠标移入移出的事件函数,接收一个参数,辨别是移入还是移除
    function mouseAction(type) {
        return () => {
            // 如果鼠标为移入,则将状态改为true
            type === 'enter' ? setIsEnter(true) : setIsEnter(false)
        }
    }
    // 删除按钮的事件函数
    function deleteOne(id) {
        return () => {
            // 过滤掉和要删除的id不相等的数据,返回新数组里
            const newHeros = heros.filter(item => item.id !== id)
            // 将过滤后的新数组重新渲染
            setHeros(newHeros)
        }
    }
    // 选中单个按钮的事件函数
    function changeChecked(e) {
        // 根据id遍历出
        const newHeros = heros.map(item => {
            // 如果找到当前点击的id
            if (item.id === id) {
                // 将当前点击的done改为true
                // e.target指向这个事件触发者input,
                // checked会随onChange事件改变而改变,选中就是true,取消选中就是false
                item.done = e.target.checked
            }
            // 将改变done状态后的item都返回出去
            return item
        })
        // 将更新后的数据再渲染
        setHeros(newHeros)
    }
    return (
        <li onMouseEnter={mouseAction('enter')}
            onMouseLeave={mouseAction('leave')}
            // 如果状态为true,则改变背景颜色
            style={{ background: isEnter ? '#ccc' : '' }}
        >
            <label>
                <input
                    type="checkbox"
                    // 因为defaultChecked只在初次渲染时受状态控制
                    // 而checked在全过程中都受状态控制,所以onChange事件触发时,可以改变选择状态
                    checked={done}
                    onChange={changeChecked}
                />
                <span>{name}</span>
            </label>
            <button
                className="btn btn-danger"
                // 上面注册了鼠标移入事件,如果移入,则显示删除按钮
                style={{ display: isEnter ? 'block' : 'none' }}
                // 删除按钮删除单个数据,
                // 在调用方法的时候,将id传进方法里,方便找到要删除的这条数据的id
                onClick={deleteOne(id)}
            >
                删除
            </button>
        </li>
    )
}
