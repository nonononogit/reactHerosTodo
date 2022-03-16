// 主组件

// 从react中引入createContext方法,可以共享数据
// 从react中引入useState方法,可以存放数据,类似类组件里的状态
import { useState, createContext, useEffect } from 'react'
// 引入Header\List\Footer文件,方便下面嵌套渲染并传输数据
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
// 安装nanoid并引入,用来调用nanoid方法生成随机ID
import { nanoid } from 'nanoid'
// 引入css样式
import './App.css'
// 调用createContext方法,得到一个共享功能对象,并暴露出去
export const dcContext = createContext()
export default function App() {
  // 模拟服务端请求的数据
  // useState用来创建一个state数据,
  // useState默认返回一个数组,数组的第一个元素是当前数据的值;
  // 数组的第二个元素就是一个修改当前数据的方法
  const [heros, setHeros] = useState([
    { id: nanoid(), name: '超人钢铁之躯', done: false },
    { id: nanoid(), name: '新蝙蝠侠', done: false },
    { id: nanoid(), name: '蝙蝠侠大战超人', done: false }
  ])
  // 在本地存储中读取数据
  // useEffect第一个参数是一个函数,如果没有第二个参数,无论更新还是初始挂载都会执行这个函数
  // 第二个参数是数组,可以限定数组中哪一个状态变化时,再执行第一个函数,如果是空数组,则无论状态
  // 怎么变化,都不会更新
  // 可以设置多个useEffect,也建议不同的功能设置不同的useEffect
  // useEffect返回一个函数,当这个组件被卸载时,会调用这个函数
  useEffect(() => {
    const storageHeros = localStorage.getItem('heros')
    if (storageHeros) {
      setHeros([...JSON.parse(storageHeros)])
    }
  }, [])
  // 每次heros有修改,则修改本地存储
  useEffect(() => {
    localStorage.setItem('heros', JSON.stringify(heros))
  }, [heros])
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        {/* dcContxt共享功能对象提供了一个props,
      可以给组件内部嵌套的组件共享数据,数据放在value中*/}
        <dcContext.Provider value={{ heros, setHeros }}>
          <Header />
          <List />
          <Footer />
        </dcContext.Provider>
      </div>
    </div>
  )
}
