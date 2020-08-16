import React from 'react';
import './filterdemo.css';
import ModelFiler from './ModelFilter';

function App() {
  const options = ['香蕉', '番茄', '苹果', '柚子', '西瓜', '雪梨', '葡萄', '甘蔗', '车厘子', "草莓"];
  const value = ['香蕉', '番茄', '苹果', '柚子'];
  return (
    <div className="App">
      <ModelFiler
        labelText={'水果'}
        options={options}
        value={value}
        max={5}
        name={'fruit'}
        onChange={(list) => console.log("过滤条件更新为", list, "原来的value", value)}
      />
    </div>
  );
}

export default App;
