// List主组件

// 引入状态钩子,下面方便拿到共享的数据/
import {useContext} from 'react'
import './css/index.css'
// 引入列表文件,方便把遍历的数据共享过去
import Item from './Item'
// 获取主文件传输过来的数据,是一个对象
import { dcContext } from '../../App'
export default function List() {
    // 使用状态共享钩子拿到共享的数据,是一个数组
    const { heros } = useContext(dcContext)
    return (
        <ul className='todo-main'>
            {/* 将数组里的对象数据遍历出来,传给Item组件 */}
            {heros.map(item => {
                return <Item key={item.id} heros={item} />
            })}
        </ul>
    )
}
