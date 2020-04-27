import React from "react";



// 函数式写法，无class
export default function QuestionView() {

  // React Hooks，详见https://zh-hans.reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {
    document.title = "证据分解";
  });

  // React Hooks，相当于class式写法的state，详见https://zh-hans.reactjs.org/docs/hooks-intro.html
  const [values, setValues] = React.useState({

  });


  return (
     <div>
       zhengjufenjie jiemian
     </div>
  )
}