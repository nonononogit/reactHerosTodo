// 脚组件

import './css/index.css'
import { useContext } from 'react'
import { dcContext } from '../../App'
export default function Footer() {
    // 获取主组件里的数据
    const { heros, setHeros } = useContext(dcContext)
    // 清除全部按钮的点击事件
    function deleteAll() {
        // 利用filter过滤出没有被选中的(也就是done为false)
        const newHeros = heros.filter(item => !item.done)
        setHeros(newHeros)
    }
    // 全选按钮的事件
    function allChecked(e) {
        // 获取点击以后的状态
        const newHeros = heros.map(item => {
            // 点击全选框之后,把选择状态赋值给数据中所有的选择框
            // 让其他选择框与全选框的选择状态保持一致
            item.done = e.target.checked
            // 然后把更改了选择状态的数据返回出去保存新数组
            return item
        })
        // 重新渲染DOM
        setHeros(newHeros)
    }
    // 已看数量的计算
    function completed() {
        return heros.reduce((pver, item) => (item.done ? ++pver : pver), 0)
    }
    return (
        <div className="todo-footer">
            <label>
                <input
                    type="checkbox"
                    onChange={allChecked}
                    // 因为defaultChecked只在初次渲染时受状态控制;
                    // 而checked在全过程中都受状态控制,所以onChange事件触发时,可以改变选择状态.
                    // 设定判断,如果数据中所有的done都为true,且数据长度不为零,则可以被选中
                    // 否则就不能选中
                    checked={completed() === heros.length && heros.length !== 0}
                />
            </label>
            <span>
                <span>已看数量:{completed()}</span> / 全部影片数量:{heros.length}
            </span>
            <button className="btn btn-danger" onClick={deleteAll}>清除已看</button>
        </div>
    )
}
