## 一、获取表单中的元素

有两种方法（以函数式组件为例）：

    1. 使用 useState Hook （类似受控组件）
        受控组件：所有输入类的组件（如input，textarea等），随着用户的输入，会将值维护到 state 中，等需要的时候再从 state 中取。
```jsx
const CtrlFun = () => {
    const [txtVal, setVal] = useState('123')

    // ◆1.文本框输入事件
    // 需要onChange()这个事件变化函数来取到值，放入到state中，使用时从state中取出
    const changeTxtVal = (e) => {
        console.log(e.target, 'changeVal')
        setVal(e.target.value)
    }

    return <div style={{ width: '200px', backgroundColor: '#ccc' }}>
        <p>文本框值实时变化：{txtVal}</p>
        <input type="text" value={txtVal} onChange={changeTxtVal} />
    </div>
}
export default CtrlFun
```

    2. 使用 useRef Hook （类似非受控组件）
        非受控组件：现用现取，不需要状态来维护
```jsx
export default function UnCtrlFun (){
    const txtRef = useRef(null)
    const areaRef = useRef(null)
    const selRef = useRef(null)
    const chkRef = useRef(null)
    // 不需要state的话，可以不用谢onChange函数

    return <div style={{ width: '200px', backgroundColor: 'orange' }}>
        <p>文本框值实时变化：{txtVal}</p>
        <input type="text" ref={txtRef}/>
        <p>文本域值实时变化：{areaVal}</p>
        <textarea ref={areaRef}></textarea>
        <hr />
        <p>下拉菜单值实时变化：{selectVal}</p>
        <select ref={selRef}>
            <option value="a">1</option>
            <option value="b">2</option>
            <option value="c">3</option>
        </select>
        <hr />
        <p>复选框值实时变化：{chkFlag ? 'true' : 'false'}</p>
        <input type="checkbox" ref={chkRef}/>敲代码
    </div>
}
```
> 备注：建议多使用受控组件的写法（useState），非受控组件（useRef）需要有多少个表单元素就要写多少个ref。React官网提到“请勿过度使用Refs”，写多了有效率问题。