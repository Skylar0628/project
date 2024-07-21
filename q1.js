///////////////////////////////////// 1 /////////////////////////////////////
/**  
Q1. Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’) 
to sort this array and print it out. 
**/

const user = [
  {
    firstName: "John",
    lastName: "Doe",
    customerID: 111,
    note: "",
    profession: "student",
  },
  {
    firstName: "Mina",
    lastName: "Smith",
    customerID: 222,
    note: "",
    profession: "freelancer",
  },
  {
    firstName: "Herry",
    lastName: "han",
    customerID: 333,
    note: "",
    profession: "productOwner",
  },
  {
    firstName: "Tina",
    lastName: "gan",
    customerID: 444,
    note: "",
    profession: "engineer",
  },
];

function sortUserName(user) {
  user.sort((a, b) => {
    let aValue = a.firstName + (a.lastName || "") + a.customerID;
    let bValue = b.firstName + (b.lastName || "") + b.customerID;

    if (aValue > bValue) return 1;
    if (aValue < bValue) return -1;
    return 0;
  });
  console.log(user);
}
sortUserName(user);

/**  
Q2. Please sort by ‘profession’ to follow the principle.  
(‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ > 
‘student’’) 
**/
const users = [
  {
    firstName: "John",
    lastName: "Doe",
    customerID: 111,
    note: "xxx",
    profession: "student",
  },
  {
    firstName: "Mina",
    lastName: "Smith",
    customerID: 222,
    note: "xxx",
    profession: "freelancer",
  },
  {
    firstName: "Herry",
    lastName: "han",
    customerID: 333,
    note: "xxx",
    profession: "productOwner",
  },
  {
    firstName: "Tina",
    lastName: "gan",
    customerID: 444,
    note: "xxx",
    profession: "engineer",
  },
  {
    firstName: "Tina",
    lastName: "gan",
    customerID: 444,
    note: "xxx",
    profession: "systemAnalytics",
  },
];

function sortByType(users) {
  const professionOrder = [
    "systemAnalytics",
    "engineer",
    "productOwner",
    "freelancer",
    "student",
  ];
  users.sort((a, b) => {
    const aVal = professionOrder.indexOf(a.profession);
    const bVal = professionOrder.indexOf(b.profession);
    return aVal - bVal; // 正確的排序比較
  });
};

sortByType(users);
console.log(users);

///////////////////////////////////// 2 /////////////////////////////////////
/* Explain why does this color not works, and how to fix make it work on 
1st list */
/* 為何起不了作用:是因為 .container .shop-list li.item 權重較重，權重較重的規則會覆蓋權重低的規則 */
/* 如何修復以及將其作用補上1st list: 將權重補上  
            .container .shop-list li.item:first-child { 
            color: blue;    或是可以加上!important
        } */

 /* 增加每隔一行設置背景顏色 */
//  .container .shop-list li.item:nth-child(even) {
//     background-color: #f0f0f0; 
// }
// .container .shop-list li.item:nth-child(odd) {
//     background-color: red;
// }


///////////////////////////////////// 3 /////////////////////////////////////
/**  
Please write down a function is used to create an array of unique values. 
Example: 
let items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 
3, 2, 6, 7, 5, 4, 4, 7, 8, 8, 0, 1, 2, 3, 1]; 
output: [1, 5, 2, 3, 4, 7, 8, 9, 0, 6] 
**/ 

let items = [
    1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5, 4,
    4, 7, 8, 8, 0, 1, 2, 3, 1,
  ];
  
  function getUniqueNumber(items) {
       const aa =  Array.from(new Set(items));
       return aa
  };
  
getUniqueNumber(items);


///////////////////////////////////// 4 /////////////////////////////////////
  /** Can you explain about Interface and Enum, and where will you be using, 
please make some examples. **/ 

// Interface：定義物件結構，描述應該會有哪些屬性和方法，用於強制物件符合某種結構。
// Enum：定義一組命名的常數，表示一組固定的選項。用於讓變數只能取這些預定義的值。

// Interface範例
interface Fruit  {
  name: string,
  color: string
}; 

const apple: Fruit ={
  name: "Apple",
  
};
console.log(apple); // {name: "Apple", color: "Red"}

// Enum 範例

enum Weekday = {
  Monday,    
  Tuesday,   
  Wednesday  
}

function getDayMessage (day: Weekday){
  switch (day) {
    case Weekday.Monday: 
     console.log("星期一");
     break;
    case Weekday.Tuesday:
     console.log("星期二");
     break;
    case Weekday.Wednesday:
     console.log("星期三");
     break;
  }
}
getDayMessage(Weekday.Friday);

///////////////////////////////////// 5 /////////////////////////////////////
// 每次 setState 調用不會馬上更新 this.state，他會先放進更新的陣列在批次執行，所以3次的調用事實上只增加一次。

class Count extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count: 0 };
      this.handleAddCount = this.handleAddCount.bind(this);
    }
  
    handleAddCount() {
      this.setState(prevState => ({ count: prevState.count + 1 }));
      this.setState(prevState => ({ count: prevState.count + 1 }));
      this.setState(prevState => ({ count: prevState.count + 1 }));
    }
  
    render() {
      return (
        <div>
          <h2>{this.state.count}</h2>
          <button onClick={this.handleAddCount}>Add</button>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Count />,
    document.getElementById('root')
  );


///////////////////////////////////// 6 /////////////////////////////////////
/** Please write the sample code to debounce handleOnChange (Do not use 
any 3th party libs other than react) **/ 

import React, { useState, useRef } from 'react';
const SearchBox = () => {
  const [query, setQuery] = useState('');
  const debounceTimeout = useRef(null);

  const handleOnChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    // 清除上一定時
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // 設定新的定時
    debounceTimeout.current = setTimeout(() => {
      makeAjaxCall(value);
    }, 300); // 延遲300毫秒
  };

  const makeAjaxCall = (value) => {
    console.log('Making AJAX call with query:', value);
  };

  return <input type="search" name="p" value={query} onChange={handleOnChange} />;
};
export default SearchBox;

