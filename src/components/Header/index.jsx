// 头部组件

// 获取状态钩子
import { useContext } from 'react'
import './css/index.css'
// 获取生成随机id方法
import { nanoid } from 'nanoid'
// 获取主文件传输过来的数据,是一个对象
import { dcContext } from '../../App'
export default function Header() {
    // 使用状态钩子利用解构赋值获取对象数据
    const { heros, setHeros } = useContext(dcContext)
    // 新增数据的事件函数
    function add(e) {
        // 判断是否为回车键(键码为13),如果不是则不做任何操作
        if (e.keyCode !== 13) {
            return
        }
        // 根据新增的数据生成一个可以添加在state中的对象(同格式)
        const newHero = { id: nanoid(), name: e.target.value, done: false }
        // 设置新发布的数据到state数据中
        // 先将原有数据展开,然后把新数据一起合并成新数组
        // (因为数组是引用数据类型,如果在原数组上修改,
        // 虚拟DOM发现地址没变,就认为数据还是一样,就不会重新渲染.所以要新起一个数组)
        setHeros([...heros, newHero])
    }
    return (
        <div className="todo-header">
            <input
                type="text"
                placeholder="请输入影片名称,按回车键确认"
                // 键盘事件
                onKeyUp={add}
            />
        </div>
    )
}
